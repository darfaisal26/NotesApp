import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";
import jwt_decode from "jwt-decode";

export async function POST(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();
  const tokendata: any = cookieStore.get("token");
  console.log("cookies", tokendata);

  var decoded: any = jwt_decode(tokendata.value);
  let id = decoded.id;
  console.log(decoded.id);
  const data = await req.json();

  const { title, content } = data;
  console.log(title, content);
  try {
    const post = await prisma.note.create({
      data: {
        title,
        content,
        userId: id,
      },
    });
    return NextResponse.json({
      post,
    });
  } catch (error) {
    NextResponse.json({ message: error });
    console.log("error occured ");
  }
}
