import React, { useEffect, useState } from "react";
import {Container, Row, Col, Card, Button, Tab, Tabs, Modal} from "react-bootstrap";
import axios from "axios";
import "./OrderManagement.css";
import "../AppRoutes";
import { getOrder, cancelOrder } from "../../apiServices/OrderManagementService";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify'
import { Link } from 'react-router-dom';

const ConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận huỷ đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn huỷ đơn hàng này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

const OrderManagement = () => {
  const storedAccessToken = localStorage.getItem('accessToken');
  const [orders, setOrders] = useState([]);

  const [orderStatuses, setOrderStatuses] = useState([
    "PENDING",
    "ACCEPTED",
    "DELIVERING",
    "SUCCESS",
    "RETURNED",
    "CANCELLED"
  ]);
  const translateStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ xác nhận";
      case "ACCEPTED":
        return "Chờ lấy hàng";
      case "DELIVERING":
        return "Đang giao";
      case "SUCCESS":
        return "Đã giao";
      case "RETURNED":
        return "Trả hàng";
      case "CANCELLED":
        return "Đã huỷ";
      default:
        return status;
    }
  };
  const getOrderDetail = () => {
    getOrder().then(response => {
      setOrders(response.data);
    }).catch(error => {
      console.log(error)
    })
  }

  const actioncCancelOrder = (orderId) => {

  }

  useEffect(() => {
    getOrderDetail();
  }, []);

  return (
      <Tabs
          id="orderTabs"
          className="mb-3 order-tabs"
          fill
          defaultActiveKey={orderStatuses[0]} // Set the default active tab
      >
        {orderStatuses.map((status) => (
            <Tab key={status} eventKey={status} title={translateStatus(status)}>
              {/* Render orders based on the current status */}
              <OrderList status={status} orders={orders} />
            </Tab>
        ))}
      </Tabs>
  );
};

const OrderList = ({ status, orders }) => {
  // Ensure that orders is an array before using filter
  const [showModal, setShowModal] = useState(false);
  const [orderIdToCancel, setOrderIdToCancel] = useState(null);
  const filteredOrders = orders && Array.isArray(orders.orderSummaries)
      ? orders.orderSummaries.filter((order) => order.status === status)
      : [];
  const refresh = () => window.location.reload(true)
  const handleCancelClick = (orderId) => {
    setOrderIdToCancel(orderId);
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    if (orderIdToCancel) {
      // Perform cancellation logic here
      cancelOrder(orderIdToCancel)
          .then((response) => {
            toast.success("Huỷ đơn thành công");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {

            refresh();
            setShowModal(false);

          });
    }
  };

  return (

      <div className="container-full-height order-tabs">
        {filteredOrders.map((order) => (

          <Card key={order.orderId} className="mb-5">

            <Card.Header>
              <Row>
                <Col sm={4}></Col>
                <Col sm={4}>
                  <Card.Text>Mã đơn hàng: #{order.orderId}</Card.Text>
                </Col>
                <Col sm={4} style={{ textAlign: "right" }}>
                  <Card.Text className={`fw-bold cover-text-${order.status.toLowerCase()} ${order.status.toLowerCase()}`}>Trạng thái: {order.status}</Card.Text>
                </Col>
              </Row>
            </Card.Header>



            <Card.Body>
                {order.bookQuantitySummaries.map((bookSummary) => (

                    <Row key={bookSummary.bookSummary.bookId}>
                      <Col sm={4}>
                        <Card.Img
                            src={bookSummary.bookSummary.imgUrl.replace('public/', '')}
                            className="img-fluid w-25 mx-auto"
                        />
                      </Col>
                      <Col sm={4} className="d-flex align-items-center justify-content-center">
                        <Card.Title>Sách: {bookSummary.bookSummary.title}</Card.Title>
                      </Col>
                      <Col sm={1} className="d-flex align-items-center justify-content-center">
                        <div className="text-muted">x{bookSummary.quantity}</div>
                      </Col>
                      <Col sm={3} className="d-flex align-items-center justify-content-center">
                        <Card.Text>Thành tiền: {bookSummary.bookSummary.price * bookSummary.quantity}vnđ</Card.Text>
                      </Col>
                      <hr />

                    </Row>

                ))}
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col sm={3}></Col>
                  <Col className="text-muted" sm={6}>
                    Ngày đặt hàng: {new Date(order.orderDate).toLocaleString()}
                  </Col>
                  <Col sm={3} className="fw-bold">
                    <Card.Text>Tổng: {order.totalAmount}vnđ</Card.Text>
                  </Col>
                </Row>
              </Card.Footer>
            <Card.Footer>
              <Row>
                <Col sm={4}>
                  {/*<Button*/}
                  {/*    className="mb-2 mr-10"*/}
                  {/*    variant="success"*/}
                  {/*    disabled={status !== "PENDING"}*/}
                  {/*>*/}
                  {/*  Mua lại*/}
                  {/*</Button>*/}
                </Col>
                <Col sm={4}>
                  {status === "SUCCESS" && (
                      <Link to={`/rate?orderId=${order.orderId}`} className="btn btn-secondary mb-2">
                        Xem đánh giá
                      </Link>
                  )}
                </Col>
                <Col sm={4}>
                  <Button
                      className="mb-2"
                      variant="danger"
                      disabled={status !== "PENDING"}
                      onClick={() => handleCancelClick(order.orderId)}
                  >
                    Huỷ đơn
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
            </Card>


        ))}
        <ToastContainer />
        <ConfirmationModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleConfirm={handleConfirmCancel}
        />
      </div>
  );
};


export default OrderManagement;
