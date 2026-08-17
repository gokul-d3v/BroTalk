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
      {/* Main Content Container */}
      <main className="w-full max-w-[480px] mx-auto px-6 relative z-10 flex flex-col items-center justify-center flex-1 py-12 md:py-0 min-h-screen">
        {/* Brand Header */}
        <div className="mb-16 text-center">
          <h1 className="font-headline-lg md:font-display-lg text-primary tracking-widest uppercase" style={{ fontWeight: 300 }}>
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
            {/* Username / Identifier Input */}
            <div className="relative group">
              <label className="block font-label-mono text-on-surface-variant mb-2" htmlFor="username">
                OPERATIVE ALIAS / USERNAME
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 text-body-base text-on-surface transition-colors rounded-none outline-none"
                id="username"
                placeholder="Enter an alias"
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
