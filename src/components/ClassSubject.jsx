import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function ClassSubject() {
  const { t } = useLanguage();

  const [selectedClass, setSelectedClass] = useState("Class 6");

  const subjectsByClass = {
    "Class 6": ["Mathematics", "Science", "English", "Social Science", "Hindi"],
    "Class 7": ["Mathematics", "Science", "English", "Social Science", "Hindi"],
    "Class 8": ["Mathematics", "Science", "English", "Social Science", "Hindi"],
    "Class 9": ["Mathematics", "Science", "English", "Social Science", "Hindi"],
    "Class 10": ["Mathematics", "Science", "English"],
    "Class 11": ["Physics", "Chemistry", "Mathematics"],
    "Class 12": ["Physics", "Chemistry", "Mathematics"],
  };

  const subjects = subjectsByClass[selectedClass];

  return (
    <section
      id="classes"
      className="relative overflow-hidden bg-[#0B1020] px-4 py-20 scroll-mt-20 sm:px-6 md:py-24"
    >
      {/* Hidden anchor for Subjects link */}
      <div id="subjects" className="absolute -top-20" />

      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-lime-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

      {/* Tech Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#84cc16 1px, transparent 1px), linear-gradient(90deg, #84cc16 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* =====================================================
            HEADING
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-lime-400/30 bg-lime-400/5 px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_10px_#a3e635]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400 sm:text-sm">
              {t.classes.exploreSubjects}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {t.classes.chooseYour}{" "}
            <span className="text-lime-400">{t.classes.classHighlight}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            {t.classes.description}
          </p>
        </div>

        {/* =====================================================
            CLASS SELECTOR
        ====================================================== */}

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t.classes.selectClass}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {t.classes.classesRange}
              </p>
            </div>

            <div className="hidden rounded-full border border-lime-400/20 bg-lime-400/5 px-3 py-1 text-xs font-semibold text-lime-400 sm:block">
              {selectedClass}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {Object.keys(subjectsByClass).map((className) => (
              <button
                key={className}
                type="button"
                onClick={() => setSelectedClass(className)}
                className={`rounded-xl border px-3 py-3 text-sm font-bold transition duration-300 ${
                  selectedClass === className
                    ? "border-lime-400 bg-lime-400 text-slate-950 shadow-[0_0_20px_rgba(163,230,53,0.18)]"
                    : "border-slate-700 bg-slate-950/60 text-slate-400 hover:border-lime-400/50 hover:text-lime-400"
                }`}
              >
                {className}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            SELECTED CLASS CARD
        ====================================================== */}

        <div className="relative mt-8 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          {/* Card Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" />

          <div className="relative">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {t.classes.selectedClass}
                </p>

                <h3 className="mt-2 text-3xl font-extrabold text-white">
                  {selectedClass}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-lime-400/30 bg-lime-400/5 px-3 py-1 text-xs font-semibold text-lime-400">
                    {t.classes.cbseBoard}
                  </span>

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-xs font-semibold text-cyan-400">
                    {t.classes.ncertPattern}
                  </span>
                </div>
              </div>

              {/* Subject Count */}
              <div className="rounded-2xl border border-slate-700 bg-slate-950/70 px-6 py-4 text-center">
                <p className="text-2xl font-black text-lime-400">
                  {subjects.length}
                </p>

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  {t.classes.subjects}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-gradient-to-r from-lime-400/40 via-slate-700 to-transparent" />

            {/* Subjects */}
            <div className="grid gap-4 sm:grid-cols-2">
              {subjects.map((subject, index) => (
                <div
                  key={subject}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/60 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-lime-400/50 hover:bg-slate-800/70"
                >
                  {/* Number */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-sm font-black text-lime-400 transition group-hover:bg-lime-400 group-hover:text-slate-950">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-slate-200">{subject}</p>

                    <p className="mt-1 text-xs text-slate-500">
                      {t.classes.conceptPractice}
                    </p>
                  </div>

                  <span className="text-lg text-lime-400 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100">
                    →
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-white">
                  {t.classes.interestedIn} {selectedClass}?
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {t.classes.admissionDescription}
                </p>
              </div>

              <a
                href="#contact"
                className="rounded-xl bg-lime-400 px-6 py-3 text-center text-sm font-bold text-slate-950 shadow-lg shadow-lime-400/10 transition hover:-translate-y-0.5 hover:bg-lime-300"
              >
                {t.classes.enquireNow}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            {t.classes.bottomDescription}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ClassSubject;
