import { useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch all todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("/api/todos");
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });
      if (!res.ok) throw new Error("Failed to add todo");
      const data = await res.json();
      setTodos((prevTodos) => [...prevTodos, data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Toggle completion status
  const toggleComplete = async (id: number, completed: boolean) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete todo");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-8" style={{ background: 'linear-gradient(135deg, #ffd6ec 0%, #ffe7fa 50%, #e0c3fc 100%)', fontFamily: 'Comic Sans MS, Comic Sans, cursive, sans-serif' }}>
      <h1 className="text-5xl font-extrabold text-pink-500 mb-2 drop-shadow-[0_2px_0_white,0_4px_0_white,0_6px_0_white] tracking-wide text-center" style={{ WebkitTextStroke: '2px white', letterSpacing: '0.05em' }}>
        MY TO DO LIST
      </h1>
      <div className="text-3xl mb-8">😊</div>
      <div className="w-full max-w-lg flex flex-col gap-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-1 px-4 py-3 rounded-full border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-lg shadow"
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 rounded-full bg-pink-400 text-white font-bold text-lg shadow hover:bg-pink-500 transition"
          >
            Add
          </button>
        </div>
        <ul className="flex flex-col gap-6">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center bg-white rounded-full shadow-lg px-6 py-4 gap-4">
              <span
                onClick={() => toggleComplete(todo.id, todo.completed)}
                className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-black cursor-pointer mr-4 bg-white text-2xl select-none"
                style={{ minWidth: '2rem', minHeight: '2rem' }}
                title="Toggle complete"
              >
                {todo.completed ? '✔️' : ''}
              </span>
              <span className={todo.completed ? "line-through text-gray-400 text-xl flex-1" : "text-gray-800 text-xl flex-1"}>
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)} className="ml-2 text-pink-400 hover:text-pink-600 text-2xl transition" title="Delete">
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
