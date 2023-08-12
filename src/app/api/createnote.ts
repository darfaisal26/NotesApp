import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body;
  console.log("success");

  try {
    await prisma.note.create({
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error });
    console.log("error occured ");
  }
}
