import "./styles.scss";

import { useState, useEffect, useContext } from "react";
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
    // formats as: "/:idValue"
    const idFromName = apiItem.name.match(/\/[A-Za-z0-9]+$/)[0];

    return {
      id: idFromName.substring(1),
      ...apiItem.fields
    };
  }

  const loadingElements = () => {
    const bookCards = [];
    for (let i = 0; i < 4; i ++) {
      bookCards.push(<BookCard key={i}/>);
    }

    return bookCards;
  }

  return (
    <>
      <h1>Home</h1>
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