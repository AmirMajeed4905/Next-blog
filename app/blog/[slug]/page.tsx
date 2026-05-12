import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true, image: true } } },
  });

  if (!post || !post.published) notFound();

  const related = await prisma.post.findMany({
    where: {
      published: true,
      category: post.category,
      NOT: { id: post.id },
    },
    take: 3,
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#0f0f1a]">
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden border-b border-purple-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 text-sm mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-700/30">
              {post.category}
            </span>
            <span className="text-slate-500 text-sm">{formatDate(post.createdAt)}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-slate-400 text-lg leading-relaxed mb-8">{post.excerpt}</p>
          )}

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center text-white font-bold">
              {post.author?.name?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{post.author?.name}</p>
              <p className="text-slate-500 text-xs">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-purple max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 px-4 border-t border-purple-900/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group bg-white/[0.03] border border-purple-900/30 hover:border-purple-600/50 rounded-2xl p-6 transition-all hover:-translate-y-1"
                >
                  <span className="text-xs text-purple-400 font-medium">{r.category}</span>
                  <h3 className="text-white font-semibold mt-2 mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">{r.excerpt}</p>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-purple-900/20">
                    <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {r.author?.name?.[0]?.toUpperCase() ?? "A"}
                    </div>
                    <span className="text-slate-400 text-xs">{r.author?.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}