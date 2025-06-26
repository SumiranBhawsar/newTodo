import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log(data);

  if (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: `supabase signup error : ${error.message}` },
      { status: 400 }
    );
  }

  console.log(`created user with supabase in auth table : ${data.user}`);

  const existedUser = await prisma.users.findFirst({
    where: { email: email },
  });

  if (existedUser) {
    console.error("user already registered with this email  ");

    return NextResponse.json(
      {
        message: "user already registered with this email ",
      },
      { status: 400 }
    );
  }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.users.create({
      data: {
        id: data.user?.id,
        username,
        email,
      },
    });

    console.log(`new User creating with prisma : ${newUser}`);

    if (!newUser) {
      return NextResponse.json(
        { message: "error while register user with prisma" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "user registed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong while creating a user ",
      },
      { status: 500 }
    );
  }
};
