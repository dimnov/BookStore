import React, { useEffect, useState } from "react";
import useSessionStorage from "../../hooks/useSessionStorage.js";
import useBeforeUnload from "../../hooks/useBeforeUnload.js";
import {
  getBooksByCategory,
  getBooksList,
  getCategoriesList,
  getBooksCount,
} from "../../services/bookService.js";
import ShopCategorySort from "./ShopCategorySort";
import ShopCategoryProducts from "./ShopCategoryProducts";
import "./ShopCategory.css";

export default function ShopCategory() {
  const [books, setBooks] = useState([]);
  const [itemsToShow, setItemsToShow] = useSessionStorage("itemsToShow", 15);
  const [totalBooks, setTotalBooks] = useState();
  const [category, setCategory] = useState();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

      const data = await getCategoriesList();
      setCategory(data);
    };
    fetchCount();
  }, []);

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 15);
  };

  useBeforeUnload(() => {
    sessionStorage.removeItem("itemsToShow");
  });

  const toggleDropdown = async () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = async (item) => {
    const data = await getBooksByCategory(itemsToShow, item);
    setBooks(data);
    setSelectedItem(item);
    setDropdownOpen(false);
  };

  const handleResetClick = async () => {
    const data = await getBooksList(itemsToShow);
    setBooks(data);
    setSelectedItem(null);
    setDropdownOpen(false);
  };

  return (
    <div className="shop-category">
      <ShopCategorySort
        itemsToShow={itemsToShow}
        totalBooks={totalBooks}
        isDropdownOpen={isDropdownOpen}
        selectedItem={selectedItem}
        toggleDropdown={toggleDropdown}
        handleResetClick={handleResetClick}
        category={category}
        handleItemClick={handleItemClick}
      />

      <ShopCategoryProducts books={books} />
      <div className="shopcategory-loadmore" onClick={handleShowMore}>
        Show more
      </div>
    </div>
  );
}
