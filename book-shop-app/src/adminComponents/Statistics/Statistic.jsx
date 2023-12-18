import { React, useEffect, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./statistic.css";

import {
  generalStatistic,
  bookStatistic,
} from "../../apiServices/AdminApi/StatisticService";

import { formatVND } from "../../common";

const Statistic = () => {
  const [totalBookSold, setTotalBookSold] = useState(0);
  const [totalOrderSold, setTotalOrderSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [listBookSold, setListBookSold] = useState([]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleStatistic = async () => {
    try {
      const generalStatisticData = (await generalStatistic(startDate, endDate))
        .data;
      setTotalBookSold(generalStatisticData.numberOfBook);
      setTotalOrderSold(generalStatisticData.numberOfOrder);
      setTotalRevenue(generalStatisticData.revenue);

      const bookStatisticData = (await bookStatistic(startDate, endDate)).data;
      setListBookSold(bookStatisticData.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const initStatistic = async () => {
      try {
        const generalStatisticData = (
          await generalStatistic(startDate, endDate)
        ).data;
        console.log(generalStatisticData);
        setTotalBookSold(generalStatisticData.numberOfBook);
        setTotalOrderSold(generalStatisticData.numberOfOrder);
        setTotalRevenue(generalStatisticData.revenue);
        console.log("start", startDate, "end", endDate);
        const bookStatisticData = (await bookStatistic(startDate, endDate))
          .data;
        setListBookSold(bookStatisticData.content);
      } catch (err) {
        console.log(err);
      }
    };
    initStatistic();
  }, []);

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
              onChange={(event) => setStartDate(event.target.value)}
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
              onChange={(event) => setEndDate(event.target.value)}
            />
            <label htmlFor="floatingDate2">Ngày kết thúc</label>
          </Form.Floating>
        </Col>
        <Col>
          <Button style={{}} onClick={handleStatistic}>
            Thống kê
          </Button>
        </Col>
      </Row>

      <Row className="data-container">
        <Col className="icon-statistic">
          <i className="fa-solid fa-book"></i>
        </Col>
        <Col className="data-statistic">
          <h4>{totalBookSold}</h4>
          <h6>Sản phẩm</h6>
        </Col>
      </Row>

      <Row className="data-container">
        <Col className="icon-statistic">
          <i className="fa-solid fa-cart-arrow-down"></i>
        </Col>
        <Col className="data-statistic">
          <h4>{totalOrderSold}</h4>
          <h6>Đơn hàng</h6>
        </Col>
      </Row>

      <Row className="data-container">
        <Col className="icon-statistic">
          <i className="fa-solid fa-hand-holding-dollar"></i>
        </Col>
        <Col className="data-statistic">
          <h4>{formatVND(totalRevenue)}</h4>
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
          {listBookSold.map((book) => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.totalSold}</td>
              <td>{formatVND(book.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Statistic;
