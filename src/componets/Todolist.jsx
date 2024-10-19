import React, { useState } from "react";

const Todolist = () => {
  const [list, setlist] = useState([]);
  const [message, setMessgae] = useState({
    text: "",
    id: "",
  });
  const [editingitem, setEditingItem] = useState({
    id: "",
    isEditing: false,
  });

  const chnagehandeler = (e) => {
    setMessgae({
      ...message,
      text: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.text.trim() !== "") {
      let newTodo = {
        text: message.text,  // Corrected here to use "message" instead of "messge"
        id: Date.now().toString(),
      };
      setlist([...list, newTodo]); // Add new todo
      setMessgae({
        text: "",
        id: "",
      }); // Clear input field
    }
  };

  const deletehandeler = (id) => {
    const filterdata = list.filter((eachItem) => eachItem.id !== id);
    setlist(filterdata);
  };

  const changeEidistate = (id) => {
    setEditingItem({
      ...editingitem,
      id: id,
      isEditing: true,
    });
    let editableItem = list.find((eachItem) => eachItem.id === id);
    setMessgae({
      ...message,
      text: editableItem.text,
      id: editableItem.id,
    });
  };

  const handelEidit = (e) => {
    e.preventDefault();
    let newTodos = list.map((eachItem) => {
      if (eachItem.id === editingitem.id) {
        return {
          text: message.text,
          id: editingitem.id,
        };
      } else {
        return eachItem;
      }
    });
    setlist(newTodos);
    setMessgae({
      text: "",
      id: "",
    });
    setEditingItem({
      id: "",
      isEditing: false,
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center p-5">
      {/* Todo List Title */}
      <h1 className="text-4xl underline font-bold mb-8">Todolist</h1>

      {/* Input Field with Label and Button */}
      <form className="w-full max-w-md flex flex-col mb-8">
        <label
          htmlFor="input"
          className="block text-lg text-black font-bold mb-1"
        >
          Enter Text
        </label>

        <div className="relative w-full">
          <input
            type="text"
            name="text"
            id="input"
            inputMode="text"
            value={message.text}  // Corrected to use "message"
            onChange={chnagehandeler}
            placeholder="Type here..."
            className="w-full px-4 py-2 border border-teal-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {editingitem.isEditing ? (
            <button
              type="submit"
              onClick={handelEidit}
              className="absolute right-0 top-0 h-full px-4 bg-teal-500 text-white font-semibold rounded-r hover:bg-teal-600"
            >
              Edit
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="absolute right-0 top-0 h-full px-4 bg-teal-500 text-white font-semibold rounded-r hover:bg-teal-600"
            >
              Add
            </button>
          )}
        </div>
      </form>

      {/* List Display in Table Format */}
      {list.length === 0 ? (
        <h4>There is no item in the list</h4>
      ) : (
        <table className="table-auto w-full max-w-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((eachItem, index) => {
              const { text, id } = eachItem;
              return (
                <tr key={id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{text}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => changeEidistate(id)}
                      className="px-3 py-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deletehandeler(id)}
                      className="px-3 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Todolist;
