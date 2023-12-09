import dropdown_icon from "../../Assets/dropdown_icon.png";

const ShopCategorySort = ({
  itemsToShow,
  totalBooks,
  isDropdownOpen,
  selectedItem,
  toggleDropdown,
  handleResetClick,
  category,
  handleItemClick,
}) => (
  <div className="shopcategory-indexSort">
    <p>
      <span>
        Showing 1-{itemsToShow > totalBooks ? totalBooks : itemsToShow}
      </span>{" "}
      out of {totalBooks} products
    </p>
    <div>
      <div className="shopcategory-sort " onClick={toggleDropdown}>
        {selectedItem || "Categories"} <img src={dropdown_icon} alt="" />
      </div>
      {isDropdownOpen && (
        <ul className="category-list">
          <li onClick={handleResetClick}>Reset</li>
          {category.map((item) => (
            <li key={item} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default ShopCategorySort;
