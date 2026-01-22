import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "エラーが発生しました" }, { status: 500 });
  }
}