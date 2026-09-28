import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";

const BUCKET_NAME = "question-papers";

function QuestionPapers() {
  const { t } = useLanguage();

  const [papers, setPapers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedExamType, setSelectedExamType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH QUESTION PAPERS
  // =====================================================

  const fetchQuestionPapers = async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from("question_papers")
        .select(
          "id, class_name, exam_type, year, subject, title, file_path, created_at",
        )
        .order("year", { ascending: false })
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("Question papers fetch error:", fetchError);
        setError(fetchError.message);
        setPapers([]);
        return;
      }

      setPapers(data || []);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unable to load question papers. Please try again.");
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL FETCH + REALTIME
  // =====================================================

  useEffect(() => {
    let isMounted = true;

    fetchQuestionPapers();

    const channel = supabase
      .channel("question-papers-live-changes")

      // INSERT
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
            const alreadyExists = previousPapers.some(
              (paper) => paper.id === payload.new.id,
            );

            if (alreadyExists) {
              return previousPapers;
            }

            return [payload.new, ...previousPapers];
          });
        },
      )

      // UPDATE
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

      // DELETE
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

      .subscribe((status) => {
        console.log("Question papers realtime status:", status);
      });

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // =====================================================
  // GET PUBLIC PDF URL
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
  // FILTER OPTIONS
  // =====================================================

  const classOptions = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(papers.map((paper) => paper.class_name).filter(Boolean)),
      ).sort(),
    ];
  }, [papers]);

  const subjectOptions = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(papers.map((paper) => paper.subject).filter(Boolean)),
      ).sort(),
    ];
  }, [papers]);

  const examTypeOptions = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(papers.map((paper) => paper.exam_type).filter(Boolean)),
      ).sort(),
    ];
  }, [papers]);

  const yearOptions = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(papers.map((paper) => paper.year).filter(Boolean)),
      ).sort((a, b) => Number(b) - Number(a)),
    ];
  }, [papers]);

  // =====================================================
  // FILTER QUESTION PAPERS
  // =====================================================

  const filteredPapers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return papers.filter((paper) => {
      const matchesSearch =
        !search ||
        paper.title?.toLowerCase().includes(search) ||
        paper.subject?.toLowerCase().includes(search) ||
        paper.class_name?.toLowerCase().includes(search) ||
        paper.exam_type?.toLowerCase().includes(search) ||
        String(paper.year || "").includes(search);

      const matchesClass =
        selectedClass === "All" || paper.class_name === selectedClass;

      const matchesSubject =
        selectedSubject === "All" || paper.subject === selectedSubject;

      const matchesExamType =
        selectedExamType === "All" || paper.exam_type === selectedExamType;

      const matchesYear =
        selectedYear === "All" || String(paper.year) === String(selectedYear);

      return (
        matchesSearch &&
        matchesClass &&
        matchesSubject &&
        matchesExamType &&
        matchesYear
      );
    });
  }, [
    papers,
    searchTerm,
    selectedClass,
    selectedSubject,
    selectedExamType,
    selectedYear,
  ]);

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedClass("All");
    setSelectedSubject("All");
    setSelectedExamType("All");
    setSelectedYear("All");
  };

  const hasActiveFilters =
    searchTerm ||
    selectedClass !== "All" ||
    selectedSubject !== "All" ||
    selectedExamType !== "All" ||
    selectedYear !== "All";

  // =====================================================
  // UI
  // =====================================================

  return (
    <section
      id="question-papers"
      className="relative overflow-hidden bg-[#0B1020] px-4 py-20 text-white scroll-mt-20 sm:px-6 md:py-24 lg:px-8"
    >
      {/* Background Effects */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-lime-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#84cc16 1px, transparent 1px), linear-gradient(90deg, #84cc16 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-lime-400/30 bg-lime-400/5 px-5 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400 shadow-[0_0_10px_#a3e635]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400 sm:text-sm">
              {t.questionPapers.practiceMaterial}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t.questionPapers.titlePrefix}{" "}
            <span className="text-lime-400">
              {t.questionPapers.titleHighlight}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            {t.questionPapers.description}
          </p>
        </div>

        {/* Search + Filter Panel */}

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lime-400/5 blur-3xl" />

          <div className="relative">
            {/* Search */}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="paper-search"
                  className="text-sm font-semibold text-slate-300"
                >
                  {t.questionPapers.searchLabel}
                </label>

                <span className="text-xs text-slate-600">
                  {papers.length} {t.questionPapers.total}
                </span>
              </div>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500">
                  🔍
                </span>

                <input
                  id="paper-search"
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t.questionPapers.searchPlaceholder}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-slate-600 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                />
              </div>
            </div>

            {/* Filters */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Class */}

              <div>
                <label
                  htmlFor="class-filter"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  {t.questionPapers.classLabel}
                </label>

                <select
                  id="class-filter"
                  value={selectedClass}
                  onChange={(event) => setSelectedClass(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 text-sm text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                >
                  {classOptions.map((className) => (
                    <option key={className} value={className}>
                      {className === "All"
                        ? t.questionPapers.allClasses
                        : className}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}

              <div>
                <label
                  htmlFor="subject-filter"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  {t.questionPapers.subjectLabel}
                </label>

                <select
                  id="subject-filter"
                  value={selectedSubject}
                  onChange={(event) => setSelectedSubject(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 text-sm text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                >
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject === "All"
                        ? t.questionPapers.allSubjects
                        : subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exam Type */}

              <div>
                <label
                  htmlFor="exam-filter"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  {t.questionPapers.examTypeLabel}
                </label>

                <select
                  id="exam-filter"
                  value={selectedExamType}
                  onChange={(event) => setSelectedExamType(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 text-sm text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                >
                  {examTypeOptions.map((examType) => (
                    <option key={examType} value={examType}>
                      {examType === "All"
                        ? t.questionPapers.allExams
                        : examType}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}

              <div>
                <label
                  htmlFor="year-filter"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  {t.questionPapers.yearLabel}
                </label>

                <select
                  id="year-filter"
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(event.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 text-sm text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year === "All" ? t.questionPapers.allYears : year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Footer */}

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">
                {t.questionPapers.showing}{" "}
                <span className="font-bold text-lime-400">
                  {filteredPapers.length}
                </span>{" "}
                {t.questionPapers.of}{" "}
                <span className="font-bold text-white">{papers.length}</span>{" "}
                {t.questionPapers.papers}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-lg border border-lime-400/60 px-4 py-2 text-sm font-semibold text-lime-400 transition hover:bg-lime-400 hover:text-slate-950"
                >
                  {t.questionPapers.clearFilters}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-lime-400" />

            <p className="text-sm text-slate-400">{t.questionPapers.loading}</p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
            <div className="mb-4 text-4xl">⚠️</div>

            <h3 className="font-bold text-red-400">
              {t.questionPapers.errorTitle}
            </h3>

            <p className="mt-2 break-words text-sm leading-6 text-slate-400">
              {t.questionPapers.errorDescription}
            </p>

            <button
              type="button"
              onClick={fetchQuestionPapers}
              className="mt-6 rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-lime-300"
            >
              {t.questionPapers.tryAgain}
            </button>
          </div>
        )}

        {/* Empty State */}

        {!loading && !error && filteredPapers.length === 0 && (
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-10 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-400/10 text-3xl">
              📄
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              {t.questionPapers.noPapersTitle}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {hasActiveFilters
                ? t.questionPapers.noMatchingPapers
                : t.questionPapers.noPapersAvailable}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-lime-300"
              >
                {t.questionPapers.clearFilters}
              </button>
            )}
          </div>
        )}

        {/* Question Papers Grid */}

        {!loading && !error && filteredPapers.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map((paper) => {
              const pdfUrl = getPdfUrl(paper.file_path);

              return (
                <article
                  key={paper.id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-400/50 hover:shadow-lime-400/5"
                >
                  {/* Top Glow */}

                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-lime-400/5 blur-3xl transition group-hover:bg-lime-400/10" />

                  {/* Card Header */}

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10 text-2xl">
                      📄
                    </div>

                    <span className="rounded-full border border-lime-400/30 bg-lime-400/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-lime-400">
                      PDF
                    </span>
                  </div>

                  {/* Title */}

                  <h3 className="relative mt-5 min-h-14 text-lg font-bold leading-7 text-white">
                    {paper.title || t.questionPapers.defaultPaperTitle}
                  </h3>

                  {/* Details */}

                  <div className="relative mt-5 space-y-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 text-sm">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-500">
                        {t.questionPapers.classLabel}
                      </span>

                      <span className="text-right font-semibold text-lime-400">
                        {paper.class_name || t.questionPapers.notAvailable}
                      </span>
                    </div>

                    <div className="h-px bg-slate-800" />

                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-500">
                        {t.questionPapers.subjectLabel}
                      </span>

                      <span className="text-right font-semibold text-slate-200">
                        {paper.subject || t.questionPapers.notAvailable}
                      </span>
                    </div>

                    <div className="h-px bg-slate-800" />

                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-500">
                        {t.questionPapers.examLabel}
                      </span>

                      <span className="text-right font-semibold text-slate-200">
                        {paper.exam_type || t.questionPapers.notAvailable}
                      </span>
                    </div>

                    <div className="h-px bg-slate-800" />

                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-500">
                        {t.questionPapers.yearLabel}
                      </span>

                      <span className="font-semibold text-slate-200">
                        {paper.year || t.questionPapers.notAvailable}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}

                  <div className="relative mt-auto pt-6">
                    {pdfUrl ? (
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl bg-lime-400 px-3 py-3 text-center text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-lime-300"
                        >
                          {t.questionPapers.viewPdf}
                        </a>

                        <a
                          href={pdfUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-lime-400/60 px-3 py-3 text-center text-sm font-bold text-lime-400 transition hover:-translate-y-0.5 hover:bg-lime-400 hover:text-slate-950"
                        >
                          {t.questionPapers.download}
                        </a>
                      </div>
                    ) : (
                      <p className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-3 text-center text-sm text-yellow-300">
                        {t.questionPapers.pdfUnavailable}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Info */}

        {!loading && !error && papers.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-xs text-slate-600">
              {t.questionPapers.autoUpdateInfo}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default QuestionPapers;
