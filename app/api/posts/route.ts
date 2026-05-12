import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";

// GET ALL POSTS (PUBLIC)
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// CREATE POST (FROM YOUR FORM)
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { title, content, excerpt, category, published } = body;

    // validation (extra safety layer beyond Zod)
    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // slug generate
    let slug = generateSlug(title);

    const exists = await prisma.post.findUnique({
      where: { slug },
    });

    if (exists) {
      slug = `${slug}-${Date.now()}`;
    }

    // create post
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || content.slice(0, 150) + "...",
        category,
        published: published ?? false,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Post created successfully",
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}