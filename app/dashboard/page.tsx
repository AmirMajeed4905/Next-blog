import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  const totalPosts = user?.posts.length ?? 0;
  const publishedPosts = user?.posts.filter((p) => p.published).length ?? 0;
  const draftPosts = totalPosts - publishedPosts;

  return (
    <main className="min-h-screen bg-[#0f0f1a] py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-1">
              Welcome back, {session.user?.name ?? "User"}!
            </p>
          </div>
          <Link
            href="/dashboard/new-post"
            className="flex items-center gap-2 bg-linear-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-900/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white/3 border border-purple-900/30 rounded-2xl p-6 mb-8 flex items-center gap-5">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-2xl ring-2 ring-purple-600/50"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {session.user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-white font-semibold text-xl">
              {session.user?.name}
            </h2>
            <p className="text-slate-400 text-sm">{session.user?.email}</p>
            <span className="inline-block mt-2 text-xs bg-purple-600/20 text-purple-300 border border-purple-600/30 px-3 py-0.5 rounded-full capitalize">
              {session.user?.role ?? "user"}
            </span>
          </div>
          <Link
            href="/profile"
            className="text-slate-400 hover:text-white border border-purple-900/40 hover:border-purple-600/50 px-4 py-2 rounded-xl text-sm transition-all"
          >
            Edit Profile
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Posts",
              value: totalPosts,
              icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              color: "text-purple-400",
              bg: "bg-purple-900/20 border-purple-800/30",
            },
            {
              label: "Published",
              value: publishedPosts,
              icon: "M5 13l4 4L19 7",
              color: "text-green-400",
              bg: "bg-green-900/20 border-green-800/30",
            },
            {
              label: "Drafts",
              value: draftPosts,
              icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
              color: "text-amber-400",
              bg: "bg-amber-900/20 border-amber-800/30",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} border rounded-2xl p-5 flex items-center gap-4`}
            >
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-xs">{stat.label}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/30">
            <h3 className="text-white font-semibold">Recent Posts</h3>
            <Link
              href="/dashboard/posts"
              className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              View all
            </Link>
          </div>

          {user?.posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📝</div>
              <h4 className="text-white font-medium mb-2">No posts yet</h4>
              <p className="text-slate-400 text-sm mb-6">
                Create your first post and share your ideas.
              </p>
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
            <div className="divide-y divide-purple-900/20">
              {user?.posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">
                      {post.title}
                    </h4>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border ${
                        post.published
                          ? "bg-green-900/30 text-green-400 border-green-800/30"
                          : "bg-amber-900/30 text-amber-400 border-amber-800/30"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <Link
                      href={`/dashboard/edit/${post.id}`}
                      className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}