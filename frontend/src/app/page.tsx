"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CreatePostModal from "@/components/CreatePostModal";

export default function Home() {
  const router = useRouter();
  const [clientId, setClientId] = useState<string | null>(null);
  
  // Feed State
  const [posts, setPosts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // WebSocket Reference
  const ws = useRef<WebSocket | null>(null);

  // Auth Guard
  useEffect(() => {
    const storedId = localStorage.getItem("brotalk_client_id");
    if (!storedId) {
      router.push("/login");
    } else {
      setClientId(storedId);
    }
  }, [router]);

  // Fetch initial posts and setup WebSocket
  useEffect(() => {
    if (!clientId) return;

    // 1. Fetch existing posts
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8080/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    // 2. Setup WebSocket for real-time updates
    const connectWebSocket = () => {
      ws.current = new WebSocket("ws://127.0.0.1:8080/ws");
      
      ws.current.onopen = () => {
        console.log("Connected to Brotalk WebSocket");
      };

      ws.current.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          
          if (msg.type === "NEW_POST") {
            // Add new post to the top of the feed
            setPosts((prevPosts) => [msg.data, ...prevPosts]);
          }
          // TODO: handle NEW_VOTE, NEW_COMMENT
        } catch (e) {
          console.error("Failed to parse websocket message", e);
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket disconnected. Reconnecting in 3s...");
        setTimeout(connectWebSocket, 3000);
      };
    };

    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [clientId]);

  if (!clientId) {
    return null; // or a loading spinner
  }

  const handleLogout = () => {
    localStorage.removeItem("brotalk_client_id");
    router.push("/login");
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <>
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Top Navigation (Mobile Only) */}
      <nav className="md:hidden flex justify-between items-center px-margin-mobile h-16 w-full fixed top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-sm border-b border-outline/30">
        <div className="flex items-center gap-2">
          <span className="font-display-lg text-headline-lg-mobile tracking-tighter text-primary">Brotalk</span>
        </div>
        <div className="flex items-center gap-4 text-primary font-label-caps text-label-caps">
          <button className="hover:text-primary transition-colors duration-200 active:scale-95 transition-transform cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="hover:text-primary transition-colors duration-200 active:scale-95 transition-transform cursor-pointer">
            <span className="material-symbols-outlined">mail</span>
          </button>
          <img
            alt="User profile"
            className="w-8 h-8 rounded-full border border-outline/30 object-cover cursor-pointer"
            onClick={handleLogout}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoJbk3cmFbHYFJJzmfpqPqyIcNGeR21IEpVSawRFcYgaEfma6DeErkeqhFkcrHxjANxKb_YOz0-IarR0A27XnTRNpiRKbJyleC1HLkW--_e3b6zp2xrBAGxHW4ATC5kfAe-RgNByVgXPbLictMiEz29UB7BJoru_cnxRrLOkXai_1pxVIKwY4V-PUdluFLGLDkrJFKrBLDVZhGpeR6v7dboeBT8_UcWCEbF_4xgJkXrmPLEAbF_zXp"
          />
        </div>
      </nav>

      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex flex-col pt-24 pb-8 bg-surface-container-low/90 dark:bg-surface-container-highest/90 backdrop-blur-lg fixed left-0 top-0 h-full w-64 z-40 border-r border-outline/20">
        <div className="px-6 mb-12">
          <h1 className="font-headline-lg text-primary tracking-tighter">Brotalk</h1>
          <p className="font-label-mono text-label-mono text-on-surface-variant mt-1">Technical Forum</p>
        </div>
        <nav className="flex-1 px-2 space-y-2 font-label-mono text-label-mono">
          <a className="flex items-center gap-3 py-3 rounded text-primary font-bold border-l-2 border-primary pl-4 bg-tertiary-fixed/10" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            Home
          </a>
          <a className="flex items-center gap-3 py-3 rounded text-on-surface-variant pl-4 hover:bg-tertiary-fixed/20 transition-all active:translate-x-1" href="#">
            <span className="material-symbols-outlined">trending_up</span>
            Popular
          </a>
          <a className="flex items-center gap-3 py-3 rounded text-on-surface-variant pl-4 hover:bg-tertiary-fixed/20 transition-all active:translate-x-1" href="#">
            <span className="material-symbols-outlined">language</span>
            All
          </a>
          <a className="flex items-center gap-3 py-3 rounded text-on-surface-variant pl-4 hover:bg-tertiary-fixed/20 transition-all active:translate-x-1" href="#">
            <span className="material-symbols-outlined">bookmark</span>
            Saved
          </a>
        </nav>
        <div className="px-6 mt-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 bg-primary text-on-primary font-label-caps text-label-caps hover:bg-primary-container transition-colors duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create Post
          </button>
        </div>
        <div className="mt-8 px-2 space-y-2 font-label-mono text-label-mono border-t border-outline/20 pt-4 mx-4">
          <a className="flex items-center gap-3 py-2 rounded text-on-surface-variant pl-2 hover:bg-tertiary-fixed/20 transition-all" href="#">
            <span className="material-symbols-outlined text-sm">settings</span>
            Settings
          </a>
          <a 
            className="flex items-center gap-3 py-2 rounded text-error pl-2 hover:bg-error-container/20 transition-all cursor-pointer" 
            onClick={handleLogout}
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Terminate Session
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="md:ml-64 flex-1 w-full min-h-screen">
        <main className="pt-20 md:pt-12 px-4 md:px-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32 relative z-10">
          
          {/* Central Feed */}
          <div className="lg:col-span-8">
            <header className="mb-8 flex items-end justify-between border-b border-outline/30 pb-4">
              <div>
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-on-surface tracking-tight">Technical Feed</h2>
                <p className="font-label-mono text-label-mono text-on-surface-variant mt-2 flex items-center gap-2">
                  <span className="instrumentation-dot"></span> Live Updates
                </p>
              </div>
              <div className="flex gap-4">
                <button className="font-label-caps text-label-caps text-primary border-b border-primary pb-1 cursor-pointer">LATEST</button>
                <button className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors pb-1 cursor-pointer">TOP</button>
              </div>
            </header>

            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12 text-on-surface-variant font-label-mono">
                  INITIALIZING FEED...
                </div>
              ) : posts.length === 0 ? (
                <div className="glass-panel rounded-xl p-12 text-center text-on-surface-variant flex flex-col items-center justify-center border-dashed border-2 border-outline/30">
                  <span className="material-symbols-outlined text-4xl mb-4 opacity-50">post_add</span>
                  <p className="font-label-mono text-label-mono">No posts available yet. Create one to get started!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <article key={post.id} className="glass-panel rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border border-outline/30">
                        <span className="material-symbols-outlined text-on-surface-variant">person</span>
                      </div>
                      <div>
                        <p className="font-label-mono text-label-mono text-on-surface font-medium">Anonymous Operative</p>
                        <p className="font-label-mono text-label-mono text-on-surface-variant opacity-80">{formatDate(post.created_at)}</p>
                      </div>
                    </div>
                    
                    <h3 className="font-headline-lg-mobile md:font-headline-sm text-on-surface mb-3 group-hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    
                    {post.content && (
                      <p className="font-body-base text-body-base text-on-surface-variant mb-6 whitespace-pre-wrap line-clamp-4">
                        {post.content}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-outline/20">
                      <div className="flex gap-6 font-label-mono text-label-mono text-on-surface-variant">
                        <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-lg">thumb_up</span> {post.upvotes - post.downvotes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                          <span className="material-symbols-outlined text-lg">chat_bubble</span> 0
                        </button>
                      </div>
                      <button className="flex items-center gap-1 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-lg">bookmark_add</span> SAVE
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar (Widgets) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-xl p-6">
              <h4 className="font-label-caps text-label-caps text-on-surface border-b border-outline/30 pb-2 mb-4 flex items-center justify-between">
                COMMUNITY DISCOVERY
                <span className="material-symbols-outlined text-sm">explore</span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-on-surface group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="font-label-mono text-label-mono font-bold">#</span>
                  </div>
                  <div>
                    <p className="font-label-mono text-label-mono text-on-surface font-medium group-hover:text-primary transition-colors">Global</p>
                    <p className="font-label-mono text-[10px] text-on-surface-variant">Default Channel</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </main>
      </div>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-low/90 backdrop-blur-lg border-t border-outline/20 pb-safe">
        <div className="flex justify-around items-center h-16">
          <a className="flex flex-col items-center gap-1 text-primary" href="#">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="font-label-caps text-[9px]">HOME</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined">trending_up</span>
            <span className="font-label-caps text-[9px]">POPULAR</span>
          </a>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center -mt-6 shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined">bookmark</span>
            <span className="font-label-caps text-[9px]">SAVED</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-caps text-[9px]">PROFILE</span>
          </a>
        </div>
      </nav>
    </>
  );
}
