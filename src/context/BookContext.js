import React, { useState } from "react";

const BookContext = React.createContext({
  books: [],
  initializeBooks: () => { },
  getBook: () => { },
});

export const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const initializeBooks = (bookApiData) => {
    setBooks(bookApiData);
  }

  const getBook = (id) => {
    if (books.length > 0) {
      const foundBook = books.find((book) => book.id === id);

      if (!foundBook) {
        return null;
      } else {
        return foundBook
      }
    }

    return null;
  }

  return (
    <BookContext.Provider
      value={{
        books,
        initializeBooks,
        getBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export default BookContext;