async function get() {
  return fetch("http://localhost:3000/api/todos").then(
    async (respostaDoServidor) => {
      const todos = await respostaDoServidor.json();
      return todos;
    }
  );
}

export const todoController = {
  get,
};
