interface TodoRepositoryGetParams {
  page: number;
  limit: number;
}

interface TodoRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  return fetch("http://localhost:3000/api/todos").then(
    async (respostaDoServidor) => {
      const todos = await respostaDoServidor.json();
      const ALL_TODOS = todos;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
      const totalPages = Math.ceil(ALL_TODOS.length / limit);
      return {
        todos: ALL_TODOS,
        total: ALL_TODOS.length,
        pages: 1,
      };
    }
  );
}

export const todoRepository = {
  get,
};

//Model/Schema
interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}
