import "./styles.scss";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

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

  return (
    <Link className={`book-card ${ !fBook ? 'disabled' : '' }`} to={ `/books/${fBook ? fBook.id : '' }`}>
      <div className="book-card-wrapper" style={{ backgroundColor: bookColor ? bookColor : '' }}>
        <div className="img-wrapper" style={{ backgroundColor: bookColor ? bookColor : '' }}>
          <img className="img" src={ fBook ? fBook.img : blankImg } alt="" />
        </div>
        <div className="info">
          <p className="genre">{ fBook ? fBook.genres[0] : <br /> }</p>
          <h2 className="title">{ fBook ? fBook.title : <br /> }</h2>
          <p className="author">{ fBook ? fBook.author : <br /> }</p>
          <button className="arrow"><BsFillArrowRightCircleFill className="icon" /></button>
        </div>
      </div>
    </Link>
  );
}