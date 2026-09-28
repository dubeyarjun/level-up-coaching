import { useLanguage } from "../context/LanguageContext";

function AboutSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: "📚",
      title: t.about.feature1Title,
      description: t.about.feature1Text,
    },
    {
      icon: "🎯",
      title: t.about.feature2Title,
      description: t.about.feature2Text,
    },
    {
      icon: "📝",
      title: t.about.feature3Title,
      description: t.about.feature3Text,
    },
    {
      icon: "💬",
      title: t.about.feature4Title,
      description: t.about.feature4Text,
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0B1020] px-6 py-20 sm:py-24"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-lime-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
            {t.about.smallTitle}
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t.about.title}
            <span className="block text-lime-400">{t.about.title2}</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            {t.about.description}
          </p>
        </div>

        {/* Main About Box */}
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Left Content */}
          <div className="rounded-3xl border border-slate-800 bg-[#111827] p-7 shadow-xl sm:p-8 lg:col-span-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-2xl">
              🎓
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              {t.about.focusedTitle}
            </h3>

            <p className="mt-4 leading-7 text-slate-400">
              {t.about.focusedDescription}
            </p>

            {/* Mini Points */}
            <div className="mt-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400/10 text-sm text-lime-400">
                  ✓
                </span>

                <span className="text-sm text-slate-300">
                  {t.about.structuredStudy}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400/10 text-sm text-lime-400">
                  ✓
                </span>

                <span className="text-sm text-slate-300">
                  {t.about.regularPractice}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400/10 text-sm text-lime-400">
                  ✓
                </span>

                <span className="text-sm text-slate-300">
                  {t.about.doubtSupport}
                </span>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-800 bg-[#151D30] p-6 transition duration-300 hover:-translate-y-1 hover:border-lime-400/70 hover:shadow-lg hover:shadow-lime-400/5"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-2xl transition group-hover:bg-lime-400 group-hover:text-slate-950">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-bold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mt-8 rounded-2xl border border-lime-400/20 bg-lime-400/5 px-6 py-5 text-center">
          <p className="text-sm leading-6 text-slate-300 sm:text-base">
            <span className="font-bold text-lime-400">
              {t.about.ourApproach}
            </span>{" "}
            {t.about.approachSteps}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
