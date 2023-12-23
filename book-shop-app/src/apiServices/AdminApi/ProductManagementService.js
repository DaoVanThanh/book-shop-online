import { instance } from "../CustomAxios";
import { instanceNotAuth } from "../AxiosWithOutAuth";

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

const getBestSellerBooks = async (size) => {
  return await instanceNotAuth.get("/api/book/bestSeller", {
    params: {
      page: 0,
      size: size,
    }
  });
};

const getNewBooks = async (size) => {
  return await instanceNotAuth.get("/api/book/new", {
    params: {
      page: 0,
      size: size,
    }
  });
};

const getFamousAuthors = async (size) => {
  return await instanceNotAuth.get("/api/book/famousAuthor", {
    params: {
      page: 0,
      size: size,
    }
  });
};


export { AddBook, searchBook, getBookDetail, updateBook, getBestSellerBooks, getFamousAuthors, getNewBooks };
