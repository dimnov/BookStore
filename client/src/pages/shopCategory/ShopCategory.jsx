import { useEffect, useState } from "react";
import Item from "../../components/item/Item.jsx";
import useSessionStorage from "../../hooks/useSessionStorage.js";
import useBeforeUnload from "../../hooks/useBeforeUnload.js";
import dropdown_icon from "../../Assets/dropdown_icon.png";
import { getBooksList } from "../../services/GetProduct.js";
import { getBooksCount } from "../../services/GetProduct.js";
import "./ShopCategory.css";

export default function ShopCategory() {
  const [books, setBooks] = useState([]);
  const [itemsToShow, setItemsToShow] = useSessionStorage("itemsToShow", 15);
  const [totalBooks, setTotalBooks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBooksList(itemsToShow);
      setBooks(data);
    };
    fetchData();
  }, [itemsToShow]);

  useEffect(() => {
    const fetchCount = async () => {
      const documentCount = await getBooksCount();
      setTotalBooks(documentCount);
    };
    fetchCount();
  }, []);

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 15);
  };

  useBeforeUnload(() => {
    sessionStorage.removeItem("itemsToShow");
  });

  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">
        <p>
          <span>
            Showing 1-{itemsToShow > totalBooks ? totalBooks : itemsToShow}
          </span>{" "}
          out of {totalBooks} products
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
