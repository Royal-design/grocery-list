import React from "react";
import { LineItem } from "./LineItem";

export const ItemList = ({ item, FaTrashAlt, handleDelete, handleCheck }) => {
  return (
    <ul>
      {item.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          FaTrashAlt={FaTrashAlt}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
        />
      ))}
    </ul>
  );
};
