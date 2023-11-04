import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page: number;
}

async function get({ page }: TodoControllerGetParams) {
  //Fazer a logica de pegar os dados
  return todoRepository.get({
    page,
    limit: 2,
  });
}

export const todoController = {
  get,
};
