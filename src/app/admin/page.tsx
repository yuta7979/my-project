"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  createdAt: string;
}

const Page: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // ページを開いた時に、保存された記事を読み込む
  useEffect(() => {
    fetch("/api/admin/posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      });
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">記事管理一覧</h1>
        <Link href="/admin/posts/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + 新規投稿
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">タイトル</th>
              <th className="p-3 border-b text-right">投稿日</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{post.title}</td>
                <td className="p-3 border-b text-right text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={2} className="p-10 text-center text-gray-400">記事がまだありません</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Page;