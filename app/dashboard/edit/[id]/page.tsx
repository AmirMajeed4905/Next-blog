import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import EditPostForm from "@/components/EditPostForm";
import Link from "next/link";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) notFound();
  if (post.authorId !== session.user.id && session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#0f0f1a] py-10 px-4">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-bold text-white">Edit Post</h1>
            <p className="text-slate-400 text-sm truncate max-w-md">{post.title}</p>
          </div>
        </div>
        <EditPostForm post={post} />
      </div>
    </main>
  );
}