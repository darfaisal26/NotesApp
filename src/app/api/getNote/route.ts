import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";
import jwt_decode from "jwt-decode";
export async function GET(req: NextRequest, res: NextResponse) {
  const cookieStore = cookies();
  const tokendata: any = cookieStore.get("token");

  var decoded: any = jwt_decode(tokendata.value);

  const notes = await prisma.note.findMany({
    where: { userId: decoded.id },
    select: {
      id: true,
      title: true,
      content: true,
      userId: true,
    },
  });
  return NextResponse.json(notes);
}
