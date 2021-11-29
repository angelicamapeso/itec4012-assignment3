import "./styles.scss";

import { useState, useEffect, useContext } from "react";
import BookContext from "../../context/BookContext";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const bookContext = useContext(BookContext);

  useEffect(() => {
    getBookApiData();
  }, []);

  const getBookApiData = async () => {
    try {
      const bookApiReq = await fetch('https://firestore.googleapis.com/v1/projects/books-f29dc/databases/(default)/documents/books/');
      const bookApiData = await bookApiReq.json();
      const fBookApiData = bookApiData.documents.map(item => formatBookApiData(item));

      setBooks(fBookApiData);
      bookContext.initializeBooks(fBookApiData);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatBookApiData = (apiItem) => {
    return apiItem.fields;
  }

  return (
    <h1>Home</h1>
  );
}