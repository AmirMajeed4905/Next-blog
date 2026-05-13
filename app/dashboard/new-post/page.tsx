"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/RichEditor"), { ssr: false });

const postSchema = z.object({
  title: z.string().min(5, "Title at least 5 characters"),
  excerpt: z.string().min(10, "Excerpt at least 10 characters").max(300, "Max 300 characters"),
  content: z.string().min(50, "Content at least 50 characters"),
  category: z.string().min(1, "Select a category"),
  published: z.boolean(),
});

type PostInput = z.infer<typeof postSchema>;

const categories = ["Next.js", "TypeScript", "Backend", "Database", "CSS", "Security", "React", "DevOps", "General"];

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: { published: false, category: "General", content: "" },
  });

  async function onSubmit(data: PostInput) {
    setLoading(true);
    setError("");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setLoading(false);
    if (!res.ok) { setError(result.error ?? "Something went wrong"); return; }
    router.push("/dashboard");
    router.refresh();
  }

  const isPublished = watch("published");
  const selectedCategory = watch("category");

  return (
    <main className="min-h-screen bg-[#0f0f1a] py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Create New Post</h1>
              <p className="text-slate-400 text-sm">Write and publish your article</p>
            </div>
          </div>

          {/* Publish status badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${isPublished ? "bg-green-900/30 text-green-400 border-green-800/30" : "bg-amber-900/30 text-amber-400 border-amber-800/30"}`}>
            {isPublished ? "● Will publish" : "● Draft"}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm p-4 rounded-xl mb-6 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Title */}
          <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6">
            <label className="block text-sm font-medium text-white mb-2">Post Title *</label>
            <input
              {...register("title")}
              placeholder="Write an engaging title..."
              className={`w-full bg-white/5 border ${errors.title ? "border-red-500" : "border-purple-900/40"} text-white placeholder-slate-500 rounded-xl px-4 py-3 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Excerpt + Category row */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-white">Excerpt *</label>
                <span className="text-slate-500 text-xs">{watch("excerpt", "").length}/300</span>
              </div>
              <textarea
                {...register("excerpt")}
                rows={4}
                placeholder="Brief description of your post..."
                className={`w-full bg-white/5 border ${errors.excerpt ? "border-red-500" : "border-purple-900/40"} text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none text-sm`}
              />
              {errors.excerpt && <p className="text-red-400 text-xs mt-1">{errors.excerpt.message}</p>}
            </div>

            <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6">
              <label className="block text-sm font-medium text-white mb-3">Category *</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <label key={cat} className="cursor-pointer">
                    <input {...register("category")} type="radio" value={cat} className="sr-only" />
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border transition-all ${selectedCategory === cat ? "bg-purple-600 text-white border-purple-600" : "bg-white/5 text-slate-400 border-purple-900/30 hover:border-purple-600/50 hover:text-white"}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
              {errors.category && <p className="text-red-400 text-xs mt-2">{errors.category.message}</p>}
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6">
            <label className="block text-sm font-medium text-white mb-3">
              Content *
              <span className="ml-2 text-xs text-purple-400 font-normal">Markdown supported</span>
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichEditor
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.content}
                />
              )}
            />
            {errors.content && <p className="text-red-400 text-xs mt-2">{errors.content.message}</p>}
          </div>

          {/* Bottom bar */}
          <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input {...register("published")} type="checkbox" className="sr-only" />
                <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${isPublished ? "bg-purple-600" : "bg-slate-700"}`} />
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${isPublished ? "translate-x-6" : "translate-x-0"}`} />
              </div>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">
                  {isPublished ? "Publish immediately" : "Save as draft"}
                </p>
                <p className="text-slate-500 text-xs">
                  {isPublished ? "Visible to everyone" : "Only visible to you"}
                </p>
              </div>
            </label>

            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="px-5 py-2.5 rounded-xl border border-purple-900/40 text-slate-400 hover:text-white hover:border-purple-600/50 text-sm font-medium transition-all"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:opacity-50 text-white font-semibold px-8 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-900/30"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {isPublished ? "Publish Post" : "Save Draft"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}