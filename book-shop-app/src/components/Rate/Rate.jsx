import React, {useEffect, useState} from 'react';
import "./styleRate.css";
import { Container, Row, Col, Card, Button, Tab, Tabs } from "react-bootstrap";
import SuccessPopup from './SuccessPopup';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify'
import {useLocation, useParams} from 'react-router-dom';
import {getOrderById} from "../../apiServices/OrderManagementService";

const ProductRating = () => {
    const accessToken = localStorage.getItem('accessToken');
    const bookId = 18;
    const review = "";
    const { orderId } = useParams(); // Get orderId from URL parameters
    const [orders, setOrders] = useState([]);
    const [bookInfoList, setBookInfoList] = useState([]);
    const [ratings, setRatings] = useState({});

    const [rating, setRating] = useState(0);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleRatingChange = (bookId, newRating) => {
        setRatings((prevRatings) => {
            // Create a new object by copying the previous ratings
            const newRatings = { ...prevRatings };
            // Update the rating for the specific book
            newRatings[bookId] = newRating;
            // Return the new ratings object
            return newRatings;
        });
    };

    const handleReviewSubmit = () => {
        // Iterate over each book and submit its rating
        bookInfoList.forEach(book => {
            const bookId = book.bookId; // Update with the actual property for book ID
            const bookRating = ratings[bookId] || 0; // Default to 0 if no rating is provided

            axios.post('http://fall2324w3g8.int3306.freeddns.org/api/book/review', { bookId, point: bookRating, review }, { headers: { 'Authorization': 'Bearer ' + accessToken } })
                .then((response) => {
                    toast.success("Đánh giá thành công", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setShowSuccessPopup(true);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Đã từng đánh giá");
                });
        });
    };
    const location = useLocation();
    const getOrderDetail = (orderId) => {
        getOrderById(orderId)
            .then(response => {
                setOrders(response.data);
                // Extract book information from the order detail
                const bookQuantitySummaries = response.data.orderSummaries[0].bookQuantitySummaries;
                // Update the state with the list of books
                setBookInfoList(bookQuantitySummaries.map(bookQuantitySummary => bookQuantitySummary.bookSummary));
                setOrders(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get('orderId');
        getOrderDetail(orderId);
    }, [location.search]);
    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    return (
        <div>
            <Row>
                <h2>Đánh giá sản phẩm</h2>
                <p>Đánh giá của bạn: {rating} sao</p>
            </Row>
            {bookInfoList.map((book, index) => (
                <Row key={index}>
                    <Col sm={4}>
                        <img
                            src={book.imgUrl.replace('public/', '')}
                            className="img-fluid w-25 mx-auto"
                        />
                    </Col>
                    <Col sm={4}>
                        <div className="content-container">
                            <h5>Sách: {book.title}</h5>
                            <span>{book.price}</span>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="star-rating-container">
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={star <= (ratings[book.id] || 0) ? "star-filled" : "star-empty"}
                                        onClick={() => handleRatingChange(book.id, star)}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            ))}

            <Row>
                <Col sm={4}></Col>
                <Col sm={4}>

                    <button className="cart-btn-2" type="submit" onClick={handleReviewSubmit}>
                        Gửi đánh giá
                    </button>

                    {showSuccessPopup && (
                        <SuccessPopup onClose={closeSuccessPopup} />
                    )}
                </Col>

                <Col sm={4}></Col>

            </Row>

            <ToastContainer />
        </div>
    );
};

export default ProductRating;
