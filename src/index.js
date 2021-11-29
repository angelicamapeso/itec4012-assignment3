import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./normalize.css";
import "./index.scss";

import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
        </Routes>
      </main>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
