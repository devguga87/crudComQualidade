/* eslint-disable no-console */
import fs from "fs";
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./core/db";

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content,
    done: false,
  };

  const todos: Array<Todo> = [...read(), todo];

  //salvar o content no sistema
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  return todo;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }
  return db.todos;
}

function update(id: UUID, partialTodo: Partial<Todo>): Todo {
  const todos = read();
  let updatedTodo;

  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));

  if (!updatedTodo) {
    throw new Error("Por favor adicione um novo ID!");
  }

  return updatedTodo;
}

function updateContentById(id: UUID, content: string) {
  return update(id, { content });
}

function deleteById(id: UUID) {
  const todos = read();
  const todosWithoutOne = todos.filter((currentTodo) => currentTodo.id !== id);

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos: todosWithoutOne }, null, 2)
  );
}

function DB_CLEAR() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

//[SIMULATION]
DB_CLEAR();
const primeiraTodo = create("Primeira TODO");
const segundaTodo = create("Segunda TODO");
const thirdTodo = create("Terceira TODO");
deleteById(primeiraTodo.id);
update(segundaTodo.id, {
  content: "Atualizada",
  done: true,
});
updateContentById(segundaTodo.id, "Atualizada");
console.log(read());
