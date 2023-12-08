import { useState } from "react";
import { getBookByName } from "../../services/bookService.js";
import Item from "../../components/item/Item.jsx";
import "./Search.css";

export default function Search() {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    if (value.trim() === "") {
      setSearchResult(null);
      setSearchPerformed(false);
      return;
    }

    try {
      const result = await getBookByName(value);
      setSearchResult(result);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error searching for book:", error);
      setSearchResult(null);
      setSearchPerformed(true);
    }
  };

  return (
    <div className="search">
      <p>Search books by their name.</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Book name..."
      />
      <button onClick={handleSearch}>Search</button>

      <div className="shopcategory-products">
        {searchPerformed && searchResult !== null ? (
          <Item
            key={searchResult.id}
            id={searchResult.id}
            name={searchResult.name}
            image={searchResult.image}
            price={searchResult.price}
          />
        ) : null}
        {searchPerformed && searchResult === null ? (
          <p>No book found with this name.</p>
        ) : null}
      </div>
    </div>
  );
}
