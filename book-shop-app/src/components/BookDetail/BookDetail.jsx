import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css'; // Đảm bảo bạn đã cập nhật file CSS này

const BookDetail = () => {
    const { bookId } = useParams();
    const [bookDetail, setBookDetail] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/book/detail/${bookId}`)
            .then(response => {
                setBookDetail(response.data);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, [bookId]);

    if (!bookDetail) {
        return <div>Loading...</div>;
    }

    // Chuẩn bị thông tin tác giả, năm xuất bản và thể loại
    const authors = bookDetail.authors.map(a => a.authorName).join(', ');
    const publicationYear = new Date(bookDetail.publication_date).getFullYear();
    const genres = bookDetail.genres.map(g => g.genreName).join(', ');

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
                    <p className="reviews-count">Đánh giá: {bookDetail.stockQuantity} lượt</p>
                    <div className="add-to-cart">
                        <button>Thêm vào giỏ hàng</button>
                    </div>
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
