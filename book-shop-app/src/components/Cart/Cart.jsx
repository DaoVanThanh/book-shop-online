import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import "../../assets/scss/style.scss";
import {alignPropType} from "react-bootstrap/types";
let quantityCount = 1;
let cartTotalPrice = 0;
const Cart = () => {
  return (
      <Fragment>
        <MetaTags>
          <title>Giỏ hàng</title>
          <meta
              name="description"
              content="Cart page of flone react minimalist eCommerce template."
          />
        </MetaTags>

        {/* breadcrumb */}
        <LayoutOne headerTop="visible">
        <div className="cart-main-area pt-90 pb-100">
            <div className="container">
                  <Fragment>
                    <h3 className="cart-page-title">Giỏ hàng của bạn</h3>
                    <div className="row center-tabl">
                      <div className="col-12">
                        <div className="table-responsive cart-table-content" >
                          <table>
                            <thead>
                            <tr>
                              <th>Ảnh</th>
                              <th>Tên sản phẩm</th>
                              <th>Giá</th>
                              <th>Số lượng</th>
                              <th>Tổng</th>
                              <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td className="product-thumbnail">
                              <Link
                                  to={
                                      process.env.PUBLIC_URL +
                                      "/product/" + 'caycamngotcuatoi'
                                  }
                              >
                                <img
                                    className="img-fluid"
                                    src={
                                        'caycamngotcuatoi.jpeg'
                                    }
                                    alt=""
                                />
                              </Link>
                            </td>
                              <td className="product-name">
                                <Link
                                    to={
                                        process.env.PUBLIC_URL +
                                        "/product/" +
                                        '/caycamngotcuatoi'
                                    }
                                >
                                Cây cam ngọt của tôi
                            </Link>
                              </td>
                            <td className="product-price-cart">
                              <span className="amount">
                                100.000 vnđ
                              </span>
                            </td>
                              <td className="product-quantity">
                                <div className="cart-plus-minus">
                                  <button
                                      className="dec qtybutton"

                                  >
                                    -
                                  </button>
                                  <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value= '1'
                                      readOnly
                                  />
                                  <button
                                      className="inc qtybutton"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                100.000vnđ
                              </td>
                              <td className="product-remove">
                                <button>
                                  <i className="fa fa-times"></i>
                                </button>
                              </td>
                            </tr>
                            </tbody>
                          </table>
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
                            <button>
                              Xoá giỏ hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">


                      <div className="col-lg-6 col-md-6">
                        <div className="discount-code-wrapper">
                          <div className="title-wrap">
                            <h4 className="cart-bottom-title section-bg-gray">
                              Mã giảm giá
                            </h4>
                          </div>
                          <div className="discount-code">
                            <p>Nhập mã giảm giá nếu có</p>
                            <form>
                              <input type="text" required name="name" />
                              <button className="cart-btn-2" type="submit">
                                Áp dụng mã giảm giá
                              </button>
                            </form>
                          </div>
                        </div>
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
                          1
                        </span>
                          </h5>

                          <h4 className="grand-totall-title">
                            Tổng tiền{" "}
                            <span>
                          100.000vnđ
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
        </LayoutOne>
      </Fragment>
  );
}

export default Cart