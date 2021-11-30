import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./normalize.css";
import "./App.scss";

import MainNav from "./components/MainNav";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Footer from "./components/Footer";


export default function App() {
  return (
    <Router>
      <MainNav />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}