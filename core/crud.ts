import fs from "fs";
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content,
    done: false,
  };

  const todos: Array<Todo> = [...read(), todo];
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

function updateById(id: UUID, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  const todos: Array<Todo> = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      Object.assign(currentTodo, partialTodo);
      updatedTodo = currentTodo;
    }
  });

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  if (!updatedTodo) {
    throw new Error("erro");
  }

  return updatedTodo;
}

function deleteById(id: UUID) {
  const todos: Array<Todo> = read();
  const todosWithoutDeleted = todos.filter((todo) => todo.id != id);
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos: todosWithoutDeleted }, null, 2)
  );
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

//[SIMULATION]
CLEAR_DB();
const todo1 = create("First create!");
const todo2 = create("Segunda Todo");
const todo3 = create("Terceira Todo");
updateById(todo2.id, {
  content: "Segunda editada",
  done: true,
});
deleteById(todo1.id);
console.log(read());
