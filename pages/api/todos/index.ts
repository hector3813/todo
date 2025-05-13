import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
    } else if (req.method === "POST") {
      const { title } = req.body;
      if (!title) {
        res.status(400).json({ error: "Title is required" });
        return;
      }
      const todo = await prisma.todo.create({ data: { title, completed: false } });
      res.status(201).json(todo);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
