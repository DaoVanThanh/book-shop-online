import React, { useState } from 'react';
import "./styleRate.css";
import { Container, Row, Col, Card, Button, Tab, Tabs } from "react-bootstrap";
import SuccessPopup from './SuccessPopup';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify'

const ProductRating = () => {
    const accessToken = localStorage.getItem('accessToken');
    const bookId = 18;
    const review = "";

    const [rating, setRating] = useState(0);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewSubmit = () => {
        axios.post('http://localhost:8080/api/book/review', {bookId,point: rating, review}, {headers : {'Authorization': 'Bearer '+ accessToken}}).then((response)=>{
            toast.success("Đánh giá thành công", {
                position: toast.POSITION.TOP_RIGHT,
            });
            setShowSuccessPopup(true);

        }).catch((error) => {
            toast.error("Đã từng đánh giá");

        })
    };

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    return (
        <div>
            <Row>
                <h2>Đánh giá sản phẩm</h2>
                <p>Đánh giá của bạn: {rating} sao</p>
            </Row>
            <Row>
                <Col sm={4}>
                    <img
                        src="/caycamngotcuatoi.jpeg"
                        className="img-fluid w-25 mx-auto"
                    />
                </Col>
                <Col sm={4}>
                    <div className="content-container">
                        <h5>Sách: Cây cam ngọt của tôi</h5>
                        <span>100.000vnđ</span>
                    </div>

                </Col>
                <Col sm={4}>
                    <div className="star-rating-container">
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={star <= rating ? "star-filled" : "star-empty"}
                                    onClick={() => handleRatingChange(star)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
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
