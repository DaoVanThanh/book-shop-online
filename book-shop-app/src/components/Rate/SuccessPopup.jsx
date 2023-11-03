import React from 'react';
import "./styleRate.css";

const SuccessPopup = ({ onClose }) => {
    return (
        <div className="success-popup">
            <div className="success-popup-content">
                <h3>Đánh giá thành công!</h3>
                <p>Cảm ơn bạn đã đánh giá sản phẩm.</p>
                <button className="cart-btn-2" >Trở về</button>
            </div>
        </div>
    );
};

export default SuccessPopup;
