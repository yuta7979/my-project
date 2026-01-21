import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // await params を追加して、IDを安全に取得するように修正
    const { id } = await params; 
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "無効なIDです" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "記事が見つかりません" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("詳細取得エラー:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}