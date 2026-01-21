"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
}

const Page: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/admin/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">カテゴリ一覧</h1>
        <Link href="/admin/categories/new" className="bg-green-500 text-white px-4 py-2 rounded">
          新規作成
        </Link>
      </div>
      <ul className="border-t">
        {categories.map((category) => (
          <li key={category.id} className="border-b p-2">
            {category.name} (ID: {category.id})
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Page;