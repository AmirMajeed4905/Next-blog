import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, categoryColors } from "@/lib/utils";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const categories = ["Next.js", "TypeScript", "Backend", "Database", "CSS", "Security", "React", "DevOps"];

  return (
    <main className="min-h-screen bg-[#0f0f1a]">
      {/* Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-10 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-700/40 rounded-full px-4 py-1.5 text-purple-300 text-sm mb-6">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            All Posts
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
              Blog
            </span>
          </h1>
          <p className="text-slate-400 text-lg">{posts.length} posts available</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          <Link
            href="/blog"
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              !category
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white/5 text-slate-400 border-purple-900/30 hover:border-purple-600/50 hover:text-white"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${cat}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                category === cat
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white/5 text-slate-400 border-purple-900/30 hover:border-purple-600/50 hover:text-white"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-white text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-slate-400">Try a different category or check back later.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white/[0.03] border border-purple-900/30 hover:border-purple-600/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${categoryColors[post.category] ?? categoryColors["General"]}`}>
                      {post.category}
                    </span>
                    <span className="text-slate-500 text-xs">{formatDate(post.createdAt)}</span>
                  </div>
                  <h2 className="text-white font-semibold text-lg mb-3 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 pt-4 border-t border-purple-900/20">
                    <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {post.author?.name?.[0]?.toUpperCase() ?? "A"}
                    </div>
                    <span className="text-slate-300 text-xs font-medium">{post.author?.name ?? "Anonymous"}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}