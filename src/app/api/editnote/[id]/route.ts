import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { prisma } from "../../../../../lib/prisma";
import { ServerResponse } from "http";

export async function PUT(req: NextRequest, res: NextResponse<any>) {
  var test = await req.json();
  const noteId = test.id;
  console.log(noteId);
  const { title, content } = test;
  // console.log("update before");
  console.log(req.headers);
  const notes = await prisma.note.update({
    where: { id: Number(noteId) },
    data: {
      title,
      content,
    },
  });
  // console.log("update after");

  if (notes) {
    NextResponse.json({ message: "done" });
  } else {
    console.log("Note could not be modified");
    NextResponse.json({ message: "Note could not be modified" });
  }
}
