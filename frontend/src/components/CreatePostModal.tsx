"use client";

import { useState } from "react";
import axios from "axios";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post("http://127.0.0.1:8080/posts", {
        title: title.trim(),
        content: content.trim(),
      });

      // Clear and close on success
      setTitle("");
      setContent("");
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative glass-panel rounded-xl w-full max-w-lg p-8 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b border-outline/30 pb-4">
          <h2 className="font-headline-lg-mobile text-on-surface">Create Post</h2>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-error transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 font-label-mono text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-label-caps text-on-surface-variant">
              POST TITLE *
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-base text-on-surface outline-none transition-colors"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-label-caps text-on-surface-variant">
              CONTENT (OPTIONAL)
            </label>
            <textarea
              id="content"
              rows={5}
              placeholder="Add more details, links, or context..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-surface border border-outline/30 focus:border-primary focus:ring-0 p-3 font-body-base text-on-surface outline-none transition-colors rounded resize-none"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-outline hover:bg-surface-container-low text-on-surface font-label-caps transition-colors cursor-pointer"
              disabled={isSubmitting}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="px-6 py-2 bg-primary text-on-primary font-label-caps hover:bg-primary-container disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? "TRANSMITTING..." : "PUBLISH POST"}
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
