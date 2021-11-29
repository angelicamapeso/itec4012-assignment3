import "./styles.scss";

import { useParams } from "react-router-dom";

export default function BookDetail() {
  const { bookId } = useParams();

  return (
    <h1>Book Detail: {bookId}</h1>
  );
}