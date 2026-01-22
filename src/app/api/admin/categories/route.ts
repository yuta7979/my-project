export const revalidate = 0;
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// カテゴリ一覧を取得する
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "取得失敗" }, { status: 500 });
  }
}

// カテゴリを保存する
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const category = await prisma.category.create({
      data: { name },
    });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "作成失敗" }, { status: 500 });
  }
}