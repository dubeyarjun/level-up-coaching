import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";

const BUCKET_NAME = "question-papers";

function TeacherDashboard() {
  const { t } = useLanguage();

  const [paperData, setPaperData] = useState({
    className: "",
    subject: "",
    examType: "",
    year: "",
    title: "",
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [papers, setPapers] = useState([]);
  const [loadingPapers, setLoadingPapers] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterExamType, setFilterExamType] = useState("All");

  // =====================================================
  // FETCH PAPERS
  // =====================================================

  const fetchPapers = async () => {
    try {
      setLoadingPapers(true);

      const { data, error } = await supabase
        .from("question_papers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setPapers(data || []);
    } catch (error) {
      console.error("Fetch papers error:", error);
      alert(t.teacherDashboard.loadError);
    } finally {
      setLoadingPapers(false);
    }
  };

  // =====================================================
  // REALTIME
  // =====================================================

  useEffect(() => {
    let isMounted = true;

    fetchPapers();

    const channel = supabase
      .channel("teacher-dashboard-question-papers")

      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "question_papers",
        },
        (payload) => {
          if (!isMounted) return;

          setPapers((previousPapers) => {
            if (previousPapers.some((paper) => paper.id === payload.new.id)) {
              return previousPapers;
            }

            return [payload.new, ...previousPapers];
          });
        },
      )

      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "question_papers",
        },
        (payload) => {
          if (!isMounted) return;

          setPapers((previousPapers) =>
            previousPapers.map((paper) =>
              paper.id === payload.new.id ? payload.new : paper,
            ),
          );
        },
      )

      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "question_papers",
        },
        (payload) => {
          if (!isMounted) return;

          setPapers((previousPapers) =>
            previousPapers.filter((paper) => paper.id !== payload.old.id),
          );
        },
      )

      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPaperData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =====================================================
  // FILE CHANGE
  // =====================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPdfFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      alert(t.teacherDashboard.onlyPdf);
      event.target.value = "";
      setPdfFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(t.teacherDashboard.fileSizeError);
      event.target.value = "";
      setPdfFile(null);
      return;
    }

    setPdfFile(file);
  };

  // =====================================================
  // UPLOAD QUESTION PAPER
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdfFile) {
      alert(t.teacherDashboard.selectPdf);
      return;
    }

    if (
      !paperData.title.trim() ||
      !paperData.className ||
      !paperData.subject ||
      !paperData.examType ||
      !paperData.year
    ) {
      alert(t.teacherDashboard.fillDetails);
      return;
    }

    try {
      setUploading(true);

      // STEP 1: Create a safe unique filename
      const safeFileName = pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");

      const filePath = `${paperData.className}/${Date.now()}-${safeFileName}`;

      // STEP 2: Upload PDF
      const { error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, pdfFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: "application/pdf",
        });

      if (storageError) {
        throw new Error(storageError.message);
      }

      // STEP 3: Save database record
      const { error: databaseError } = await supabase
        .from("question_papers")
        .insert([
          {
            class_name: paperData.className,
            subject: paperData.subject,
            exam_type: paperData.examType,
            year: Number(paperData.year),
            title: paperData.title.trim(),
            file_path: filePath,
          },
        ])
        .select();

      // If database fails, remove uploaded PDF
      if (databaseError) {
        await supabase.storage.from(BUCKET_NAME).remove([filePath]);

        throw new Error(databaseError.message);
      }

      // Success
      alert(t.teacherDashboard.uploadSuccess);

      // Reset form
      setPaperData({
        className: "",
        subject: "",
        examType: "",
        year: "",
        title: "",
      });

      setPdfFile(null);

      event.target.reset();

      // Refresh list
      await fetchPapers();
    } catch (error) {
      console.error("Question paper upload failed:", error);

      alert(`${t.teacherDashboard.uploadFailed}: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // =====================================================
  // DELETE QUESTION PAPER
  // =====================================================

  const handleDelete = async (paper) => {
    const confirmDelete = window.confirm(
      `${t.teacherDashboard.deleteConfirmationStart} "${paper.title}" ${t.teacherDashboard.deleteConfirmationEnd}`,
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(paper.id);

      // STEP 1: Delete storage file
      if (paper.file_path) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([paper.file_path]);

        if (storageError) {
          throw new Error(storageError.message);
        }
      }

      // STEP 2: Delete database record
      const { error: databaseError } = await supabase
        .from("question_papers")
        .delete()
        .eq("id", paper.id);

      if (databaseError) {
        throw new Error(databaseError.message);
      }

      // STEP 3: Remove from UI
      setPapers((previousPapers) =>
        previousPapers.filter((item) => item.id !== paper.id),
      );

      alert(t.teacherDashboard.deleteSuccess);
    } catch (error) {
      console.error("Delete error:", error);

      alert(`${t.teacherDashboard.deleteFailed}: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalPapers = papers.length;

  const totalClasses = new Set(
    papers.map((paper) => paper.class_name).filter(Boolean),
  ).size;

  const totalSubjects = new Set(
    papers.map((paper) => paper.subject).filter(Boolean),
  ).size;

  const availableYears = [
    ...new Set(
      papers
        .map((paper) => String(paper.year))
        .filter((year) => year && year !== "undefined"),
    ),
  ].sort((a, b) => Number(b) - Number(a));

  const classStats = Array.from({ length: 7 }, (_, index) => {
    const className = `Class ${index + 6}`;

    return {
      className,
      count: papers.filter((paper) => paper.class_name === className).length,
    };
  });

  // =====================================================
  // FILTERED PAPERS
  // =====================================================

  const filteredPapers = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return papers.filter((paper) => {
      const matchesSearch =
        !search ||
        paper.title?.toLowerCase().includes(search) ||
        paper.subject?.toLowerCase().includes(search) ||
        paper.class_name?.toLowerCase().includes(search) ||
        paper.exam_type?.toLowerCase().includes(search);

      const matchesClass =
        filterClass === "All" || paper.class_name === filterClass;

      const matchesYear =
        filterYear === "All" || String(paper.year) === filterYear;

      const matchesExamType =
        filterExamType === "All" || paper.exam_type === filterExamType;

      return matchesSearch && matchesClass && matchesYear && matchesExamType;
    });
  }, [papers, searchTerm, filterClass, filterYear, filterExamType]);

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearchTerm("");
    setFilterClass("All");
    setFilterYear("All");
    setFilterExamType("All");
  };

  // =====================================================
  // PDF URL
  // =====================================================

  const getPdfUrl = (filePath) => {
    if (!filePath) {
      return null;
    }

    if (filePath.startsWith("http")) {
      return filePath;
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

    return data?.publicUrl || null;
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <section
      id="teacher-dashboard"
      className="relative overflow-hidden bg-[#0B1020] px-4 py-20 text-white sm:px-6"
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-lime-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

      {/* Tech Grid */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#84cc16 1px, transparent 1px), linear-gradient(90deg, #84cc16 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-lime-400/30 bg-lime-400/5 px-5 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400 shadow-[0_0_10px_#a3e635]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400 sm:text-sm">
              {t.teacherDashboard.teacherPanel}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
            {t.teacherDashboard.questionPaper}{" "}
            <span className="text-lime-400">
              {t.teacherDashboard.management}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            {t.teacherDashboard.headerDescription}
          </p>
        </div>

        {/* =====================================================
            DASHBOARD CONTAINER
        ====================================================== */}

        <div className="space-y-8">
          {/* =====================================================
              ADMIN OVERVIEW
          ====================================================== */}

          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
                  {t.teacherDashboard.adminOverview}
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-white">
                  {t.teacherDashboard.welcome}
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  {t.teacherDashboard.overviewDescription}
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10 text-2xl">
                👨‍🏫
              </div>
            </div>
          </div>

          {/* =====================================================
              STATISTICS
          ====================================================== */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Papers */}

            <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl transition hover:-translate-y-1 hover:border-lime-400/40">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  {t.teacherDashboard.totalPapers}
                </p>

                <span className="rounded-lg bg-lime-400/10 p-2">📄</span>
              </div>

              <h4 className="mt-4 text-3xl font-black text-lime-400">
                {totalPapers}
              </h4>

              <p className="mt-1 text-xs text-slate-600">
                {t.teacherDashboard.uploadedPdfs}
              </p>
            </div>

            {/* Classes */}

            <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/40">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  {t.teacherDashboard.activeClasses}
                </p>

                <span className="rounded-lg bg-cyan-400/10 p-2">🎓</span>
              </div>

              <h4 className="mt-4 text-3xl font-black text-cyan-400">
                {totalClasses}
              </h4>

              <p className="mt-1 text-xs text-slate-600">
                {t.teacherDashboard.classes6to12}
              </p>
            </div>

            {/* Subjects */}

            <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl transition hover:-translate-y-1 hover:border-purple-400/40">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  {t.teacherDashboard.subjects}
                </p>

                <span className="rounded-lg bg-purple-400/10 p-2">📚</span>
              </div>

              <h4 className="mt-4 text-3xl font-black text-purple-400">
                {totalSubjects}
              </h4>

              <p className="mt-1 text-xs text-slate-600">
                {t.teacherDashboard.availableSubjects}
              </p>
            </div>

            {/* Current Year */}

            <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl transition hover:-translate-y-1 hover:border-amber-400/40">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">
                  {t.teacherDashboard.currentYear}
                </p>

                <span className="rounded-lg bg-amber-400/10 p-2">📅</span>
              </div>

              <h4 className="mt-4 text-3xl font-black text-amber-400">
                {new Date().getFullYear()}
              </h4>

              <p className="mt-1 text-xs text-slate-600">
                {t.teacherDashboard.dashboardActivity}
              </p>
            </div>
          </div>

          {/* =====================================================
              CLASS STATISTICS
          ====================================================== */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
                {t.teacherDashboard.distribution}
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                {t.teacherDashboard.classWisePapers}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {t.teacherDashboard.classFilterDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {classStats.map((item) => (
                <button
                  key={item.className}
                  type="button"
                  onClick={() => setFilterClass(item.className)}
                  className={`rounded-xl border px-3 py-4 text-center transition duration-300 ${
                    filterClass === item.className
                      ? "border-lime-400 bg-lime-400 text-slate-950 shadow-[0_0_20px_rgba(163,230,53,0.15)]"
                      : "border-slate-700 bg-slate-950/60 text-slate-300 hover:-translate-y-0.5 hover:border-lime-400/50 hover:text-lime-400"
                  }`}
                >
                  <span className="block text-xs font-semibold">
                    {item.className}
                  </span>

                  <span className="mt-1 block text-xl font-black">
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* =====================================================
              UPLOAD SECTION
          ====================================================== */}

          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/5 blur-3xl" />

            <div className="relative">
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
                  {t.teacherDashboard.uploadCenter}
                </p>

                <h3 className="mt-2 text-2xl font-extrabold">
                  {t.teacherDashboard.uploadNewPaper}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {t.teacherDashboard.uploadDescription}
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Title */}

                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    {t.teacherDashboard.paperTitle}
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={paperData.title}
                    onChange={handleChange}
                    placeholder={t.teacherDashboard.titlePlaceholder}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                    required
                  />
                </div>

                {/* Select Fields */}

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Class */}

                  <div>
                    <label
                      htmlFor="className"
                      className="mb-2 block text-sm font-semibold text-slate-300"
                    >
                      {t.teacherDashboard.classLabel}
                    </label>

                    <select
                      id="className"
                      name="className"
                      value={paperData.className}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                      required
                    >
                      <option value="">{t.teacherDashboard.selectClass}</option>

                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>

                  {/* Subject */}

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-slate-300"
                    >
                      {t.teacherDashboard.subjectLabel}
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      value={paperData.subject}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                      required
                    >
                      <option value="">
                        {t.teacherDashboard.selectSubject}
                      </option>

                      <option value="Mathematics">Mathematics</option>

                      <option value="Science">Science</option>

                      <option value="English">English</option>

                      <option value="Hindi">Hindi</option>

                      <option value="Social Science">Social Science</option>

                      <option value="Physics">Physics</option>

                      <option value="Chemistry">Chemistry</option>

                      <option value="Biology">Biology</option>
                    </select>
                  </div>

                  {/* Exam Type */}

                  <div>
                    <label
                      htmlFor="examType"
                      className="mb-2 block text-sm font-semibold text-slate-300"
                    >
                      {t.teacherDashboard.examType}
                    </label>

                    <select
                      id="examType"
                      name="examType"
                      value={paperData.examType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                      required
                    >
                      <option value="">{t.teacherDashboard.selectExam}</option>

                      <option value="Half Yearly">Half Yearly</option>

                      <option value="Annual">Annual</option>
                    </select>
                  </div>

                  {/* Year */}

                  <div>
                    <label
                      htmlFor="year"
                      className="mb-2 block text-sm font-semibold text-slate-300"
                    >
                      {t.teacherDashboard.year}
                    </label>

                    <select
                      id="year"
                      name="year"
                      value={paperData.year}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                      required
                    >
                      <option value="">{t.teacherDashboard.selectYear}</option>

                      {Array.from({ length: 8 }, (_, index) => {
                        const year = 2023 + index;

                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* PDF */}

                <div className="mt-7">
                  <label
                    htmlFor="pdf"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    {t.teacherDashboard.questionPaperPdf}
                  </label>

                  <div
                    className={`rounded-2xl border-2 border-dashed p-8 text-center transition duration-300 ${
                      pdfFile
                        ? "border-lime-400/60 bg-lime-400/5"
                        : "border-slate-700 bg-slate-950/40 hover:border-lime-400/50"
                    }`}
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400/10 text-3xl">
                      📄
                    </div>

                    <p className="mt-4 font-bold text-white">
                      {t.teacherDashboard.selectPdfTitle}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      {t.teacherDashboard.pdfLimit}
                    </p>

                    <input
                      id="pdf"
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      className="mx-auto mt-5 block w-full max-w-md text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-lime-400 file:px-4 file:py-2 file:font-bold file:text-slate-950 file:transition hover:file:bg-lime-300"
                      required
                    />

                    {pdfFile && (
                      <div className="mx-auto mt-5 max-w-md rounded-xl border border-lime-400/20 bg-lime-400/5 p-3">
                        <p className="truncate text-sm font-semibold text-lime-400">
                          ✓ {pdfFile.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Button */}

                <button
                  type="submit"
                  disabled={uploading}
                  className="group relative mt-7 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-lime-400 px-6 py-4 font-extrabold text-slate-950 shadow-lg shadow-lime-400/10 transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative">
                    {uploading
                      ? t.teacherDashboard.uploading
                      : t.teacherDashboard.uploadQuestionPaper}
                  </span>

                  {!uploading && (
                    <span className="relative text-lg transition-transform group-hover:translate-y-0.5">
                      ↑
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* =====================================================
              MANAGE PAPERS
          ====================================================== */}

          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
                  {t.teacherDashboard.managePdfs}
                </p>

                <h3 className="mt-2 text-2xl font-extrabold">
                  {t.teacherDashboard.uploadedQuestionPapers}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {t.teacherDashboard.manageDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchPapers}
                disabled={loadingPapers}
                className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:border-lime-400 hover:text-lime-400 disabled:opacity-50"
              >
                {loadingPapers
                  ? t.teacherDashboard.refreshing
                  : `↻ ${t.teacherDashboard.refresh}`}
              </button>
            </div>

            {/* Search */}

            <div className="mt-7 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
              <div className="mb-5">
                <h3 className="font-bold text-white">
                  {t.teacherDashboard.searchFilter}
                </h3>

                <p className="mt-1 text-xs text-slate-600">
                  {t.teacherDashboard.searchDescription}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Search */}

                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t.teacherDashboard.searchPlaceholder}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-lime-400"
                />

                {/* Class */}

                <select
                  value={filterClass}
                  onChange={(event) => setFilterClass(event.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-lime-400"
                >
                  <option value="All">{t.teacherDashboard.allClasses}</option>

                  {Array.from({ length: 7 }, (_, index) => (
                    <option key={index + 6} value={`Class ${index + 6}`}>
                      Class {index + 6}
                    </option>
                  ))}
                </select>

                {/* Year */}

                <select
                  value={filterYear}
                  onChange={(event) => setFilterYear(event.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-lime-400"
                >
                  <option value="All">{t.teacherDashboard.allYears}</option>

                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                {/* Exam */}

                <select
                  value={filterExamType}
                  onChange={(event) => setFilterExamType(event.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-lime-400"
                >
                  <option value="All">{t.teacherDashboard.allExamTypes}</option>

                  <option value="Half Yearly">Half Yearly</option>

                  <option value="Annual">Annual</option>
                </select>
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t border-slate-800 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  {t.teacherDashboard.showing}{" "}
                  <span className="font-bold text-lime-400">
                    {filteredPapers.length}
                  </span>{" "}
                  {t.teacherDashboard.of}{" "}
                  <span className="font-bold text-white">{papers.length}</span>{" "}
                  {t.teacherDashboard.papers}
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-semibold text-slate-500 transition hover:text-lime-400"
                >
                  {t.teacherDashboard.clearFilters}
                </button>
              </div>
            </div>

            {/* =================================================
                PAPER LIST
            ================================================== */}

            <div className="mt-7">
              {loadingPapers ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-lime-400" />

                  <p className="text-sm text-slate-500">
                    {t.teacherDashboard.loadingPapers}
                  </p>
                </div>
              ) : filteredPapers.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-10 text-center">
                  <div className="text-4xl">📄</div>

                  <p className="mt-4 font-semibold text-slate-300">
                    {papers.length === 0
                      ? t.teacherDashboard.noPapers
                      : t.teacherDashboard.noMatchingPapers}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPapers.map((paper) => {
                    const pdfUrl = getPdfUrl(paper.file_path);

                    return (
                      <div
                        key={paper.id}
                        className="group rounded-2xl border border-slate-800 bg-slate-950/50 p-5 transition duration-300 hover:border-lime-400/30 hover:bg-slate-950/80"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                          {/* Paper Info */}

                          <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-xl">
                              📄
                            </div>

                            <div className="min-w-0">
                              <h4 className="font-bold text-white">
                                {paper.title}
                              </h4>

                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-400">
                                  {paper.class_name}
                                </span>

                                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                                  {paper.subject}
                                </span>

                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                                  {paper.exam_type}
                                </span>

                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                                  {paper.year}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}

                          <div className="flex flex-wrap gap-2">
                            {pdfUrl && (
                              <>
                                <a
                                  href={pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-xl bg-lime-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-lime-300"
                                >
                                  {t.teacherDashboard.viewPdf}
                                </a>

                                <a
                                  href={pdfUrl}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
                                >
                                  {t.teacherDashboard.download}
                                </a>
                              </>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDelete(paper)}
                              disabled={deletingId === paper.id}
                              className="rounded-xl border border-red-500/40 bg-red-500/5 px-4 py-2.5 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === paper.id
                                ? t.teacherDashboard.deleting
                                : t.teacherDashboard.delete}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeacherDashboard;
