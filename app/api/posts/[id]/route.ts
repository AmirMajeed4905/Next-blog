import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Context = {
  params: { id: string } | Promise<{ id: string }>;
};

async function getParams(params: Context["params"]) {
  return "then" in params ? await params : params;
}

// UPDATE POST
export async function PATCH(req: Request, context: Context) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await getParams(context.params);

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    if (post.authorId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        category: body.category,
        published: body.published,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Post updated",
      post: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

// DELETE POST
export async function DELETE(req: Request, context: Context) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await getParams(context.params);

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    if (post.authorId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}