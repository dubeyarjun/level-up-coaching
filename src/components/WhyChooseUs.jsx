import { useLanguage } from "../context/LanguageContext";

function WhyChooseUs() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: "🎯",
      title: t.whyChoose.cbse,
      description: t.whyChoose.cbseDescription,
    },
    {
      icon: "📚",
      title: t.whyChoose.ncert,
      description: t.whyChoose.ncertDescription,
    },
    {
      icon: "🎓",
      title: t.whyChoose.classes,
      description: t.whyChoose.classesDescription,
    },
    {
      icon: "📝",
      title: t.whyChoose.tests,
      description: t.whyChoose.testsDescription,
    },
    {
      icon: "💡",
      title: t.whyChoose.doubts,
      description: t.whyChoose.doubtsDescription,
    },
    {
      icon: "👨‍🎓",
      title: t.whyChoose.attention,
      description: t.whyChoose.attentionDescription,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0F172A] px-6 py-20 sm:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-lime-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

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
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-lime-400/30 bg-lime-400/5 px-5 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400 shadow-[0_0_10px_#a3e635]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400 sm:text-sm">
              {t.whyChoose.smallTitle}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t.whyChoose.titlePrefix}
            <span className="block text-lime-400">
              {t.whyChoose.titleHighlight}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            {t.whyChoose.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          {/* Left Information Card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/70 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
            {/* Glow */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-lime-400/10 blur-3xl" />

            <div className="relative">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-400/30 bg-lime-400/10 text-3xl shadow-[0_0_25px_rgba(163,230,53,0.08)]">
                🚀
              </div>

              <h3 className="mt-7 text-2xl font-extrabold text-white sm:text-3xl">
                {t.whyChoose.learningTitle}
                <span className="text-lime-400">
                  {" "}
                  {t.whyChoose.learningHighlight}
                </span>
              </h3>

              <p className="mt-5 leading-7 text-slate-400">
                {t.whyChoose.learningDescription}
              </p>

              {/* Process */}
              <div className="mt-8 space-y-4">
                {/* Step 01 */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 font-black text-slate-950">
                    01
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      {t.whyChoose.understand}
                    </p>

                    <p className="text-sm text-slate-500">
                      {t.whyChoose.understandText}
                    </p>
                  </div>
                </div>

                <div className="ml-5 h-5 border-l border-dashed border-slate-700" />

                {/* Step 02 */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950">
                    02
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      {t.whyChoose.practice}
                    </p>

                    <p className="text-sm text-slate-500">
                      {t.whyChoose.practiceText}
                    </p>
                  </div>
                </div>

                <div className="ml-5 h-5 border-l border-dashed border-slate-700" />

                {/* Step 03 */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400 font-black text-slate-950">
                    03
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      {t.whyChoose.improve}
                    </p>

                    <p className="text-sm text-slate-500">
                      {t.whyChoose.improveText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/60 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-lime-400/50 hover:bg-slate-800/80 hover:shadow-[0_10px_35px_rgba(163,230,53,0.06)]"
              >
                {/* Number */}
                <span className="absolute right-4 top-4 text-xs font-bold text-slate-700 transition group-hover:text-lime-400/40">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-2xl transition duration-300 group-hover:bg-lime-400 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.25)]">
                  {benefit.icon}
                </div>

                {/* Content */}
                <h3 className="mt-5 text-lg font-bold text-white">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {benefit.description}
                </p>

                {/* Bottom Accent */}
                <div className="mt-5 h-px w-10 bg-slate-700 transition-all duration-300 group-hover:w-full group-hover:bg-lime-400/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5 text-center backdrop-blur-md">
          <p className="text-sm font-medium text-slate-300 sm:text-base">
            <span className="font-bold text-lime-400">
              {t.whyChoose.approachTitle}
            </span>{" "}
            {t.whyChoose.approachSteps}
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
