import surajImage from "../assets/suraj.png";
import { useLanguage } from "../context/LanguageContext";

function TeacherProfile() {
  const { t } = useLanguage();

  const teacher = {
    name: "Suraj Dubey",
    subject: t.teacher.subject,
    qualification: "Diploma / B.A.",
    classes: t.teacher.classes,
    experience: t.teacher.experience,
    image: surajImage,
  };

  const subjects = [
    t.teacher.mathematics,
    t.teacher.science,
    t.teacher.physics,
    t.teacher.chemistry,
    t.teacher.basics,
    t.teacher.exam,
  ];

  return (
    <section
      id="teachers"
      className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 md:py-24"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-lime-400/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-[120px]" />

      {/* Tech Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#84cc16 1px, transparent 1px), linear-gradient(90deg, #84cc16 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-lime-400/30 bg-lime-400/5 px-5 py-2 backdrop-blur-md">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-lime-400 shadow-[0_0_10px_#a3e635]" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400 sm:text-sm">
              {t.teacher.smallTitle}
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t.teacher.titlePrefix}{" "}
            <span className="text-lime-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.25)]">
              {t.teacher.titleHighlight}
            </span>{" "}
            {t.teacher.titleSuffix}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
            {t.teacher.description}
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-900/70 shadow-[0_0_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          {/* Top Neon Line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-80" />

          <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-[310px_1fr_1fr] lg:gap-10 lg:p-10">
            {/* Teacher Image */}
            <div className="relative mx-auto w-full max-w-sm lg:mx-0">
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-lime-400/40 via-transparent to-cyan-400/30 blur-md" />

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-[2rem] border border-lime-400/50 bg-slate-800/80 p-1.5 shadow-[0_0_40px_rgba(163,230,53,0.08)]">
                <img
                  src={teacher.image}
                  alt={`${teacher.name} profile`}
                  className="h-[390px] w-full rounded-[1.6rem] object-cover object-top transition duration-700 hover:scale-[1.03] sm:h-[430px]"
                />

                {/* Image Gradient */}
                <div className="pointer-events-none absolute inset-x-2 bottom-2 h-32 rounded-b-[1.5rem] bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                {/* Teacher Badge */}
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-lime-300/40 bg-slate-950/80 px-4 py-2 text-xs font-bold text-lime-400 shadow-lg backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635]" />
                  🎓 {t.teacher.teacherBadge}
                </div>

                {/* Experience */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        {t.teacher.experienceLabel}
                      </p>

                      <p className="mt-1 text-lg font-extrabold text-lime-400">
                        {teacher.experience}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10 text-xl">
                      🏆
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Corners */}
              <div className="absolute -left-2 -top-2 h-8 w-8 border-l-2 border-t-2 border-lime-400" />

              <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-2 border-r-2 border-cyan-400" />
            </div>

            {/* Teacher Details */}
            <div className="flex flex-col justify-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                {t.teacher.learningGuide}
              </p>

              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {teacher.name}
              </h3>

              <p className="mt-3 text-xl font-bold text-lime-400">
                {teacher.subject}
              </p>

              {/* Neon Divider */}
              <div className="mt-5 flex items-center gap-2">
                <div className="h-1 w-16 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
                <div className="h-1 w-2 rounded-full bg-cyan-400" />
              </div>

              {/* Details */}
              <div className="mt-8 space-y-4">
                {/* Qualification */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-800/40 p-4 transition duration-300 hover:border-lime-400/40 hover:bg-slate-800/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-xl transition group-hover:bg-lime-400">
                    🎓
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {t.teacher.qualificationLabel}
                    </p>

                    <p className="mt-1 font-bold text-white">
                      {teacher.qualification}
                    </p>
                  </div>
                </div>

                {/* Classes */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-800/40 p-4 transition duration-300 hover:border-cyan-400/40 hover:bg-slate-800/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-xl transition group-hover:bg-cyan-400">
                    📚
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {t.teacher.classesLabel}
                    </p>

                    <p className="mt-1 font-bold text-white">
                      {teacher.classes}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-800/40 p-4 transition duration-300 hover:border-yellow-400/40 hover:bg-slate-800/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-xl transition group-hover:bg-yellow-400">
                    🏅
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {t.teacher.experienceLabel}
                    </p>

                    <p className="mt-1 font-bold text-white">
                      {teacher.experience}
                    </p>
                  </div>
                </div>

                {/* Teaching Style */}
                <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-800/40 p-4 transition duration-300 hover:border-purple-400/40 hover:bg-slate-800/70">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-400/10 text-xl transition group-hover:bg-purple-400">
                    💡
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {t.teacher.teachingStyle}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white">
                      {t.teacher.teachingStyleValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information */}
            <div className="flex flex-col justify-center gap-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="group rounded-2xl border border-slate-700 bg-slate-800/50 p-5 text-center transition hover:border-lime-400/60 hover:bg-lime-400/5">
                  <p className="text-3xl font-black text-lime-400">6–12</p>

                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                    {t.teacher.classesLabel}
                  </p>
                </div>

                <div className="group rounded-2xl border border-slate-700 bg-slate-800/50 p-5 text-center transition hover:border-cyan-400/60 hover:bg-cyan-400/5">
                  <p className="text-3xl font-black text-cyan-400">CBSE</p>

                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                    {t.teacher.boardFocus}
                  </p>
                </div>
              </div>

              {/* Subjects */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10">
                      📖
                    </div>

                    <h4 className="font-bold">{t.teacher.subjectsTitle}</h4>
                  </div>

                  <span className="text-xs text-slate-500">
                    {subjects.length} {t.teacher.subjectCount}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-300 transition duration-300 hover:border-lime-400 hover:bg-lime-400 hover:text-slate-950"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Teaching Goal */}
              <div className="relative overflow-hidden rounded-2xl border border-lime-400/30 bg-gradient-to-br from-lime-400 to-green-300 p-6 text-slate-950 shadow-[0_0_30px_rgba(163,230,53,0.08)]">
                {/* Decorative Circle */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/20 blur-2xl" />

                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950/10 text-xl">
                      🎯
                    </div>

                    <h4 className="text-lg font-extrabold">
                      {t.teacher.goalTitle}
                    </h4>
                  </div>

                  <p className="text-sm font-medium leading-7 text-slate-800">
                    {t.teacher.goalText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="border-t border-slate-800 bg-slate-950/30 px-5 py-6 sm:px-8 lg:px-10">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition hover:border-lime-400/20 hover:bg-lime-400/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-2xl transition group-hover:bg-lime-400">
                  📗
                </div>

                <div>
                  <h4 className="font-bold">{t.teacher.conceptClarity}</h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {t.teacher.conceptClarityText}
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition hover:border-cyan-400/20 hover:bg-cyan-400/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl transition group-hover:bg-cyan-400">
                  👨‍🎓
                </div>

                <div>
                  <h4 className="font-bold">{t.teacher.studentSupport}</h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {t.teacher.studentSupportText}
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition hover:border-yellow-400/20 hover:bg-yellow-400/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-2xl transition group-hover:bg-yellow-400">
                  📈
                </div>

                <div>
                  <h4 className="font-bold">{t.teacher.betterLearning}</h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {t.teacher.betterLearningText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-10 text-center">
          <p className="text-base font-semibold italic text-slate-400 sm:text-lg">
            <span className="mr-2 text-3xl text-lime-400">“</span>
            {t.teacher.quote}
            <span className="ml-2 text-3xl text-lime-400">”</span>
          </p>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.5)]" />
        </div>
      </div>
    </section>
  );
}

export default TeacherProfile;
