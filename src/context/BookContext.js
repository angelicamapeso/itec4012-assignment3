import React, { useState } from "react";

const BookContext = React.createContext({
  books: [],
  initializeBooks: () => { },
});

export const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const initializeBooks = (bookApiData) => {
    setBooks(bookApiData);
  }

  return (
    <BookContext.Provider
      value={{
        books,
        initializeBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export default BookContext;