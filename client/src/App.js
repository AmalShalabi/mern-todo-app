import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
    const [updatedItemText, setUpdatedItemText] = useState("");

  //add new item to todo List
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
      });
      setListItems((prev) => [...prev, response.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };
  //Create function to fetch all items from database--we will use useEffect
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/items");
        setListItems(response.data);
        console.log("render");
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);
  // delete item when click on delete button
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/item/${id}`
      );
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  };
  //Update item
  const updateItem=async(e)=>{
    e.preventDefault()
    try{
const response = axios.put(`http://localhost:5500/api/item/${isUpdating}`,{item: updatedItemText});
const updatedItemIndex=listItems.findIndex(item=> item._id===isUpdating)
const updatedItem=listItems[updatedItemIndex].item=updatedItemText
setIsUpdating('');
setUpdatedItemText('')
    }catch(err){
console.log(err)
    }
  }
  //before updating item we need to show input where we will creae our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={e=>updateItem(e)}>
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdatedItemText(e.target.value);}} value={updatedItemText}/>
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add Todo item"
          onChange={(e) => setItemText(e.target.value)}
          value={itemText}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item">
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => setIsUpdating(item._id)}
                >
                  Update{" "}
                </button>
                <button
                  className="delete-item"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete{" "}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
