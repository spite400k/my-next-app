import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  if (req.method !== "POST")
    return NextResponse.json({ message: "Bad Request" }, { status: 405 });

  const { email, password, name } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser)
    return NextResponse.json({ message: "Email taken" }, { status: 422 });

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      // 予期しないエラー
      return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
    }
  }
}
