import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { title, content } = await request.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const userId = request.cookies.get("x-user-id")?.value;

    console.log(userId);

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // If your userId is a number in the database, convert it:
    // const userIdNum = parseInt(userId, 10);

    const response = await prisma.todos.create({
      data: {
        title,
        content: content || "",
        user: {
          connect: { id: userId }, // or id: userIdNum if number
        },
      },
    });

    return NextResponse.json(
      { message: "Todo created successfully", data: response },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
