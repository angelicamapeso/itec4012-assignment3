import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./normalize.css";
import "./App.scss";

import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";


export default function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
        </Routes>
      </main>
    </Router>
  );
}