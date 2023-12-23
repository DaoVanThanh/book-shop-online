import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import "./styleCheckout.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import {getCart, getBookInfo, changeCart} from "../../apiServices/CartService";
import {getUserInfo} from "../../apiServices/CheckoutService"
import {formatVND} from "../../common";
const Checkout = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        email: ''
    });

    const { fullName, address, phoneNumber, email } = userInfo;
    const bookId = 1;
    const quantity = 1;
    const accessToken = localStorage.getItem('accessToken');
    const orderData = {
        deliveryAddress: address,

        bookQuantities: [

            {
                bookId: bookId,
                quantity: quantity
            }
        ]
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const returnShop = () => {
        navigate("/shop");

    }

    const createOrder = () =>
    {

        if (cartItems.length === 0) {
            toast.error("Giỏ hàng của bạn đang trống");
            return;
        }
        const bookQuantities = cartItems.map(item => ({
            bookId: item.id,
            quantity: item.quantity,

        }
        ));
        cartItems.forEach(item => {
            changeCart(item.id, 0).then(response => {

            }).catch((error) => {
                console.log(error)
            });

        });
        // Update orderData with the dynamically generated bookQuantities
        const updatedOrderData = {
            ...orderData,
            bookQuantities: bookQuantities,
        };
        axios.post('http://localhost:8080/api/user/orm/orders/create', updatedOrderData, {headers : {'Authorization': 'Bearer '+ accessToken}}).then(()=>{
            handleShow();


            toast.success("Đặt hàng thành công");
        }).catch((error) => {
            console.error("Error creating order:", error);
        });
    }
    const cartDetail = () => {
        getCart()
            .then((response) => {
                const bookData = response.data.bookQuantities;
                const promises = bookData.map((book) =>
                    getBookInfo(book.bookId)
                        .then((responseBook) => {
                            const bookInfo = {
                                id: book.bookId,
                                title: responseBook.data.title,
                                price: responseBook.data.price,
                                imgUrl: responseBook.data.imgUrl.replace('public/', ''),
                                quantity: book.quantity,
                            };

                            return bookInfo;
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                );

                Promise.all(promises)
                    .then((bookInfoArray) => {

                        setCartItems(bookInfoArray);
                        const storedCheckedItems = localStorage.getItem("checkedItems");
                        if (storedCheckedItems) {
                            const parsedCheckedItems = JSON.parse(storedCheckedItems);
                            const filteredBookInfoArray = bookInfoArray.filter((item) => parsedCheckedItems[item.id] === true);
                            console.log(parsedCheckedItems)
                            console.log(filteredBookInfoArray);
                            const totalPrice = filteredBookInfoArray.reduce((total, item) => total + item.price * item.quantity, 0);
                            setCartItems(filteredBookInfoArray);
                            setTotalPrice(totalPrice);
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateUserInfo = (user) => {
        setUserInfo({
            fullName: user.fullName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            email: user.email
        });
    };
    const getInfo = () => {
        getUserInfo().then(response => {
            console.log(response.data);
            updateUserInfo(response.data);
        }).catch(error => {
            console.error("Error getting user info:", error);
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };
    useEffect(() => {
        cartDetail();
        getInfo();
    }, []);
    return (
        <Fragment>


            <div className="checkout-area pt-95 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <form className="billing-info-wrap rounded shadow p-5">
                                <h3>Thông tin đặt hàng</h3>

                                <div className="billing-info mb-20 form-group">
                                    <label>Tên đầy đủ</label>
                                    <input type="text" className="form-control" value={fullName || ''}
                                           onChange={handleChange}
                                    />
                                </div>



                                <div className="billing-info mb-20 form-group">
                                    <label>Địa chỉ</label>
                                    <input type="text" className="form-control" value={address || ''}
                                           onChange={handleChange}
                                    />
                                </div>

                                <div className="billing-info mb-20 form-group">
                                    <label>Số điện thoại</label>
                                    <input type="text" className="form-control" value={phoneNumber || ''}
                                           onChange={handleChange}
                                    />
                                </div>

                                <div className="billing-info mb-20 form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" value={email || ''}
                                           onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <h4>Thông tin bổ sung</h4>
                                    <div className="additional-info form-group">
                                        <label>Ghi chú</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Ghi chú cho cửa hàng và đơn vị vận chuyển "
                                            name="message"
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </form>


                        </div>

                        <div className="col-lg-5">
                            <div className="your-order-area">
                                <h3> Đơn hàng của bạn </h3>
                                <div className="your-order-wrap gray-bg-4">
                                    <div className="your-order-product-info">
                                        <div className="your-order-top">
                                            <ul>
                                                <li>Sản phẩm</li>
                                                <li>Đơn giá</li>
                                            </ul>
                                        </div>
                                        <div className="your-order-middle">
                                            {cartItems.map((item, index) => (
                                                <ul key={item.id}>
                                                    <li>
                <span className="order-middle-left">
                    {item.title}
                </span>{" "}
                                                        <span className="order-price">
                    {formatVND(item.quantity * item.price)}
                </span>
                                                    </li>
                                                    <li>
                                                        <span style={{ fontStyle: 'italic' }}>
                                                            SL: {item.quantity}
                                                        </span>
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                        <div className="your-order-bottom">
                                            <ul>
                                                <li className="your-order-shipping">Phí vận chuyển</li>
                                                <li>Miễn phí</li>
                                            </ul>
                                        </div>
                                        <div className="your-order-total">
                                            <ul>
                                                <li className="order-total">Tổng</li>
                                                <li>
                                                    {formatVND(totalPrice)}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="payment-method"></div>
                                </div>
                                <div className="place-order mt-25">
                                    <button className="btn-hover" onClick={createOrder}>Đặt hàng</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="d-block modal-header-custom">
                    <Modal.Title>Đặt hàng thành công!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">Cảm ơn bạn đã tin tưởng sử dụng dịch vụ và sản phẩm của chúng tôi</Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <button className="cart-btn-2" onClick={returnShop}>Trở về</button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </Fragment>

    )
}

export default Checkout