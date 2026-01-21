import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. 記事を一覧で取得する機能 (GET)
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" }, // 新しい順に並べる
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}

// 2. 記事を保存する機能 (POST)
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
  }
}