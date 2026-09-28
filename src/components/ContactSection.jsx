import EnquiryForm from "./EnquiryForm";
import { useLanguage } from "../context/LanguageContext";

function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-900 px-4 py-20 text-white sm:px-6 md:py-24"
    >
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-lime-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

      {/* Tech Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#84cc16 1px, transparent 1px), linear-gradient(90deg, #84cc16 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-lime-400/30 bg-lime-400/5 px-5 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400 shadow-[0_0_10px_#a3e635]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400 sm:text-sm">
              {t.contact.getInTouch}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t.contact.startYour}{" "}
            <span className="text-lime-400">{t.contact.learningJourney}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            {t.contact.description}
          </p>
        </div>

        {/* =====================================================
            CONTACT CONTENT
        ====================================================== */}

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* =================================================
              LEFT CONTACT INFORMATION
          ================================================== */}

          <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            {/* Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-lime-400/10 blur-3xl" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-2xl text-slate-950 shadow-[0_0_25px_rgba(163,230,53,0.15)]">
                  💬
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {t.contact.needHelp}
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold">
                    {t.contact.haveQuestions}
                  </h3>
                </div>
              </div>

              <p className="mt-6 leading-7 text-slate-400">
                {t.contact.contactDescription}
              </p>

              {/* Contact Cards */}
              <div className="mt-8 space-y-4">
                {/* Coaching */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition duration-300 hover:border-lime-400/40 hover:bg-slate-800">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-xl transition group-hover:bg-lime-400">
                    📚
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {t.contact.coachingClasses}
                    </p>

                    <p className="mt-1 font-bold text-white">
                      {t.contact.classes6to12}
                    </p>
                  </div>
                </div>

                {/* Learning Pattern */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition duration-300 hover:border-cyan-400/40 hover:bg-slate-800">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-xl transition group-hover:bg-cyan-400">
                    🎯
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {t.contact.learningPattern}
                    </p>

                    <p className="mt-1 font-bold text-white">
                      {t.contact.cbseNcertBased}
                    </p>
                  </div>
                </div>

                {/* Mode */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition duration-300 hover:border-purple-400/40 hover:bg-slate-800">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-400/10 text-xl transition group-hover:bg-purple-400">
                    🏫
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {t.contact.mode}
                    </p>

                    <p className="mt-1 font-bold text-white">
                      {t.contact.offlineCoaching}
                    </p>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div className="mt-7 rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
                  {t.contact.simpleProcess}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                  <span className="rounded-lg bg-slate-900 px-3 py-2 text-slate-300">
                    {t.contact.enquiry}
                  </span>

                  <span className="text-lime-400">→</span>

                  <span className="rounded-lg bg-slate-900 px-3 py-2 text-slate-300">
                    {t.contact.discussion}
                  </span>

                  <span className="text-lime-400">→</span>

                  <span className="rounded-lg bg-slate-900 px-3 py-2 text-slate-300">
                    {t.contact.startLearning}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              ENQUIRY FORM
          ================================================== */}

          <div className="relative">
            {/* Form Glow */}
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-lime-400/20 via-transparent to-cyan-400/20 blur-xl" />

            <div className="relative rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl sm:p-8">
              {/* Form Header */}
              <div className="mb-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {t.contact.admissionCourseEnquiry}
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                      {t.contact.sendEnquiry}
                    </h3>
                  </div>

                  <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-xl sm:flex">
                    📝
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {t.contact.formDescription}
                </p>
              </div>

              {/* Existing Form */}
              <EnquiryForm />
            </div>
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 px-5 py-5 text-center">
          <p className="text-sm text-slate-400">
            <span className="font-bold text-lime-400">
              {t.contact.readyToLearn}
            </span>{" "}
            {t.contact.startJourney}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
