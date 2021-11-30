import "./styles.scss";
import { MONTHS } from "../../constants";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { average } from "color.js";

export default function BookCard({
  book = null,
}) {
  const [fBook, setFBook] = useState(null);
  const [bookColor, setBookColor] = useState("");
  const blankImg = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const processedBook = processBookObj(book);
    setFBook(processedBook);

    if (processedBook) {
      const color = await average(processedBook.img, { format: 'hex' });
      setBookColor(color);
    }
  }

  const processBookObj = (bookProp) => {
    if (bookProp) {
      const { genres, author, publish_date, img, title } = bookProp;

      return {
        id: bookProp.id,
        genres: genres.arrayValue.values.map(genreValue => genreValue.stringValue),
        author: author.stringValue,
        publish_date: publish_date.timestampValue,
        img: img.stringValue,
        title: title.stringValue,
      }
    }

    return null;
  }

  const getPublishDateString = (dateString) => {
    const date = new Date(dateString);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`
  }

  return (
    <Link className={`book-card ${ !fBook ? 'disabled' : '' }`} to={ `/books/${fBook ? fBook.id : '' }`}>
      <div className="book-card-wrapper" style={{ backgroundImage: fBook ? `url(${fBook.img})` : 'none' }}>
        <div className="img-wrapper" style={{ backgroundColor: bookColor ? bookColor : '' }}>
          <img className="img" src={ fBook ? fBook.img : blankImg } alt="" />
        </div>
        <div className="info">
          <h2 className="title">{ fBook ? fBook.title : <br /> }</h2>
          <p className="author">{ fBook ? fBook.author : <br /> }</p>
          <p className="date">{ fBook ? 'Published ' + getPublishDateString(fBook.publish_date) : <br /> }</p>
        </div>
      </div>
    </Link>
  );
}