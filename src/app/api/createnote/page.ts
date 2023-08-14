import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hello");
  console.log(req.method);
  if (req.method === "POST") {
    // Handle the POST request here
    const { title, content } = req.body;
    // console.log("this is body req",req.body );
    // Example: Save the note to a database or perform any other necessary action
    // ...

    try {
      const post = await prisma.note.create({
        data: {
          title,
          content,
        },
      });
      res.status(200).json({ message: "Note created successfully" });

      console.log(post);
    } catch (error) {
      res.status(400).json({ message: error });
      console.log("error occured ");
    }
  }
}
