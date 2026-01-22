import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}