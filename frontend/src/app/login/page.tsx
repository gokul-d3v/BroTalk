"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) return;
    
    // Pseudo-authentication: generate a fake client_id and store it
    const clientId = btoa(`${email}:${password}`);
    localStorage.setItem("brotalk_client_id", clientId);
    
    // Redirect to the feed
    router.push("/");
  };

  return (
    <>
      {/* Technical Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0 pointer-events-none"></div>

      {/* Large Decorative Arc */}
      <div className="absolute w-[120vh] h-[120vh] border-[0.5px] border-primary/20 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        {/* Ticks on the arc */}
        <div className="absolute top-0 left-1/2 w-[1px] h-4 bg-primary/40 -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-[1px] h-4 bg-primary/40 -translate-x-1/2"></div>
        <div className="absolute left-0 top-1/2 h-[1px] w-4 bg-primary/40 -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 h-[1px] w-4 bg-primary/40 -translate-y-1/2"></div>
      </div>

      {/* Main Content Container */}
      <main className="w-full max-w-[480px] px-6 relative z-10 flex flex-col items-center mt-32">
        {/* Brand Header */}
        <div className="mb-16 text-center">
          <h1 className="font-display-lg text-primary tracking-widest uppercase" style={{ fontWeight: 300 }}>
            Brotalk
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2 opacity-60">
            <div className="h-[1px] w-12 bg-on-surface-variant"></div>
            <span className="font-label-caps text-on-surface-variant">SECURE LOGIN</span>
            <div className="h-[1px] w-12 bg-on-surface-variant"></div>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full bg-surface border-[0.5px] border-outline-variant p-10 relative">
          {/* Technical Corner Markers */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary -translate-x-px -translate-y-px"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary translate-x-px -translate-y-px"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary -translate-x-px translate-y-px"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary translate-x-px translate-y-px"></div>

          <form className="flex flex-col gap-8" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {/* Email Input */}
            <div className="relative group">
              <label className="block font-label-mono text-on-surface-variant mb-2" htmlFor="email">
                IDENTIFIER / EMAIL
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 text-body-base text-on-surface transition-colors rounded-none outline-none"
                id="email"
                placeholder="Enter your email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="flex justify-between items-baseline mb-2">
                <label className="block font-label-mono text-on-surface-variant" htmlFor="password">
                  ACCESS KEY / PASSWORD
                </label>
              </div>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 text-body-base text-on-surface transition-colors rounded-none outline-none"
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right mt-3">
                <a
                  className="font-label-caps text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1 group-hover:text-primary/70"
                  href="#"
                >
                  RECOVER KEY
                  <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                </a>
              </div>
            </div>

            {/* Primary Action */}
            <button
              className="w-full bg-primary text-on-primary py-4 mt-4 font-label-caps tracking-widest uppercase hover:bg-primary-container transition-colors flex items-center justify-center gap-3 group rounded-none cursor-pointer"
              type="submit"
            >
              INITIATE SESSION
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                login
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-outline-variant"></div>
            <span className="font-label-mono text-outline">EXTERNAL AUTH</span>
            <div className="h-[1px] flex-1 bg-outline-variant"></div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3">
            <button
              className="w-full border border-outline text-on-surface py-3 font-label-caps hover:bg-surface-container-low transition-colors flex items-center justify-center gap-3 rounded-none cursor-pointer"
              type="button"
              onClick={handleLogin}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              CONTINUE WITH GOOGLE
            </button>
            <button
              className="w-full border border-outline text-on-surface py-3 font-label-caps hover:bg-surface-container-low transition-colors flex items-center justify-center gap-3 rounded-none cursor-pointer"
              type="button"
              onClick={handleLogin}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.24-.86 3.46-.86 1.14 0 2.22.42 2.96 1.12-2.58 1.48-2.14 4.54.4 5.54-1.12 3.12-3.19 6.55-5.9 6.37zm-2.91-14.7c-.16-1.52.88-2.96 2.24-3.41.34 1.62-.97 3.08-2.24 3.41z"></path>
              </svg>
              CONTINUE WITH APPLE
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center">
          <span className="font-label-mono text-on-surface-variant">NEW OPERATIVE?</span>
          <a
            className="font-label-caps text-primary ml-2 hover:underline underline-offset-4 decoration-[0.5px]"
            href="#"
          >
            REQUEST CLEARANCE
          </a>
        </div>
      </main>
    </>
  );
}
