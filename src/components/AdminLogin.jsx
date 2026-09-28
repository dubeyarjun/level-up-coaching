import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageContext";

function AdminLogin({ onLoginSuccess }) {
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (loginError) {
      console.error("Login error:", loginError);
      setError(t.adminLogin.invalidCredentials);
      return;
    }

    console.log("Login successful:", data.user);

    if (onLoginSuccess) {
      onLoginSuccess(data.user);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#060914] px-4 py-16 text-white sm:py-20">
      {/* Background Effects */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-lime-400/10 blur-[100px]" />

        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />

        <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Top Label */}

          <div className="mb-5 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-400/30 bg-lime-400/10 shadow-[0_0_30px_rgba(163,230,53,0.12)]">
              <span className="text-3xl">🔐</span>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-lime-400">
              {t.adminLogin.secureAccess}
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              {t.adminLogin.teacherLogin}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
              {t.adminLogin.description}
            </p>
          </div>

          {/* Login Card */}

          <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            {/* Top Glow */}

            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-lime-400 to-transparent" />

            {/* Corner Glow */}

            <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-lime-400/10 blur-3xl" />

            <form onSubmit={handleLogin} className="relative space-y-5">
              {/* Email */}

              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  {t.adminLogin.emailAddress}
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    ✉
                  </span>

                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder={t.adminLogin.emailPlaceholder}
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-3.5 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                    required
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  {t.adminLogin.password}
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    🔑
                  </span>

                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder={t.adminLogin.passwordPlaceholder}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-3.5 pl-11 pr-14 text-white outline-none transition placeholder:text-slate-600 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 transition hover:bg-slate-800 hover:text-lime-400"
                  >
                    {showPassword ? t.adminLogin.hide : t.adminLogin.show}
                  </button>
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                  <span className="mt-0.5">⚠️</span>

                  <div>
                    <p className="text-sm font-semibold text-red-400">
                      {t.adminLogin.loginFailed}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-300/80">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-lime-400 px-6 py-3.5 font-bold text-slate-950 shadow-[0_0_25px_rgba(163,230,53,0.12)] transition hover:bg-lime-300 hover:shadow-[0_0_35px_rgba(163,230,53,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />

                      {t.adminLogin.loggingIn}
                    </>
                  ) : (
                    <>
                      {t.adminLogin.loginToDashboard}

                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Security Info */}

            <div className="mt-6 border-t border-slate-800 pt-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-lime-400/20 bg-lime-400/10 text-sm">
                  🛡️
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {t.adminLogin.secureAdminArea}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {t.adminLogin.securityDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status */}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />

            <span>{t.adminLogin.protectedPortal}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
