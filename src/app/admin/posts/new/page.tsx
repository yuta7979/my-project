"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert("記事を公開しました");
        router.push("/admin/posts");
      }
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">TITLE</label>
          <input
            type="text"
            placeholder="記事のタイトルを入力..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-2 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">CONTENT</label>
          <textarea
            placeholder="本文を書きましょう..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-2 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition h-64 text-black"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition shadow-lg"
        >
          記事を公開する
        </button>
      </form>
    </main>
  );
};

export default Page;