import { instance } from "../CustomAxios";

const AddBook = async (
  title,
  description,
  price,
  publication_date,
  stockQuantity,
  imgUrl,
  author_names,
  genre_names
) => {
  return await instance.post("api/admin/book/add", {
    title: title,
    description: description,
    price: price,
    publication_date: publication_date,
    stockQuantity: stockQuantity,
    imgUrl: imgUrl,
    author_names: author_names,
    genre_names: genre_names,
  });
};

const searchBook = async (key, page, size) => {
  return await instance.get("/api/book/search", {
    params: {
      key: key,
      page: page,
      size: size,
    },
  });
};

const getBookDetail = async (bookId) => {
  return await instance.get(`/api/book/detail/${bookId}`);
};

const updateBook = async (
  bookId,
  title,
  description,
  price,
  publication_date,
  stockQuantity,
  imgUrl,
  author_names,
  genre_names
) => {
  return await instance.put("/api/admin/book/update", {
    bookId: bookId,
    title: title,
    description: description,
    price: price,
    publication_date: publication_date,
    stockQuantity: stockQuantity,
    imgUrl: imgUrl,
    author_names: author_names,
    genre_names: genre_names,
  });
};

export { AddBook, searchBook, getBookDetail, updateBook };
