import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../../components/Breadcrums/Breadcrum.jsx";
import ProductDisplay from "../../components/productDisplay/ProductDisplay.jsx";
import CommentsBox from "../../components/commentsBox/CommentsBox.jsx";
import RelatedProducts from "../../components/relatedProducts/RelatedProducts.jsx";
import { getBookById } from "../../services/bookService.js";

export default function Product() {
  const [book, setBooks] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const productData = await getBookById(productId);
      setBooks(productData);
    };

    fetchData();
  }, [productId]);

  return (
    <div>
      <Breadcrum product={book} />
      <ProductDisplay product={book} id={productId} />
      <CommentsBox bookId={productId} />
      <RelatedProducts product={book} />
    </div>
  );
}
