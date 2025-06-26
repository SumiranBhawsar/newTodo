import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 401 });
  }

  const accessToken = data.session?.access_token;

  const response = NextResponse.json(
    { message: "User logged in successfully", data: data.user },
    { status: 200 }
  );

  if (accessToken) {
    response.cookies.set("token", accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "strict",
    });
  }

  return response;
};
