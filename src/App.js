import { AddItem } from "./AddItem";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Headers } from "./Headers";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./app.style.scss";
import { SearchItem } from "./SearchItem";

const App = () => {
  const [search, setsearch] = useState("");
  const [item, setitem] = useState(
    JSON.parse(localStorage.getItem("shoppinglist"))
  );
  const savedItem = (newItem) => {
    setitem(newItem);
    localStorage.setItem("shoppinglist", JSON.stringify(newItem));
  };
  const handleCheck = (id) => {
    const newItem = item.map((item) =>
      id === item.id ? { ...item, checked: !item.checked } : item
    );
    savedItem(newItem);
  };
  const handleDelete = (id) => {
    const newItem = item.filter((item) => id !== item.id);
    savedItem(newItem);
  };
  const [newitem, setnewitem] = useState("");
  const addItem = (inputNewItem) => {
    const id = item.length ? item[item.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item: inputNewItem };
    const newItem = [...item, myNewItem];
    savedItem(newItem);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newitem) return;
    if (newitem !== "") {
      addItem(newitem);
    }

    setnewitem(" ");
  };

  return (
    <div className="">
      <div className="app">
        <Headers />
        <AddItem
          newitem={newitem}
          setnewitem={setnewitem}
          handleSubmit={handleSubmit}
        />
        <SearchItem setsearch={setsearch} search={search} />
        <Content
          item={item.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )}
          FaTrashAlt={FaTrashAlt}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        <Footer item={item} />
      </div>
    </div>
  );
};

export default App;
