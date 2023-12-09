import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import Item from "../../components/item/Item.jsx";
import { getUserFavoriteBooks } from "../../services/favoriteService.js";
import "./Favorite.css";

export default function Favorite() {
  const [books, setBooks] = useState();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser?.uid) {
          const favoriteBooks = await getUserFavoriteBooks(currentUser.uid);
          setBooks(favoriteBooks);
        }
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      }
    };

    fetchData();
  }, [currentUser?.uid]);

  return (
    <div className="favorite">
      {books?.length > 0 ? (
        <>
          <h2 className="header">Your favorite books:</h2>
          <div className="shopcategory-products">
            {books?.map((item, i) => {
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
        </>
      ) : (
        <h2 className="header">No books added.</h2>
      )}
    </div>
  );
}
