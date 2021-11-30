import { average } from "color.js";

export const processBookApiData = async (apiData) => {
  if (apiData.documents) {
    const fBookApiData = apiData.documents.map(item => formatBookApiData(item));
    const fBooksWithColor = await Promise.all(fBookApiData.map(book => setBookColor(book)));
    return fBooksWithColor;
  } else {
    const fSingleBookData = formatBookApiData(apiData);
    const fSingleBookWithColor = await setBookColor(fSingleBookData);
    return fSingleBookWithColor;
  }
}

const formatBookApiData = (apiItem) => {
  // formats as: "/:idValue"
  const idFromName = apiItem.name.match(/\/[A-Za-z0-9]+$/)[0];
  const { genres, author, publish_date, img, title } = apiItem.fields;

  return {
    id: idFromName.substring(1),
    genres: genres.arrayValue.values.map(genreValue => genreValue.stringValue),
    author: author.stringValue,
    publish_date: publish_date.timestampValue,
    img: img.stringValue,
    title: title.stringValue,
  };
}

const setBookColor = async (book) => {
  const fBook = { ...book }
  const color = await average(book.img, { format: 'hex' });
  fBook.color = color;
  return fBook;
}