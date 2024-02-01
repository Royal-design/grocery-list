import React from "react";

export const SearchItem = ({ search, setsearch }) => {
  return (
    <form className="search" onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="Search for item"
        type="text"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />
    </form>
  );
};
