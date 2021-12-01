import "./styles.scss";

import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { BLANK_IMG } from "../../constants";


export default function BookCard({
  book = null,
}) {
  return (
    <Link className={`book-card ${ !book ? 'disabled' : '' }`} to={ `/book/${book ? book.id : '' }`}>
      <div className="book-card-wrapper" style={{ backgroundColor: book && book.color ? book.color : '' }}>
        <div className="img-wrapper" style={{ backgroundColor: book &&  book.color ? book.color : '' }}>
          <img className="img" src={ book ? book.img : BLANK_IMG } alt="" />
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