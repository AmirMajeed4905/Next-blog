import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, categoryColors } from "@/lib/utils";

const categories = [
  { name: "Next.js", icon: "⚡", color: "from-blue-600/20 to-blue-700/10 border-blue-700/30 hover:border-blue-500/50" },
  { name: "TypeScript", icon: "🔷", color: "from-cyan-600/20 to-cyan-700/10 border-cyan-700/30 hover:border-cyan-500/50" },
  { name: "Backend", icon: "🛠️", color: "from-green-600/20 to-green-700/10 border-green-700/30 hover:border-green-500/50" },
  { name: "Database", icon: "🗄️", color: "from-orange-600/20 to-orange-700/10 border-orange-700/30 hover:border-orange-500/50" },
  { name: "CSS", icon: "🎨", color: "from-pink-600/20 to-pink-700/10 border-pink-700/30 hover:border-pink-500/50" },
  { name: "Security", icon: "🔐", color: "from-purple-600/20 to-purple-700/10 border-purple-700/30 hover:border-purple-500/50" },
];

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const totalPosts = await prisma.post.count({ where: { published: true } });

  const mainPost = posts[0] ?? null;
  const sidePosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-[#0f0f1a]">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-violet-900/10" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-700/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/50 rounded-full px-4 py-1.5 text-purple-300 text-sm font-medium mb-8">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            New posts every week
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Ideas Worth{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-purple-300">
              Reading
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Explore in-depth articles on web development, programming, and modern
            tech. Written for developers who want to level up.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-purple-900/40 hover:-translate-y-0.5"
            >
              Explore Blog
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-purple-800/50 hover:border-purple-600/60 text-slate-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
            >
              Start Writing
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-14 pt-10 border-t border-purple-900/30">
            {[
              { value: `${totalPosts}+`, label: "Articles" },
              { value: "1K+", label: "Readers" },
              { value: `${categories.length}+`, label: "Topics" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-500 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED POSTS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-purple-400 text-sm font-medium mb-1 uppercase tracking-widest">Featured</p>
              <h2 className="text-3xl font-bold text-white">Latest Posts</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-purple-400 text-sm font-medium transition-colors">
              View all posts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] border border-purple-900/30 rounded-2xl">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-white font-semibold text-xl mb-2">No posts yet</h3>
              <p className="text-slate-400 mb-6">Be the first to write something amazing.</p>
              <Link href="/register" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all">
                Start Writing
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Main post */}
              {mainPost && (
                <Link
                  href={`/blog/${mainPost.slug}`}
                  className="group lg:col-span-3 bg-white/[0.03] border border-purple-900/30 hover:border-purple-600/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] flex flex-col"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${categoryColors[mainPost.category] ?? categoryColors["General"]}`}>
                      {mainPost.category}
                    </span>
                    <span className="text-slate-500 text-xs">5 min read</span>
                  </div>
                  <h2 className="text-white text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors leading-snug">
                    {mainPost.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">
                    {mainPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-5 border-t border-purple-900/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {mainPost.author?.name?.[0]?.toUpperCase() ?? "A"}
                      </div>
                      <div>
                        <p className="text-slate-300 text-xs font-medium">{mainPost.author?.name}</p>
                        <p className="text-slate-500 text-xs">{formatDate(mainPost.createdAt)}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-purple-400 text-sm font-medium">
                      Read more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )}

              {/* Side posts */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {sidePosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white/[0.03] border border-purple-900/30 hover:border-purple-600/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] flex flex-col flex-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full border ${categoryColors[post.category] ?? categoryColors["General"]}`}>
                        {post.category}
                      </span>
                      <span className="text-slate-500 text-xs">{formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 pt-4 border-t border-purple-900/20">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.author?.name?.[0]?.toUpperCase() ?? "A"}
                      </div>
                      <span className="text-slate-400 text-xs">{post.author?.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-4 bg-[#0a0a14]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-purple-400 text-sm font-medium mb-2 uppercase tracking-widest">Browse</p>
            <h2 className="text-3xl font-bold text-white mb-3">Explore by Category</h2>
            <p className="text-slate-400 max-w-md mx-auto">Find articles on the topics you care about most.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/blog?category=${cat.name}`}
                className={`group bg-gradient-to-br ${cat.color} border rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/40 to-violet-900/30 border border-purple-700/40 rounded-3xl p-10 sm:p-14 text-center">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-600/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-700/50 rounded-full px-4 py-1.5 text-purple-300 text-sm mb-6">
                ✍️ Start Writing Today
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Share Your Knowledge{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
                  With the World
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join our community of writers and developers. Create your account and publish your first post today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-purple-900/40 hover:-translate-y-0.5">
                  Create Free Account
                </Link>
                <Link href="/blog" className="w-full sm:w-auto text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-xl border border-purple-800/50 hover:border-purple-600/60 bg-white/5 hover:bg-white/10 transition-all hover:-translate-y-0.5">
                  Browse Posts First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}