"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: { published: false, category: "General" },
  });

  const contentValue = watch("content", "");
  const excerptValue = watch("excerpt", "");

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

    if (!res.ok) {
      setError(result.error ?? "Something went wrong");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0f0f1a] py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">New Post</h1>
            <p className="text-slate-400 text-sm">Write and publish your article</p>
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Title */}
          <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6">
            <label className="block text-sm font-medium text-white mb-2">Post Title *</label>
            <input
              {...register("title")}
              placeholder="Write an engaging title..."
              className={`w-full bg-white/5 border ${errors.title ? "border-red-500" : "border-purple-900/40"} text-white placeholder-slate-500 rounded-xl px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition`}
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          {/* Excerpt */}
          <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white">Excerpt *</label>
              <span className="text-slate-500 text-xs">{excerptValue.length}/300</span>
            </div>
            <textarea
              {...register("excerpt")}
              rows={3}
              placeholder="Brief summary of your post..."
              className={`w-full bg-white/5 border ${errors.excerpt ? "border-red-500" : "border-purple-900/40"} text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none`}
            />
            {errors.excerpt && <p className="text-red-400 text-xs mt-1">{errors.excerpt.message}</p>}
          </div>

          {/* Category */}
          <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6">
            <label className="block text-sm font-medium text-white mb-3">Category *</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <label key={cat} className="cursor-pointer">
                  <input {...register("category")} type="radio" value={cat} className="sr-only" />
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    // eslint-disable-next-line react-hooks/incompatible-library
                    watch("category") === cat
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white/5 text-slate-400 border-purple-900/30 hover:border-purple-600/50 hover:text-white"
                  }`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
            {errors.category && <p className="text-red-400 text-xs mt-2">{errors.category.message}</p>}
          </div>

          {/* Content */}
          <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white">Content *</label>
              <span className="text-slate-500 text-xs">{contentValue.length} characters</span>
            </div>
            <textarea
              {...register("content")}
              rows={16}
              placeholder="Write your post content here..."
              className={`w-full bg-white/5 border ${errors.content ? "border-red-500" : "border-purple-900/40"} text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none font-mono text-sm leading-relaxed`}
            />
            {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>}
          </div>

          {/* Publish toggle + Submit */}
          <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input {...register("published")} type="checkbox" className="sr-only" />
                <div className={`w-11 h-6 rounded-full transition-colors ${watch("published") ? "bg-purple-600" : "bg-slate-700"}`} />
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${watch("published") ? "translate-x-5" : "translate-x-0"}`} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  {watch("published") ? "Publish immediately" : "Save as draft"}
                </p>
                <p className="text-slate-400 text-xs">
                  {watch("published") ? "Post will be visible to everyone" : "Only you can see this"}
                </p>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-purple-900/30"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {watch("published") ? "Publish Post" : "Save Draft"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}