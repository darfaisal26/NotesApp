import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import * as bcryptjs from "bcryptjs";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req.method);

  try {
    const data = await req.json();
    const { username, email, password } = data as Record<string, any>;
    console.log(username, email, password);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          error: "Email already exists",
        }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    // console.log("hashed password", hashedPassword);

    try {
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword, // hashed password
        },
      });

      return new NextResponse(
        JSON.stringify({
          user: newUser,
        }),
        { status: 201 }
      );
    } catch (createError) {
      console.error("Error occurred in signup form:", createError);
      return new NextResponse(
        JSON.stringify({ message: "An error occurred." }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error occurred in signup form:", error);
    return new NextResponse(JSON.stringify({ message: "An error occurred." }), {
      status: 500,
    });
  }
}
