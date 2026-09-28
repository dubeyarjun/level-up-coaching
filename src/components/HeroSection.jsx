import { useLanguage } from "../context/LanguageContext";

function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 px-6 pb-20 pt-16 text-white md:pb-28 md:pt-24"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-lime-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div>
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm font-semibold text-lime-400">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            {t.hero.badge}
          </div>

          {/* Main Heading */}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {t.hero.title1}
            <span className="block text-lime-400">{t.hero.title2}</span>
            <span className="block">{t.hero.title3}</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {t.hero.description}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="rounded-xl bg-lime-400 px-7 py-3.5 text-center font-bold text-slate-950 shadow-lg shadow-lime-400/10 transition hover:-translate-y-0.5 hover:bg-lime-300"
            >
              {t.hero.admission}
            </a>

            <a
              href="#question-papers"
              className="rounded-xl border border-slate-600 px-7 py-3.5 text-center font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
            >
              {t.hero.papers}
            </a>
          </div>

          {/* Highlights */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-slate-800 pt-7">
            <div>
              <span className="block text-2xl font-extrabold text-lime-400 sm:text-3xl">
                6–12
              </span>

              <span className="mt-1 block text-xs text-slate-400 sm:text-sm">
                {t.hero.classes}
              </span>
            </div>

            <div className="border-l border-slate-800 pl-4">
              <span className="block text-2xl font-extrabold text-lime-400 sm:text-3xl">
                CBSE
              </span>

              <span className="mt-1 block text-xs text-slate-400 sm:text-sm">
                {t.hero.board}
              </span>
            </div>

            <div className="border-l border-slate-800 pl-4">
              <span className="block text-2xl font-extrabold text-lime-400 sm:text-3xl">
                NCERT
              </span>

              <span className="mt-1 block text-xs text-slate-400 sm:text-sm">
                {t.hero.learning}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative">
          {/* Main Card */}
          <div className="relative rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-2xl backdrop-blur sm:p-8">
            {/* Top Card */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-lime-400 text-2xl font-black text-slate-950 shadow-lg shadow-lime-400/10">
                LU
              </div>

              <div>
                <p className="text-sm font-medium text-slate-400">
                  Level-Up Coaching
                </p>

                <h2 className="text-xl font-bold sm:text-2xl">
                  {t.hero.title2.replace(".", "")}.{" "}
                  {t.hero.title1.replace(".", "")}.
                </h2>
              </div>
            </div>

            {/* Card Description */}
            <p className="mt-6 leading-7 text-slate-400">
              {t.about.description}
            </p>

            {/* Class 6–10 */}
            <div className="mt-7 rounded-2xl border border-slate-700 bg-slate-800/80 p-5 transition hover:border-lime-400/50">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-lime-400">
                    {t.hero.classes} 6–10
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Strong foundation & school preparation
                  </p>
                </div>

                <span className="text-2xl">📚</span>
              </div>
            </div>

            {/* Class 11–12 */}
            <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-800/80 p-5 transition hover:border-lime-400/50">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-lime-400">
                    {t.hero.classes} 11–12
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    Science stream focused learning
                  </p>
                </div>

                <span className="text-2xl">🎓</span>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-lime-400/20 bg-lime-400/5 px-4 py-3">
              <span className="text-sm text-slate-300">Regular Practice</span>

              <span className="text-sm font-bold text-lime-400">
                ✓ Concept Focused
              </span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-5 -top-5 -z-0 h-24 w-24 rounded-full bg-lime-400/20 blur-2xl" />
          <div className="absolute -bottom-6 -left-6 -z-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
