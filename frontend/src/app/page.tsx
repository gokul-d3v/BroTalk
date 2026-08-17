"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("brotalk_client_id");
    if (!storedId) {
      router.push("/login");
    } else {
      setClientId(storedId);
    }
  }, [router]);

  if (!clientId) {
    return null; // or a loading spinner
  }

  return (
    <main className="w-full max-w-4xl px-6 py-12 relative z-10 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display-lg text-primary tracking-widest uppercase text-4xl">
          Feed
        </h1>
        <button 
          onClick={() => {
            localStorage.removeItem("brotalk_client_id");
            router.push("/login");
          }}
          className="border border-outline px-4 py-2 font-label-caps hover:bg-surface-container-low transition-colors"
        >
          TERMINATE SESSION
        </button>
      </div>
      
      <div className="bg-surface border-[0.5px] border-outline-variant p-6 text-on-surface">
        <p className="font-body-base">Welcome, Operative.</p>
        <p className="font-label-mono text-on-surface-variant mt-2">Client ID: {clientId}</p>
        
        {/* Placeholder for the feed components we will build next */}
        <div className="mt-8 border border-dashed border-outline p-12 text-center text-outline">
          Reddit Clone Feed Component Placeholder
        </div>
      </div>
    </main>
  );
}
