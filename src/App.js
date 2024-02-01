import { AddItem } from "./AddItem";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Headers } from "./Headers";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./app.style.scss";
import { SearchItem } from "./SearchItem";

const App = () => {
  const [search, setsearch] = useState("");
  const [item, setitem] = useState(
    JSON.parse(localStorage.getItem("shoppinglist")) || []
  );

  useEffect(() => {
    console.log("new item enter");
    localStorage.setItem("shoppinglist", JSON.stringify(item));
  }, [item]);

  const handleCheck = (id) => {
    const newItem = item.map((item) =>
      id === item.id ? { ...item, checked: !item.checked } : item
    );
    setitem(newItem);
  };
  const handleDelete = (id) => {
    const newItem = item.filter((item) => id !== item.id);
    setitem(newItem);
  };
  const [newitem, setnewitem] = useState("");
  const addItem = (inputNewItem) => {
    const id = item.length ? item[item.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item: inputNewItem };
    const newItem = [...item, myNewItem];
    setitem(newItem);
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
          item={item.filter((items) =>
            items.item.toLowerCase().includes(search.toLowerCase())
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
