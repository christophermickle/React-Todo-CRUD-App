import Form from "./components/Form";

import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { db } from "./components/Firebase";
import { QuerySnapshot, collection, onSnapshot, query, updateDoc } from "firebase/firestore";

const App = () => {
  const [todo, setTodo] = useState([]);

  //Create Todo

  //Read Todo
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodo(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //Update Todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //Delete Todo

  return (
    <div className="h-screen w-screen p-4 bg-teal-300">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 p-2">A DEV'S TODO LIST</h1>
        <Form />
        <ul>
          {todo.map((todos, index) => (
            <Todo key={index} todos={todos} toggleComplete={toggleComplete} />
          ))}
        </ul>
        <p>YOU HAVE 2 THINGS TO COMPLETE</p>
      </div>
    </div>
  );
};

export default App;
