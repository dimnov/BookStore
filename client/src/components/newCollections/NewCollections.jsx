import "./NewCollections.css";
import Item from "../item/Item.jsx";
import { useEffect, useState } from "react";
import { getBooksList } from "../../services/GetProduct.js";

export default function NewCollections() {
  const [books, setBooks] = useState([]);
  const itemsToShow = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooksList(itemsToShow);
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="new-collections">
      <h1>LATEST BOOKS</h1>
      <hr />
      <div className="collections">
        {books.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
}
