import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest) => {
  const userId = request.cookies.get("x-user-id")?.value;

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  const todos = await prisma.todos.findMany({
    where: {
      userId: userId
    }
  });

  return NextResponse.json(todos);  
}