import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import * as bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const cookie = cookies();
    const data = await req.json();
    const { email, password } = data as Record<string, any>;
    console.log(email, password);

    // check user exists or not
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        notes: true,
      },
    });

    console.log(user);
    if (user === null) {
      console.log("heelo user null");
      return NextResponse.json(
        { message: "user does not exists" },
        { status: 409 }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "password is incorrect" },
        { status: 409 }
      );
    }

    // create token data
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!);
    const response = NextResponse.json({
      message: "login was successfull",
      success: true,
      data: token,
      user,
    });
    cookie.delete("token");
    cookie.set("token", token, {
      httpOnly: true,

    });

    console.log(response, "token res created");
    return NextResponse.json({
      message: "login was successfull",
      success: true,
      data: token,
      user,
    });
  } catch (error) {
    console.error("Error occurred in login form:", error);
    return NextResponse.json({ message: "An error occurred." });
  }
}
