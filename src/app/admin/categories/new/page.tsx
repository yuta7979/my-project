"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        alert("カテゴリを作成しました");
        router.push("/admin/categories");
      } else {
        alert("作成に失敗しました");
      }
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">カテゴリ作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold">カテゴリ名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
        >
          {isSubmitting ? "作成中..." : "作成"}
        </button>
      </form>
    </main>
  );
};

export default Page;