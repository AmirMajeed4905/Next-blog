"use client";

import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  category: string;
  published: boolean;
  createdAt: string;
};

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white p-6">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm">Manage your blog posts</p>
        </div>

        <a
          href="/admin/new"
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          + New Post
        </a>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        
        {loading ? (
          <p className="text-slate-400">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-400">No posts found</p>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/5 border border-purple-900/30 p-4 rounded-xl flex justify-between items-center hover:bg-white/10 transition"
              >
                {/* Left */}
                <div>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <div className="flex gap-3 text-xs text-slate-400 mt-1">
                    <span>{post.category}</span>
                    <span>{post.published ? "Published" : "Draft"}</span>
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex gap-2">
                  <a
                    href={`/admin/edit/${post.id}`}
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Edit
                  </a>

                  <button
                    onClick={() => deletePost(post.id)}
                    className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}