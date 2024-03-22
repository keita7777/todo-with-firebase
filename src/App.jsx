import { useEffect, useState } from "react";
import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");
  const [status, setStatus] = useState(["notstart"]);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(collection(db, "todo"));
      setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTodos();
    console.log("success");

    // const todoData = collection(db, "todo");
    // getDocs(todoData).then((snapShot) => {
    //   setTodoList(snapShot.docs.map((doc) => ({ ...doc.data() })));
    // });

    // onSnapshot(todoData, (t) => {
    //   setTodoList(t.docs.map((doc) => ({ ...doc.data() })));
    // });

    console.log("success");
  }, []);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "todo"), {
      id: crypto.randomUUID(),
      text: todo.trim(),
      status: status,
    });

    setTodo("");
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    // const updatedItem = todos.map((todo) => {
    //   return todo.id === id ? updatedTodo : todo;
    // });

    // await updateDoc(doc(db, "todo", id), {
    //   text: currentTodo.text,
    // });

    // const data = await getDocs(collection(db, "todo"));
    // setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    const updatedItem = todoList.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    await updateDoc(doc(db, "todo", id), {
      text: currentTodo.text,
    });

    setTodoList(updatedItem);
  };

  const handleEditFormSubmit = async (e, id) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
    setIsEditing(false);
  };

  const handleDeleteClick = async (id) => {
    await deleteDoc(doc(db, "todo", id));
    const data = await getDocs(collection(db, "todo"));
    setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleStatusSelectChange = (e, id) => {
    // const updateStatus = e.target.value;
    // const updateTodo = todo
  };

  return (
    <div className="App">
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>TODOを編集</h2>
          <input
            name="todo"
            type="text"
            placeholder="タイトルを入力"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          <button type="submit">更新</button>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            キャンセル
          </button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h2>TODOを追加</h2>
          <input
            name="todo"
            type="text"
            placeholder="TODOを入力"
            value={todo}
            onChange={handleInputChange}
          />
          <button type="submit">追加</button>
        </form>
      )}

      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleEditClick(todo)}>編集</button>
              <button onClick={() => handleDeleteClick(todo.id)}>削除</button>
              <select
                name="status"
                onChange={() => handleStatusSelectChange(todo.id)}
              >
                <option value="notstart">未着手</option>
                <option value="start">着手</option>
                <option value="done">完了</option>
              </select>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
