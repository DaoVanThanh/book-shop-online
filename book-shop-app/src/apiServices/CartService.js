import { instance } from "./CustomAxios";

const getCart = async () => {
    return await instance.get("api/user/orm/cartdetail");
};
const getBookInfo = async (bookId) => {
    return await instance.get(`api/book/detail/${bookId}`);
}
const changeCart = async(bookId, quantity) => {
    return await instance.put('/api/user/orm/carts/book', {
        bookId: bookId,
        quantity: quantity
    })
}

export {getCart, getBookInfo, changeCart}