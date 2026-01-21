"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // 記事1件だけを取得する
    fetch(`/api/admin/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <p className="p-8 text-center">読み込み中...</p>;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <Link href="/admin/posts" className="text-blue-500 hover:underline">← 一覧に戻る</Link>
      <article className="mt-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-8 border-b pb-4">
          投稿日: {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </main>
  );
}