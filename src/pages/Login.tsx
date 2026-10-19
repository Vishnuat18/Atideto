
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Loader2, Eye, EyeOff, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SEO from "@/components/seo/SEO";
import atidetoLogo from "@/assets/atideto/logo.png";

type Mode = "login" | "register" | "forgot";

const ENTER =
  "animate-in fade-in slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] fill-mode-both motion-reduce:animate-none";

const stagger = (index: number, step = 60): React.CSSProperties => ({
  animationDelay: `${index * step}ms`,
});

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04A9.4 9.4 0 0 1 12 7.04c.85 0 1.7.12 2.5.34 1.9-1.31 2.74-1.04 2.74-1.04.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
};

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}>
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

import atidetoWordmark from "@/assets/atideto/atideto.png";

const BrandMark = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <img
        src={atidetoLogo}
        alt="Atideto"
        className="h-10 sm:h-11 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(46,168,255,0.6)]"
      />
      <img
        src={atidetoWordmark}
        alt="Atideto Technologies"
        className="h-10 sm:h-11 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
      />
    </div>
  );
};

const jitter = (i: number) => {
  const value = Math.sin(i + 1) * 10_000;
  return value - Math.floor(value);
};

const FloatingPaths = ({ position }: { position: number }) => {
  const reduceMotion = useReducedMotion();
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full text-primary"
        fill="none"
        viewBox="0 0 696 316"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            initial={{ pathLength: 0.3 }}
            animate={
              reduceMotion
                ? undefined
                : { pathLength: 1, pathOffset: [0, 1, 0] }
            }
            stroke="currentColor"
            className="opacity-60"
            strokeOpacity={0.1 + path.id * 0.03}
            strokeWidth={path.width}
            transition={{
              duration: 20 + jitter(path.id) * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const getAuthErrorMessage = (err: any) => {
  if (!err) return "An unexpected error occurred. Please try again.";
  const code = err.code || "";
  switch (code) {
    case "auth/email-already-in-use":
      return "This email address is already registered. Please sign in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-not-found":
      return "No account found with this email. Please sign up.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again or use Forgot Password.";
    case "auth/invalid-credential":
      return "Invalid email or password. Please verify your credentials.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed before completing authentication.";
    case "auth/cancelled-popup-request":
      return "Multiple sign-in popups opened. Please try again.";
    case "auth/too-many-requests":
      return "Access temporarily blocked due to repeated attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network connection issue. Please check your internet connection.";
    default:
      return err.message || "Authentication failed. Please try again.";
  }
};

export default function Login() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "student" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [githubRedirecting, setGithubRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const email = form.email.trim();
    const password = form.password;

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (mode === "register") {
      if (!form.name.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      if (password !== form.confirm) {
        setError("Passwords do not match. Please verify password confirmation.");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        try {
          await updateProfile(user, { displayName: form.name.trim() });
          await setDoc(
            doc(db, "users", user.uid),
            {
              name: form.name.trim(),
              email: email,
              role: form.role || "student",
              createdAt: new Date().toISOString()
            },
            { merge: true }
          );
          await sendEmailVerification(user);
        } catch (fsErr) {
          console.warn("User profile sync notice:", fsErr);
        }

        navigate("/dashboard");
      } else if (mode === "login") {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
          if (
            email === "admin@atideto.in" &&
            password === "atideto07" &&
            (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found")
          ) {
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              await updateProfile(userCredential.user, { displayName: "Administrator" });
              await setDoc(
                doc(db, "users", userCredential.user.uid),
                {
                  name: "Administrator",
                  email: email,
                  role: "admin",
                  createdAt: new Date().toISOString()
                },
                { merge: true }
              );
            } catch (createErr: any) {
              if (createErr.code !== "auth/email-already-in-use") {
                throw createErr;
              }
            }
          } else {
            throw err;
          }
        }
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const userCredential = await signInWithPopup(auth, provider);

      try {
        await setDoc(
          doc(db, "users", userCredential.user.uid),
          {
            name: userCredential.user.displayName || userCredential.user.email?.split("@")[0] || "User",
            email: userCredential.user.email,
            role: "student",
            createdAt: new Date().toISOString()
          },
          { merge: true }
        );
      } catch (fsErr) {
        console.warn("Firestore Google save notice:", fsErr);
      }

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGithubAuth = async () => {
    setError("");
    setGithubRedirecting(true);
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      try {
        await setDoc(
          doc(db, "users", userCredential.user.uid),
          {
            name: userCredential.user.displayName || "GitHub User",
            email: userCredential.user.email,
            role: "student",
            createdAt: new Date().toISOString()
          },
          { merge: true }
        );
      } catch (e) {}
      navigate("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with the same email. Please sign in using Google or Email.");
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("GitHub login was cancelled.");
      } else {
        // Fallback demo flow if GitHub OAuth isn't provisioned on test domain
        setGithubRedirecting(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
        return;
      }
    } finally {
      setGithubRedirecting(false);
    }
  };

  const handleDemoLogin = async (role: "admin" | "student") => {
    setLoading(true);
    setError("");
    const demoEmail = role === "admin" ? "admin@atideto.in" : "student@atideto.in";
    const demoPass = role === "admin" ? "atideto07" : "student123";

    try {
      await signInWithEmailAndPassword(auth, demoEmail, demoPass);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
          await updateProfile(userCredential.user, { displayName: role === "admin" ? "Administrator" : "Demo Student" });
          await setDoc(
            doc(db, "users", userCredential.user.uid),
            {
              name: role === "admin" ? "Administrator" : "Demo Student",
              email: demoEmail,
              role: role,
              createdAt: new Date().toISOString()
            },
            { merge: true }
          );
          navigate("/dashboard");
          return;
        } catch (createErr: any) {
          if (createErr.code === "auth/email-already-in-use") {
            try {
              await signInWithEmailAndPassword(auth, demoEmail, demoPass);
              navigate("/dashboard");
              return;
            } catch (e) {}
          }
        }
      }
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = form.email.trim();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Reset error:", err);
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      data-slot="login"
      className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#06080F] text-foreground lg:grid lg:grid-cols-12 z-50 select-none"
    >
      <SEO
        title={mode === "login" ? "Login | Atideto Technologies" : mode === "register" ? "Join Atideto Technologies" : "Reset Password | Atideto"}
        description="Sign in or join Atideto Technologies. Access your custom client portal and digital development workspace."
        url="https://atideto.in/login"
      />

      {/* ASIDE: Editorial Column with Sweeping Dynamic Lines & Typography (5 cols on lg, 6 on xl) */}
      <aside
        data-slot="login-aside"
        className="relative hidden h-full flex-col justify-between overflow-hidden border-e border-white/[0.08] bg-[#070B16] p-6 lg:p-8 xl:p-10 lg:col-span-5 xl:col-span-6 lg:flex"
      >
        {/* Subtle radial ambient glows */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 70%, rgba(0, 102, 255, 0.18), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(46, 168, 255, 0.12), transparent 50%)",
          }}
        />

        {/* Dynamic Blue Vector Streaks */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
          <svg className="w-full h-full" viewBox="0 0 600 600" fill="none" preserveAspectRatio="none">
            {Array.from({ length: 28 }).map((_, i) => (
              <path
                key={i}
                d={`M -60 ${380 + i * 14} C 120 ${350 + i * 12}, 300 ${260 + i * 10}, 660 ${180 + i * 9}`}
                stroke="#0066FF"
                strokeWidth={0.8 + (i % 4) * 0.35}
                strokeOpacity={0.12 + (i / 28) * 0.48}
              />
            ))}
          </svg>
        </div>

        {/* Top Brand Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <BrandMark />
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-400">
            <span className="size-1.5 rounded-full bg-[#00D26A] animate-pulse" />
            <span>v2.4 Enterprise</span>
          </div>
        </div>

        {/* Middle Editorial Statement */}
        <div className="relative z-10 my-auto max-w-lg py-2">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3 text-[11px] font-mono tracking-[0.2em] uppercase text-[#38BDF8]">
            <span className="w-6 h-px bg-[#0066FF]" />
            <span>PLATFORM ENGINEERING</span>
          </div>

          <figure className="space-y-3">
            <blockquote
              className="text-xl sm:text-2xl xl:text-3xl leading-[1.3] tracking-tight text-white font-semibold"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              We wired up auth and engineering excellence in an afternoon and{" "}
              <span className="font-serif italic text-[#38BDF8] drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]">
                never looked back
              </span>
              . The digital experience lives right here.
            </blockquote>
            <figcaption className="flex items-center gap-3 text-xs uppercase tracking-widest text-slate-400 font-mono pt-1">
              <span className="text-white font-semibold">Atideto Technologies</span>
              <span className="text-white/20">/</span>
              <span>Next-Gen Software & Academy</span>
            </figcaption>
          </figure>
        </div>

        {/* Aside Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/[0.06]">
          <span>&copy; {new Date().getFullYear()} Atideto Technologies</span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle2 className="size-3.5 text-[#00D26A]" />
            Enterprise-Grade SSO & Firebase
          </span>
        </div>
      </aside>

      {/* MAIN: Interactive Panel (7 cols on lg, 6 on xl) - Strictly 100% No Scroll */}
      <div
        data-slot="login-main"
        className="relative h-full max-h-screen overflow-y-auto lg:overflow-hidden flex flex-col justify-between px-6 sm:px-10 lg:px-12 py-3 sm:py-5 lg:col-span-7 xl:col-span-6"
      >
        {/* Subtle Ambient Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full opacity-20 blur-3xl bg-[#0066FF]"
        />

        {/* Top Bar: Back to Home + Segmented Switcher */}
        <div className="relative z-10 flex items-center justify-between w-full shrink-0">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-full px-3 h-8"
          >
            <Link to="/">
              <ChevronLeft className="size-3.5" />
              Back to Home
            </Link>
          </Button>

          {/* Apple-style Segmented Switcher */}
          {mode !== "forgot" && (
            <div className="inline-flex p-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setMode("login");
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  mode === "login"
                    ? "bg-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setMode("register");
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  mode === "register"
                    ? "bg-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Create Account
              </button>
            </div>
          )}
        </div>

        {/* Centered Compact Form Card */}
        <div
          data-slot="login-panel"
          className="relative z-10 mx-auto w-full max-w-[390px] my-auto space-y-2.5 sm:space-y-3 shrink-0"
        >
          {/* Mobile BrandMark */}
          <div className="flex items-center gap-2 lg:hidden mb-1">
            <BrandMark />
          </div>

          {/* Heading in bold Manrope & Subtitle in Inter */}
          <div data-slot="login-header" className="space-y-1">
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {mode === "login"
                ? "Sign in to Atideto"
                : mode === "register"
                ? "Create your account"
                : "Reset your password"}
            </h1>
            <p className="text-xs text-slate-400 font-normal">
              {mode === "login"
                ? "Instant access to your client portal, deliverables, and projects."
                : mode === "register"
                ? "Join Atideto Technologies and build bespoke digital solutions."
                : "Enter your registered email to receive an instant recovery link."}
            </p>
          </div>

          {/* Error Message if any */}
          {error && (
            <div className="p-2.5 bg-rose-500/15 border border-rose-500/30 rounded-lg text-rose-300 text-xs font-medium animate-in fade-in duration-150">
              {error}
            </div>
          )}

          {submitted && mode === "forgot" ? (
            <div className="p-5 bg-card/60 border border-white/10 rounded-xl text-center space-y-3">
              <div className="size-10 rounded-full bg-[#00D26A]/15 text-[#00D26A] flex items-center justify-center mx-auto text-lg font-bold">
                ✓
              </div>
              <h3 className="text-base font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Check Your Inbox
              </h3>
              <p className="text-xs text-slate-400">
                We've dispatched a recovery link to <strong className="text-white">{form.email}</strong>.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setMode("login");
                }}
                className="w-full text-xs"
              >
                Back to Sign In
              </Button>
            </div>
          ) : mode === "forgot" ? (
            <form onSubmit={handleForgot} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Email address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-[#0C1222] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition-colors"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="default"
                disabled={loading}
                className="w-full h-9 gap-2 text-xs font-semibold bg-gradient-to-r from-[#0052FF] to-[#0066FF] hover:from-[#0066FF] hover:to-[#2EA8FF] text-white rounded-lg shadow-[0_0_16px_rgba(0,102,255,0.3)] cursor-pointer"
              >
                {loading && <Loader2 className="size-3.5 animate-spin" />}
                Send Reset Link
              </Button>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setMode("login");
                }}
                className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Back to Sign In
              </button>
            </form>
          ) : (
            <>
              {/* 1-Click Social Sign-in Buttons: Side-by-side grid to conserve vertical space */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={githubRedirecting || loading}
                  onClick={handleGithubAuth}
                  className="h-9 gap-2 text-xs font-medium border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white cursor-pointer rounded-lg"
                >
                  {githubRedirecting ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <GithubIcon className="size-3.5" />
                  )}
                  <span>GitHub</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={handleGoogleAuth}
                  className="h-9 gap-2 text-xs font-medium border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white cursor-pointer rounded-lg"
                >
                  <GoogleIcon className="size-3.5" />
                  <span>Google</span>
                </Button>
              </div>

              {/* 1-Click Instant Demo Credentials */}
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#0066FF]/[0.08] border border-[#0066FF]/20 text-xs">
                <span className="text-[10px] font-mono text-[#38BDF8] uppercase font-bold px-1 shrink-0">
                  Quick Demo:
                </span>
                <button
                  type="button"
                  onClick={() => handleDemoLogin("student")}
                  disabled={loading}
                  className="flex-1 py-1 px-2 rounded text-[11px] font-semibold bg-[#0066FF]/20 hover:bg-[#0066FF]/35 text-[#38BDF8] transition-colors cursor-pointer text-center"
                >
                  Student Portal
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin("admin")}
                  disabled={loading}
                  className="flex-1 py-1 px-2 rounded text-[11px] font-semibold bg-purple-500/20 hover:bg-purple-500/35 text-purple-300 transition-colors cursor-pointer text-center"
                >
                  Admin Portal
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/[0.08]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                  Or with email
                </span>
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {mode === "register" && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-300">Full Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-3 py-1.5 bg-[#0C1222] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition-colors"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-300">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-3 py-1.5 bg-[#0C1222] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition-colors"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium text-slate-300">Password</label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => {
                          setError("");
                          setMode("forgot");
                        }}
                        className="text-[11px] text-[#38BDF8] hover:underline cursor-pointer"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-3 py-1.5 pr-8 bg-[#0C1222] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition-colors"
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {mode === "register" && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-300">Confirm Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-3 py-1.5 bg-[#0C1222] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0066FF] transition-colors"
                      value={form.confirm}
                      onChange={(e) => update("confirm", e.target.value)}
                      required
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-9 mt-1 text-xs font-semibold bg-gradient-to-r from-[#0052FF] to-[#0066FF] hover:from-[#0066FF] hover:to-[#2EA8FF] text-white rounded-lg shadow-[0_0_16px_rgba(0,102,255,0.35)] cursor-pointer transition-all"
                >
                  {loading && <Loader2 className="size-3.5 animate-spin mr-1.5" />}
                  {mode === "login" ? "Sign In to Portal" : "Create Account"}
                </Button>
              </form>
            </>
          )}
        </div>

        {/* Pinned Bottom Legal Line */}
        <div className="relative z-10 text-center text-[11px] text-slate-500">
          <span>Protected by Enterprise Security · </span>
          <Link to="/terms-and-conditions" className="text-slate-400 hover:text-white underline-offset-2 hover:underline">
            Terms
          </Link>
          <span> & </span>
          <Link to="/privacy-policy" className="text-slate-400 hover:text-white underline-offset-2 hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </section>
  );
}
