import "./styles.scss";

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdCalendarToday } from "react-icons/md";

import { MONTHS, BLANK_IMG } from "../../constants";
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

  const getPublishDate = (dateString) => {
    const date = new Date(dateString);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <section className={`book-detail ${ loading ? 'loading' : ''}`} style={{ backgroundColor: book && book.color ? book.color : 'white' }}>
      <div className="content-container">
        <div className="img-container">
          <img className="img" src={book ? book.img : BLANK_IMG} alt="" />
        </div>
        <div className="info">
          <div className="text">
            <p className="main-genre">{ book ? book.genres[0] : <br /> }</p>
            <h2 className="title">{ book ? book.title : <br /> }</h2>
            <p className="author">{ book ? book.author : <br /> }</p>
            <p className="date">
              { book ? <MdCalendarToday className="icon" /> : null }
              { book ? 'Published ' + getPublishDate(book.publish_date) : <br /> }
            </p>
          </div>
          <div className="genres">
            { book ?
              book.genres.map((genre, i) => <p key={i} className="genre-tag">{ genre }</p>) :
              null
            }
          </div>
        </div>
      </div>
    </section>
  );
}