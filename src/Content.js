import { ItemList } from "./ItemList";

export const Content = ({ item, FaTrashAlt, handleCheck, handleDelete }) => {
  return (
    <main className="content">
      {item.length ? (
        <ItemList
          item={item}
          FaTrashAlt={FaTrashAlt}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p>Your list is empty</p>
      )}
    </main>
  );
};
