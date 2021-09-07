import React from "react";

const SearchBox = ({ searchValue: value, setSearchValue: setFunc }) => {
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        value={value}
        onChange={(e) => setFunc(e.currentTarget.value)}
        placeholder="type to search"
      ></input>
    </div>
  );
};

export default SearchBox;
