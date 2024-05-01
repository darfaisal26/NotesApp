import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function DELETE(req: Request, res: Response) {
  var test = await req.json();
  const noteId = test.id;
  console.log(noteId);

  const notes = await prisma.note.delete({
    where: { id: Number(noteId) },
  });
  if (notes) {
    NextResponse.json({ message: "done" });
  } else {
    console.log("Note could not be modified");
    NextResponse.json({ message: "Note could not be modified" });
  }
}
