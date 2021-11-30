import "./styles.scss";

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { processBookApiData } from "../../formatters";
import BookContext from "../../context/BookContext";

export default function BookDetail() {
  const { bookId } = useParams();
  const bookContext = useContext(BookContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBookData();
  }, []);

  const setBookData = async () => {
    try {
      const bookFromContext = bookContext.getBook(bookId);

      if (bookFromContext) {
        setBook(bookFromContext);
      } else {
        const bookApiReq = await fetch(`https://firestore.googleapis.com/v1/projects/books-f29dc/databases/(default)/documents/books/${bookId}`);
        const bookApiData = await bookApiReq.json();
        const fBook = await processBookApiData(bookApiData);
        setBook(fBook);
      }

    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <h2>Book Detail: {book ? book.title : ''}</h2>
  );
}