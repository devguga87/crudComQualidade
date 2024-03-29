import { todoRepository } from "@ui/repository/todo";

interface TodoGetParams {
  page: number;
}

async function get({ page }: TodoGetParams) {
  return todoRepository.get({ page: page || 1, limit: 2 });
}

export const todoController = {
  get,
};
