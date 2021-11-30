import "./styles.scss";

import { Link } from "react-router-dom";
import { ImBooks } from "react-icons/im";

export default function MainNav() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="home-link" >
          <ImBooks className="icon" /><h1>Books!</h1>
        </Link>
      </div>
    </nav>
  );
}