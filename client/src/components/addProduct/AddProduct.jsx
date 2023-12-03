import { useState } from "react";

import { addDoc, collection } from "firebase/firestore";

import "./AddProduct.css";
import { db, auth } from "../../config/firebase.js";

export default function AddProduct() {
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookCategory, setNewBookCategory] = useState("");
  const [newBookDescription, setNewBookDescription] = useState("");
  const [newBookName, setNewBookName] = useState("");
  const [newBookImage, setNewBookImage] = useState("");
  const [newBookPrice, setNewBookPrice] = useState(0);

  const booksCollectionRef = collection(db, "books");

  const onSubmitBook = async () => {
    try {
      await addDoc(booksCollectionRef, {
        author: newBookAuthor,
        category: newBookCategory,
        description: newBookDescription,
        image: newBookImage,
        name: newBookName,
        price: newBookPrice,

        // that is also for the comments
        userId: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-product">
      <input
        className="input input-author"
        type="text"
        name=""
        id=""
        placeholder="author"
        onChange={(e) => setNewBookAuthor(e.target.value)}
      />
      <input
        className="input input-category"
        type="text"
        name=""
        id=""
        placeholder="category"
        onChange={(e) => setNewBookCategory(e.target.value)}
      />
      <input
        className="input input-description"
        type="text"
        name=""
        id=""
        placeholder="description"
        onChange={(e) => setNewBookDescription(e.target.value)}
      />
      <input
        className="input input-img"
        type="text"
        name=""
        id=""
        placeholder="img"
        onChange={(e) => setNewBookImage(e.target.value)}
      />
      <input
        className="input input-name"
        type="text"
        name=""
        id=""
        placeholder="name"
        onChange={(e) => setNewBookName(e.target.value)}
      />
      <input
        className="input input-price"
        type="text"
        name=""
        id=""
        placeholder="price"
        onChange={(e) => setNewBookPrice(Number(e.target.value))}
      />

      <button className="button-submit" onClick={() => onSubmitBook()}>
        Submit
      </button>
    </div>
  );
}
