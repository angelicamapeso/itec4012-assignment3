import "./styles.scss";

import { AiFillDatabase, AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <a href="https://firestore.googleapis.com/v1/projects/books-f29dc/databases/(default)/documents/books/">
          <AiFillDatabase className="icon" />Checkout the raw data!
        </a>
        <a href="https://github.com/angelicamapeso/itec4012-assignment3">
          <AiFillGithub className="icon" />Github
        </a>
      </div>
    </footer>
  );
}