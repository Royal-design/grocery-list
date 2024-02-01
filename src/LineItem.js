import React from "react";

export const LineItem = ({ item, handleCheck, handleDelete, FaTrashAlt }) => {
  return (
    <li key={item.id} className="item">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => {
          handleCheck(item.id);
        }}
      />
      <label
        onDoubleClick={() => {
          handleCheck(item.id);
        }}
        style={item.checked ? { textDecoration: "line-through" } : null}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => {
          handleDelete(item.id);
        }}
        role="button"
        tabIndex="0"
      />
    </li>
  );
};
