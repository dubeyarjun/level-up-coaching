import { useEffect, useRef, useState } from "react";
import { supabase } from "./lib/supabaseClient";

import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ClassSubject from "./components/ClassSubject";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import TeacherProfile from "./components/TeacherProfile";
import QuestionPapers from "./components/QuestionPapers";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminLogin from "./components/AdminLogin";

const ADMIN_USER_ID = "8f837c73-8b80-432c-a314-ffd8859d4c3d";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Admin panel visibility
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Login must be completed manually from the login form
  const [adminAccessGranted, setAdminAccessGranted] = useState(false);

  // Admin login/dashboard section ka reference
  const adminPanelRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error);
      }

      if (isMounted) {
        const loggedInUser = data.session?.user ?? null;

        setUser(loggedInUser);

        // Existing session se dashboard automatically open nahi hoga
        setAdminAccessGranted(false);

        setAuthLoading(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Admin panel open hone ke baad automatically usi section par scroll hoga
  useEffect(() => {
    if (showAdminPanel) {
      const scrollToAdminPanel = () => {
        adminPanelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };

      // Panel render hone ke baad scroll execute hoga
      const timer = setTimeout(scrollToAdminPanel, 100);

      return () => clearTimeout(timer);
    }
  }, [showAdminPanel]);

  // Open/close login form
  const handleAdminButtonClick = () => {
    const willOpen = !showAdminPanel;

    setShowAdminPanel(willOpen);

    // Har baar login form first open hoga
    if (willOpen) {
      setAdminAccessGranted(false);
    }
  };

  // Called after successful login
  const handleLoginSuccess = async (loggedInUser) => {
    // Check logged-in user's UUID
    if (loggedInUser?.id !== ADMIN_USER_ID) {
      alert("Access denied. Sirf authorized admin login kar sakta hai.");

      await supabase.auth.signOut();

      setUser(null);
      setAdminAccessGranted(false);

      return;
    }

    // Authorized admin
    setUser(loggedInUser);
    setAdminAccessGranted(true);
  };

  // Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    setUser(null);
    setAdminAccessGranted(false);
    setShowAdminPanel(false);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1020] text-white">
        <p className="text-lg font-semibold text-lime-400">
          Loading website...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      <Navbar />

      {/* Admin Login Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={handleAdminButtonClick}
          className="rounded-full border border-lime-400 bg-slate-900 px-5 py-3 text-sm font-bold text-lime-400 shadow-xl transition hover:bg-lime-400 hover:text-slate-950"
        >
          {showAdminPanel ? "Close Admin" : "Admin Login"}
        </button>
      </div>

      {/* Admin Login / Dashboard */}
      {showAdminPanel && (
        <div
          ref={adminPanelRef}
          id="admin-panel"
          className="scroll-mt-4 border-b border-slate-700 bg-slate-950"
        >
          {adminAccessGranted && user ? (
            <div>
              {/* Logged-in Admin Header */}
              <div className="border-b border-slate-700 bg-slate-900 px-4 py-4">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Logged in as</p>

                    <p className="font-semibold text-white">{user.email}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Teacher Dashboard */}
              <TeacherDashboard />
            </div>
          ) : (
            // Login form will open first
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      )}

      {/* Public Website Sections */}
      <HeroSection />
      <AboutSection />
      <TeacherProfile />
      <WhyChooseUs />
      <ClassSubject />
      <QuestionPapers />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
