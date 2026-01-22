import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const prisma = new PrismaClient(); // ここで定義する

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}