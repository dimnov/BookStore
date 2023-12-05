import React, { useEffect, useState } from "react";
import Item from "../../components/item/Item.jsx";

import { getBooksList } from "../../services/GetProduct.js";
import useSessionStorage from "../../hooks/useSessionStorage.js";
import useBeforeUnload from "../../hooks/useBeforeUnload.js";

import dropdown_icon from "../../Assets/dropdown_icon.png";
import "./ShopCategory.css";
import { getDocumentCount } from "../../services/FirebaseService.js";

export default function ShopCategory() {
  const [books, setBooks] = useState([]);
  const [itemsToShow, setItemsToShow] = useSessionStorage("itemsToShow", 15);
  const [totalBooks, setTotalBooks] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooksList(itemsToShow);
      setBooks(data);
    };
    fetchBooks();
  }, [itemsToShow]);

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 15);
  };

  useBeforeUnload(() => {
    sessionStorage.removeItem("itemsToShow");
  });

  useEffect(() => {
    const fetchDocumentCount = async () => {
      const documentCount = await getDocumentCount();
      setTotalBooks(documentCount);
    };
    fetchDocumentCount();
  }, [totalBooks]);

  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{itemsToShow}</span> out of {totalBooks} products
        </p>
        <div className="shopcategory-sort categories">
          Categories <img src={dropdown_icon} alt="" />
        </div>
        <div className="shopcategory-sort sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {books.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore" onClick={handleShowMore}>
        Show more
      </div>
    </div>
  );
}
