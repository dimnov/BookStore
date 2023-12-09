import Item from "../../components/item/Item.jsx";

const ShopCategoryProducts = ({ books }) => (
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
);

export default ShopCategoryProducts;
