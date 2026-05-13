import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/ProfileForm";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { _count: { select: { posts: true } } },
  });

  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-[#0f0f1a] py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <p className="text-slate-400 text-sm">Manage your account settings</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Left — Avatar card */}
          <div className="md:col-span-1">
            <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6 text-center sticky top-24">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="rounded-2xl ring-2 ring-purple-600/50 mx-auto mb-4"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </div>
              )}
              <h2 className="text-white font-semibold text-lg">{user.name}</h2>
              <p className="text-slate-400 text-sm mt-1 truncate">{user.email}</p>
              <span className="inline-block mt-3 text-xs bg-purple-600/20 text-purple-300 border border-purple-600/30 px-3 py-1 rounded-full capitalize">
                {user.role}
              </span>

              <div className="mt-6 pt-6 border-t border-purple-900/30 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user._count.posts}</p>
                  <p className="text-slate-400 text-xs mt-0.5">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {new Date(user.createdAt).getFullYear()}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">Joined</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Edit form */}
          <div className="md:col-span-2">
            <ProfileForm user={{ id: user.id, name: user.name ?? "", email: user.email }} />
          </div>
        </div>
      </div>
    </main>
  );
}