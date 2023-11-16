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

export {AddBook}