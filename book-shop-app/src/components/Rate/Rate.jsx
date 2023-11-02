import React, { useState } from 'react';
import "./styleRate.css";
import { Container, Row, Col, Card, Button, Tab, Tabs } from "react-bootstrap";
import SuccessPopup from './SuccessPopup'; // Import thành phần popup

const ProductRating = () => {
    const [rating, setRating] = useState(0);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewSubmit = () => {
        setShowSuccessPopup(true);
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


        </div>
    );
};

export default ProductRating;
