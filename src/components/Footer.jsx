import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const currentYear = new Date().getFullYear();

  const { t } = useLanguage();

  const quickLinks = [
    {
      name: t.footer.home,
      href: "#home",
    },
    {
      name: t.footer.about,
      href: "#about",
    },
    {
      name: t.footer.subjects,
      href: "#subjects",
    },
    {
      name: t.footer.questionPapers,
      href: "#question-papers",
    },
    {
      name: t.footer.contact,
      href: "#contact",
    },
  ];

  const classLinks = [
    t.footer.classes68,
    t.footer.classes910,
    t.footer.classes1112,
    t.footer.cbsePreparation,
    t.footer.ncertLearning,
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 px-6 pt-16 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-lime-400/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-cyan-400/5 blur-3xl" />

      {/* Top Line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {/* Main Footer */}
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Coaching Information */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10 shadow-lg shadow-lime-400/5">
                <span className="text-lg font-black text-lime-400">LU</span>
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight">
                  LEVEL-UP
                </h2>

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime-400">
                  Coaching
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              {t.footer.description}
            </p>

            {/* Tagline */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />

              <span className="text-sm font-bold text-lime-400">
                {t.footer.tagline}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white">
              {t.footer.quickLinks}
            </h3>

            <div className="mt-3 h-0.5 w-10 bg-lime-400" />

            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 transition hover:text-lime-400"
                  >
                    <span className="text-lime-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>

                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-lg font-bold text-white">
              {t.footer.classesTitle}
            </h3>

            <div className="mt-3 h-0.5 w-10 bg-lime-400" />

            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              {classLinks.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-lime-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white">
              {t.footer.contactTitle}
            </h3>

            <div className="mt-3 h-0.5 w-10 bg-lime-400" />

            <div className="mt-6 space-y-4">
              {/* Location */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-lime-400/30">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-lg">
                    📍
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t.footer.location}
                    </p>

                    <p className="mt-1 text-sm leading-5 text-slate-300">
                      Renusagar Sonbhadra UP, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-lime-400/30">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-lg">
                    📞
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t.footer.phone}
                    </p>

                    <a
                      href="tel:+917985123521"
                      className="mt-1 block text-sm text-slate-300 transition hover:text-lime-400"
                    >
                      +91 7985123521
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-lime-400/30">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-lg">
                    ✉️
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t.footer.email}
                    </p>

                    <a
                      href="mailto:dubeysuraj468@gmail.com"
                      className="mt-1 block break-all text-sm text-slate-300 transition hover:text-lime-400"
                    >
                      dubeysuraj468@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-semibold text-white">
                {t.footer.readyTitle}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {t.footer.readyDescription}
              </p>
            </div>

            <a
              href="#contact"
              className="rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-400/20"
            >
              {t.footer.admission} →
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-slate-500 md:flex-row md:text-left">
            <p>
              © {currentYear} Level-Up Coaching. {t.footer.rights}
            </p>

            <p>
              Designed and developed by{" "}
              <span className="font-semibold text-lime-400">Neeraj Dubey</span>{" "}
              <span className="text-red-400">❤️</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
