import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import {json, Link} from "react-router-dom";
import "./styleCart.css";
import axios from "axios";
import { getCart, getBookInfo, changeCart } from "../../apiServices/CartService";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify'
import Form from 'react-bootstrap/Form';


const Cart = () => {

    const [checkedItems, setCheckedItems] = useState({});
  const accessToken = localStorage.getItem('accessToken');


  let bookData;
  let cnt = 0;
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

  const changeQuantity = (bookId, newQuantity) => {
    //console.log(bookId);
    if(newQuantity < 0 ) {
      toast.error("Số lượng sách trong giỏ không hợp lệ");
      return;
    }
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === bookId) {



        // Update the quantity for the specific item

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Update the state with the new cart items
    setCartItems(updatedCartItems);

    // Call the API to update the quantity in the backend
    changeCart(bookId, newQuantity)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

  };

  const deleteCart = (newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {


        changeCart(item.id, newQuantity)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        // Update the quantity for the specific item
        return { ...item, quantity: newQuantity };
    });
    setCartItems(updatedCartItems);


  }
    const loadCheckedItemsFromLocalStorage = async () => {
        try {
            // Fetch cart details
            await cartDetail();

            // Check if cartItems state has been updated

            // Load checked items from local storage
            const storedCheckedItems = localStorage.getItem("checkedItems");
            if (storedCheckedItems) {
                const parsedCheckedItems = JSON.parse(storedCheckedItems);
                setCheckedItems(parsedCheckedItems);

                // Recalculate total quantities and total price based on selected items
                const selectedItems = cartItems.filter((item) => parsedCheckedItems[item.id]);
                const totalQuantities = selectedItems.reduce((total, item) => total + item.quantity, 0);
                const totalPrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

                setTotalQuantities(totalQuantities);
                setTotalPrice(totalPrice);
            }
        } catch (error) {
            console.error("Error loading checked items:", error);
        }
    };

    useEffect(() => {
        loadCheckedItemsFromLocalStorage(); // Load checked items from local storage
    }, [cartItems]);
    const handleCheckboxChange = (itemId) => {
        setCheckedItems((prevCheckedItems) => {
            const newCheckedItems = { ...prevCheckedItems, [itemId]: !prevCheckedItems[itemId] };

            // Check if all individual checkboxes are unchecked
            const allUnchecked = cartItems.every((item) => !newCheckedItems[item.id]);

            // Update the "Select All" checkbox accordingly
            setCheckedItems((prevCheckedItems) => {
                const updatedCheckedItems = { ...prevCheckedItems, selectAll: !allUnchecked };

                // Save the updated checked items to localStorage
                localStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));

                // Recalculate total quantities and total price based on selected items
                const selectedItems = cartItems.filter((item) => updatedCheckedItems[item.id]);
                const totalQuantities = selectedItems.reduce((total, item) => total + item.quantity, 0);
                const totalPrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

                setTotalQuantities(totalQuantities);
                setTotalPrice(totalPrice);

                return updatedCheckedItems;
            });

            return newCheckedItems;
        });
    };



    useEffect(() => {
        const storedCheckedItems = localStorage.getItem('checkedItems');
        if (storedCheckedItems) {
            const parsedCheckedItems = JSON.parse(storedCheckedItems);
            setCheckedItems(parsedCheckedItems);

            // If you want to initialize other states based on the checked items, you can do it here.
        }
    }, []);

  return (
      <Fragment>


        {/* breadcrumb */}
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            <Fragment>
              <h3 className="cart-page-title">Giỏ hàng của bạn</h3>
              <div className="row center-tabl">
                <div className="col-12">
                  <div className="table-responsive cart-table-content " >
                      {cartItems.length === 0 ? (
                          <p>Chưa có sách trong giỏ hàng</p>
                      ) : (
                    <table>
                      <thead>
                      <tr>
                          <th>

                          </th>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tbody>
                      {cartItems.map((item, index) => (
                          <tr key={item.id}>
                              {/*<td className="product-checkbox">*/}
                              {/*    <Form>*/}
                              {/*        <div className="mb-3">*/}
                              {/*            <Form.Check // prettier-ignore*/}
                              {/*                type='checkbox'*/}
                              {/*                id=''*/}
                              {/*                className="custom-checkbox"*/}
                              {/*                checked={checkedItems[item.id]}*/}
                              {/*                onChange={() => changeQuantity(item.id, item.quantity)}*/}
                              {/*            />*/}
                              {/*        </div>*/}

                              {/*</Form>*/}
                              {/*</td>*/}
                              <td className="product-checkbox">
                                  <Form>
                                      <div className="mb-3">
                                          <Form.Check
                                              type='checkbox'
                                              id={item.id}
                                              className="custom-checkbox"
                                              checked={checkedItems[item.id]}
                                              onChange={() => handleCheckboxChange(item.id)}
                                          />
                                      </div>
                                  </Form>
                              </td>
                        <td className="product-thumbnail">
                          <Link
                              to={
                                  ''
                              }
                          >
                            <img
                                className="img-fluid"
                                src={
                                  item.imgUrl
                                }
                                alt=""
                            />
                          </Link>
                        </td>
                        <td className="product-name">
                          <Link
                              to={
                                  ''
                              }
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td className="product-price-cart">
                              <span className="amount">
                                {item.price}
                              </span>
                        </td>
                        <td className="product-quantity">
                          <div className="cart-plus-minus">
                            <button
                                className="dec qtybutton"
                                onClick={() => changeQuantity(item.id, item.quantity - 1)}

                            >
                              -
                            </button>

                            <input
                                className="cart-plus-minus-box"
                                type="text"
                                value= {item.quantity}
                                readOnly
                            />
                            <button
                                className="inc qtybutton"
                                onClick={() => changeQuantity(item.id, item.quantity + 1)}

                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="product-subtotal">
                          {item.quantity * item.price}
                        </td>
                        <td className="product-remove">
                          <button onClick={() => changeQuantity(item.id, 0)}>
                            <i className="fa fa-times"></i>

                          </button>
                        </td>
                      </tr>
                      ))}

                      </tbody>
                    </table>
                          )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-shiping-update-wrapper">
                    <div className="cart-shiping-update">
                      <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                      >
                        Tiếp tục mua hàng
                      </Link>
                    </div>
                    <div className="cart-clear">
                      <button onClick={() => deleteCart(0)}>
                        Xoá giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">



                <div className="col-lg-3 col-md-12">
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Tổng giỏ hàng
                      </h4>
                    </div>
                    <h5>
                      Tổng số lượng sản phầm{" "}
                      <span>
                          {totalQuantities}
                        </span>
                    </h5>

                    <h4 className="grand-totall-title">
                      Tổng tiền{" "}
                      <span>
                          {totalPrice}
                        </span>
                    </h4>
                    <Link to={process.env.PUBLIC_URL + "/checkout"}>
                      Thanh toán
                    </Link>
                  </div>
                </div>
              </div>
            </Fragment>

          </div>
        </div>
        <ToastContainer />

      </Fragment>
  );
}

export default Cart