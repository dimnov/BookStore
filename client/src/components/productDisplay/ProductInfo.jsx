export default function ProductInfo({ product }) {
  return (
    <>
      <h1>{product.name}</h1>
      <div className="productdisplay-right-prices">
        <div className="productdisplay-right-price-new">${product.price}</div>
      </div>
      <div className="productdisplay-right-description">
        {product.description}
      </div>
    </>
  );
}
