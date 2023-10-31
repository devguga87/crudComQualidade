import { read } from "@db-crud-todo";
import { NextApiRequest, NextApiResponse } from "next";

function get(_: NextApiRequest, res: NextApiResponse) {
  const todo = read();
  res.status(200).json({ todo });
}

export const todoController = {
  get,
};
