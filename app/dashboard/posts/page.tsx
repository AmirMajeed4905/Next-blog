import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function AllPostsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const posts = await prisma.post.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;

  return (
    <main className="min-h-screen bg-[#0f0f1a] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">All Posts</h1>
              <p className="text-slate-400 text-sm">{posts.length} total posts</p>
            </div>
          </div>
          <Link
            href="/dashboard/new-post"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-900/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: posts.length, color: "text-purple-400", bg: "bg-purple-900/20 border-purple-800/30" },
            { label: "Published", value: published, color: "text-green-400", bg: "bg-green-900/20 border-green-800/30" },
            { label: "Drafts", value: drafts, color: "text-amber-400", bg: "bg-amber-900/20 border-amber-800/30" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} border rounded-2xl p-5 text-center`}>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Posts Table */}
        <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl overflow-hidden">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-white font-semibold text-lg mb-2">No posts yet</h3>
              <p className="text-slate-400 text-sm mb-6">Start writing your first post.</p>
              <Link
                href="/dashboard/new-post"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Write First Post
              </Link>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-purple-900/30 bg-white/[0.02]">
                <div className="col-span-5 text-xs font-medium text-slate-400 uppercase tracking-wider">Title</div>
                <div className="col-span-2 text-xs font-medium text-slate-400 uppercase tracking-wider">Category</div>
                <div className="col-span-2 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</div>
                <div className="col-span-2 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</div>
                <div className="col-span-1 text-xs font-medium text-slate-400 uppercase tracking-wider">Action</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-purple-900/20">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors items-center"
                  >
                    {/* Title */}
                    <div className="col-span-5 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{post.title}</p>
                      <p className="text-slate-500 text-xs truncate mt-0.5">/blog/{post.slug}</p>
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                      <span className="text-xs text-purple-300 bg-purple-900/30 border border-purple-800/30 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${
                        post.published
                          ? "bg-green-900/30 text-green-400 border-green-800/30"
                          : "bg-amber-900/30 text-amber-400 border-amber-800/30"
                      }`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2">
                      <p className="text-slate-400 text-xs">{formatDate(post.createdAt)}</p>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center gap-2">
                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-slate-400 hover:text-purple-400 p-1.5 rounded-lg hover:bg-white/5 transition-all"
                          title="View post"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      )}
                      <Link
                        href={`/dashboard/edit/${post.id}`}
                        className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all"
                        title="Edit post"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </main>
  );
}