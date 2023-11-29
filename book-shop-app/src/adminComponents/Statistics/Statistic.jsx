import { React, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./statistic.css";

const Statistic = () => {
  return (
    <div>
      <h1>Statistic</h1>

      <Row>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingDate1"
              required
              type="date"
              placeholder="Ngày bắt đầu"
              onChange={(event) => console.log(event.target.value)}
            />
            <label htmlFor="floatingDate1">Ngày bắt đầu</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingDate2"
              required
              type="date"
              placeholder="Ngày kết thúc"
              onChange={(event) => console.log(event.target.value)}
            />
            <label htmlFor="floatingDate2">Ngày kết thúc</label>
          </Form.Floating>
        </Col>
        <Col>
          <Button style={{}}>Thống kê</Button>
        </Col>
      </Row>

      <Row className="data-container">
        <Col className="icon-statistic">
          <i className="fa-solid fa-book"></i>
        </Col>
        <Col className="data-statistic">
          <h4>1</h4>
          <h6>Sản phẩm</h6>
        </Col>
      </Row>

      <Row className="data-container">
        <Col className="icon-statistic">
          <i className="fa-solid fa-cart-arrow-down"></i>
        </Col>
        <Col className="data-statistic">
          <h4>1</h4>
          <h6>Đơn hàng</h6>
        </Col>
      </Row>

      <Row className="data-container">
        <Col className="icon-statistic">
          <i className="fa-solid fa-hand-holding-dollar"></i>
        </Col>
        <Col className="data-statistic">
          <h4>100,000,000đ</h4>
          <h6>Tổng doanh thu</h6>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên sách</th>
            <th>Số lượng bán</th>
            <th>Doanh thu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>100</td>
            <td>10,000,000đ</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Statistic;