import "./styles.scss";

import { useState, useEffect, useContext } from "react";

import { processBookApiData } from "../../formatters";
import BookContext from "../../context/BookContext";

import BookCard from "../../components/BookCard";

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
      const fBookApiData = await processBookApiData(bookApiData);

      setBooks(fBookApiData);
      bookContext.initializeBooks(fBookApiData);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadingElements = () => {
    const bookCards = [];
    for (let i = 0; i < 4; i ++) {
      bookCards.push(<BookCard key={i}/>);
    }

    return bookCards;
  }

  return (
    <>
      <section className="card-container">
        { loading ?
          loadingElements() :
          books.map(book =>
            <BookCard
              key={book.id}
              book={book}
            />
          )
        }
      </section>
    </>
  );
}