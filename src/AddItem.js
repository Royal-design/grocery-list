import { useRef } from "react";
import { FaPlus } from "react-icons/fa";

export const AddItem = ({ newitem, setnewitem, handleSubmit }) => {
  const inputRef = useRef(null);
  return (
    <form className="add-item" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={newitem}
        onChange={(e) => setnewitem(e.target.value)}
        autoFocus
        placeholder="Add Item"
        required
      />
      <button
        onClick={() => inputRef.current.focus()}
        type="submit"
        aria-label="Add Item"
      >
        <FaPlus />
      </button>
    </form>
  );
};
