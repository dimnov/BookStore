import "./AddProduct.css";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase.js";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [newBook, setNewBook] = useState({
    author: "",
    category: "",
    description: "",
    image: "",
    name: "",
    price: 1,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const booksCollectionRef = collection(db, "books");
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setNewBook((prevBook) => ({ ...prevBook, [field]: value }));
  };

  const onSubmitBook = async () => {
    if (Object.values(newBook).some((field) => !field)) {
      setErrorMessage("There is empty fields.");
      return;
    }

    try {
      await addDoc(booksCollectionRef, {
        ...newBook,

        userId: auth?.currentUser?.uid,
      });
      navigate("/shop");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-product">
      {Object.entries(newBook).map(([field, value]) => (
        <input
          key={field}
          className={`input input-${field}`}
          type="text"
          placeholder={field}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      ))}
      <p className="errorMessage">{errorMessage}</p>
      <button className="button-submit" onClick={onSubmitBook}>
        Submit
      </button>
    </div>
  );
}
