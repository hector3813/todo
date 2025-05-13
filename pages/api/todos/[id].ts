import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === "PUT") {
      const { completed } = req.body;
      const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data: { completed },
      });
      res.status(200).json(updatedTodo);
    } else if (req.method === "DELETE") {
      await prisma.todo.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } else {
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
