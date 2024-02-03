import { AddItem } from "./AddItem";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Headers } from "./Headers";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./app.style.scss";
import { SearchItem } from "./SearchItem";
import apiRequest from "./apiRequest";

const App = () => {
  const API_URL = "http://localhost:3500/item";

  const [item, setitem] = useState([]);
  const [search, setsearch] = useState("");
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItem = await response.json();
        setitem(listItem);
        seterror(null);
      } catch (error) {
        seterror(error.message);
      } finally {
        setloading(false);
      }
    };
    setTimeout(() => {
      (async () => fetchItem())();
    }, 2000);
  }, []);

  const addItem = async (inputNewItem) => {
    const id = item.length ? item[item.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item: inputNewItem };
    const newItem = [...item, myNewItem];
    setitem(newItem);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myNewItem)
    };
    console.log(postOptions);
    const result = await apiRequest(API_URL, postOptions);
    if (result) seterror(result);
  };

  const handleCheck = async (id) => {
    const newItem = item.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setitem(newItem);

    const myItem = newItem.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;

    const result = await apiRequest(reqUrl, updateOptions);

    if (result) seterror(result);
  };
  const handleDelete = async (id) => {
    const newItem = item.filter((item) => id !== item.id);
    setitem(newItem);
    const deleteOption = {
      method: "DELETE"
    };
    const reqUrl = `${API_URL}/${id}`;

    const result = await apiRequest(reqUrl, deleteOption);

    if (result) seterror(result);
  };
  const [newitem, setnewitem] = useState("");

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
        <main className="content">
          {loading && <p style={{ color: "white" }}>Loading...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {!error && !loading && (
            <Content
              item={item.filter((items) =>
                items.item.toLowerCase().includes(search.toLowerCase())
              )}
              FaTrashAlt={FaTrashAlt}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          )}
        </main>
        <Footer item={item} />
      </div>
    </div>
  );
};

export default App;
