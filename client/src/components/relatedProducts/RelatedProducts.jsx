import "./RelatedProducts.css";
import Item from "../item/Item.jsx";
import { useEffect, useState } from "react";
import { getBooksByCategory } from "../../services/GetProduct.js";

export default function RelatedProducts({ product }) {
  const [books, setBooks] = useState([]);
  const itemsToShow = 4;

  useEffect(() => {
    const fetchBooks = async () => {
      if (product.category) {
        const data = await getBooksByCategory(itemsToShow, product.category);
        setBooks(data);
      }
    };

    fetchBooks();
  }, [product]);

  return (
    <div className="relatedproducts">
      <h1>Related Books</h1>
      <hr />
      <div className="relatedproducts-item">
        {books.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
