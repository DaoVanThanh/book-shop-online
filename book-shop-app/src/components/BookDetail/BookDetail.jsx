import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const BookDetail = () => {
    const { bookId } = useParams();
    const [bookDetail, setBookDetail] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAdded } = true;
    const navigate = useNavigate();

    const incrementQuantity = () => {
        if (quantity < bookDetail.stockQuantity)
            setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/book/detail/${bookId}`)
            .then(response => {
                setBookDetail(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
                setError(error);
                setLoading(false);
            });
    }, [bookId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Đã có lỗi xảy ra khi tải thông tin sách.</div>;
    }

    const authors = bookDetail.authors.map(a => a.authorName).join(', ');
    const publicationYear = new Date(bookDetail.publication_date).getFullYear();
    const genres = bookDetail.genres.map(g => g.genreName).join(', ');

    const addToCart = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.put('http://localhost:8080/api/user/orm/carts/book', {
                bookId,
                quantity,
                isAdded: true
            }, {
                headers: {
                    'Authorization':`Bearer ${accessToken}`
                }
            });
            toast.success("Thêm vào giỏ hàng thành công", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
            navigate("/shop");
        } catch (error) {
            console.error('Error updating cart:', error);
            toast.success("Bạn cần phải đăng nhập để mua sản update !", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }
    };

    return (
        <div className="book-detail-container">
            <div className="book-detail-image">
                <img src={bookDetail.imgUrl.replace('/public', '')} alt={bookDetail.title} />
                <div className="book-detail-info">
                    <h1>{bookDetail.title}</h1>
                    <p className="price">{bookDetail.price.toLocaleString()}đ</p>
                    <p className="author">Tác giả: {authors}</p>
                    <p className="publication-year">Năm xuất bản: {publicationYear}</p>
                    <p className="genre">Thể loại: {genres}</p>
                    <p className="stock-quantity">
                        Số lượng sẵn có: {bookDetail.stockQuantity > 0 ? `${bookDetail.stockQuantity} sách` : <span style={{ color: 'red' }}>Hết hàng</span>}
                    </p>

                    {bookDetail.stockQuantity > 0 ? (
                        <>
                            <div className="quantity-controls">
                                <button
                                    onClick={decrementQuantity}
                                    disabled={quantity === 1}
                                    aria-label="Giảm số lượng"
                                >-</button>
                                <span>{quantity}</span>
                                <button
                                    onClick={incrementQuantity}
                                    disabled={bookDetail.stockQuantity === 0}
                                    aria-label="Tăng số lượng"
                                >+</button>
                            </div>
                            <div className="add-to-cart">
                                <button onClick={addToCart}>Thêm vào giỏ hàng</button>
                            </div>
                        </>
                    ) : (
                        <p style={{ color: 'red', fontWeight: 'bold' }}></p>
                    )}

                </div>
            </div>
            <div className="description">
                <h3>Giới thiệu về sách</h3>
                <p>{bookDetail.description}</p>
            </div>
        </div>
    );
};

export default BookDetail;
