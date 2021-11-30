import "./styles.scss";

import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";


export default function BookCard({
  book = null,
}) {
  const blankImg = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  return (
    <Link className={`book-card ${ !book ? 'disabled' : '' }`} to={ `/book/${book ? book.id : '' }`}>
      <div className="book-card-wrapper" style={{ backgroundColor: book && book.color ? book.color : '' }}>
        <div className="img-wrapper" style={{ backgroundColor: book &&  book.color ? book.color : '' }}>
          <img className="img" src={ book ? book.img : blankImg } alt="" />
        </div>
        <div className="info">
          <p className="genre">{ book ? book.genres[0] : <br /> }</p>
          <h2 className="title">{ book ? book.title : <br /> }</h2>
          <p className="author">{ book ? book.author : <br /> }</p>
          <button className="arrow"><BsFillArrowRightCircleFill className="icon" /></button>
        </div>
      </div>
    </Link>
  );
}