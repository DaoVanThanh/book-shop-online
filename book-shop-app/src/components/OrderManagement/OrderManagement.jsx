import React from "react";

import { Container, Row, Col, Card, Button, Tab, Tabs } from "react-bootstrap";
import "./OrderManagement.css";

const OrderManagement = () => {
  return (
    <Tabs
      defaultActiveKey="all"
      id="uncontrolled-tab-example"
      className="mb-3 order-tabs"
      fill
    >
      <Tab eventKey="all" title="Tất cả">
        <div className="container-full-height order-tabs">
          <Card>
            <Card.Header >
              <Row>
                <Col sm={4}>
                </Col>
                <Col sm={4}>
                  <Card.Text>Mã đơn hàng: #19612</Card.Text>
                </Col>
                <Col sm={4} style={{ textAlign: "right" }}>
                  <Card.Text className="fw-bold cover-text-finish">Trạng thái: Đã hoàn thành</Card.Text>
                </Col>
              </Row>

            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={4}>
                  <Card.Img
                    src="/caycamngotcuatoi.jpeg"
                    className="img-fluid w-25 mx-auto"
                  />
                </Col>
                <Col sm={4} className="d-flex align-items-center justify-content-center" >
                  <Card.Title>Sách: Cây cam ngọt của tôi</Card.Title>
                </Col>
                <Col sm={1} className="d-flex align-items-center justify-content-center" >
                  <p className="text-muted" >x1</p>
                </Col>
                <Col sm={3} className="d-flex align-items-center justify-content-center" >
                  <Card.Text>Thành tiền: 100.000vnđ</Card.Text>
                </Col>
              </Row>
            </Card.Body>
            <hr />
            <Card.Body>
              <Row>
                <Col sm={4}>
                  <Card.Img
                    src="/ditimlesong.jpg"
                    className="img-fluid w-25 mx-auto"
                  />
                </Col>
                <Col sm={4} className="d-flex align-items-center justify-content-center" >
                  <Card.Title>Sách: Đi tìm lẽ sống</Card.Title>
                </Col>
                <Col sm={1} className="d-flex align-items-center justify-content-center" >
                  <p className="text-muted" >x1</p>
                </Col>
                <Col sm={3} className="d-flex align-items-center justify-content-center">
                  <Card.Text>Thành tiền: 89.000vnđ</Card.Text>
                </Col>
              </Row>
            </Card.Body>


            <Card.Footer>
              <Row>
                <Col sm={3}></Col>
                <Col className="text-muted" sm={6}>
                  Ngày đặt hàng: 25/10/2023
                </Col>
                <Col sm={3} className="fw-bold">
                  <Card.Text>Tổng: 189.000vnđ</Card.Text>

                </Col>
              </Row>
            </Card.Footer>
            <Card.Footer>
              <Row>
                <Col sm={4}>
                  <Button className="mb-2 mr-10" variant="success">
                    Mua lại
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button className="mb-2" variant="secondary">
                    Xem đánh giá
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button className="mb-2" variant="danger" disabled>
                    Huỷ đơn
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
          <br />
          <Card>
            <Card.Header>
              <Card.Text>
                <Row>
                  <Col sm={4}>
                  </Col>
                  <Col sm={4}>
                    <Card.Text>Mã đơn hàng: #19612</Card.Text>
                  </Col>
                  <Col sm={4} style={{ textAlign: "right" }}>
                    <Card.Text className="fw-bold cover-text-shipping shipping">Trạng thái: Đang giao</Card.Text>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={4}>
                  <Card.Img
                    src="/khonggiadinh.jpeg"
                    className="img-fluid w-25 mx-auto"
                  />
                </Col>
                <Col sm={4} className="d-flex align-items-center justify-content-center" >
                  <Card.Title>Sách: Không gia đình</Card.Title>
                </Col>
                <Col sm={1} className="d-flex align-items-center justify-content-center" >
                  <p className="text-muted" >x1</p>
                </Col>
                <Col sm={3} className="d-flex align-items-center justify-content-center" >
                  <Card.Text >Thành tiền: 149.000vnđ</Card.Text>
                </Col>
              </Row>
            </Card.Body>

            <Card.Footer>
              <Row>
                <Col sm={3}>

                </Col>
                <Col className="text-muted" sm={6}>
                  Ngày đặt hàng: 16/10/2023
                </Col>
                <Col sm={3} className="fw-bold">
                  <Card.Text>Tổng: 149.000vnđ</Card.Text>
                </Col>
              </Row>
            </Card.Footer>
            <Card.Footer>
              <Row>
                <Col sm={4}>
                  <Button className="mb-2 mr-10" variant="success">
                    Mua lại
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button className="mb-2" variant="secondary">
                    Xem đánh giá
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button className="mb-2" variant="danger">
                    Huỷ đơn
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Header>
              <Card.Text>
                <Row>
                  <Col sm={4}>
                  </Col>
                  <Col sm={4}>
                    <Card.Text>Mã đơn hàng: #19512</Card.Text>
                  </Col>
                  <Col sm={4} style={{ textAlign: "right" }}>
                    <Card.Text className="fw-bold cover-text-cancel cancel">Trạng thái: Đã huỷ</Card.Text>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={4}>
                  <Card.Img
                      src="/nhagiakim.jpeg"
                      className="img-fluid w-25 mx-auto"
                  />
                </Col>
                <Col sm={4} className="d-flex align-items-center justify-content-center" >
                  <Card.Title>Sách: Nhà giả kim</Card.Title>
                </Col>
                <Col sm={1} className="d-flex align-items-center justify-content-center" >
                  <p className="text-muted" >x1</p>
                </Col>
                <Col sm={3} className="d-flex align-items-center justify-content-center" >
                  <Card.Text >Thành tiền: 129.000vnđ</Card.Text>
                </Col>
              </Row>
            </Card.Body>

            <Card.Footer>
              <Row>
                <Col sm={3}>

                </Col>
                <Col className="text-muted" sm={6}>
                  Ngày đặt hàng: 11/10/2023
                </Col>
                <Col sm={3} className="fw-bold">
                  <Card.Text>Tổng: 129.000vnđ</Card.Text>
                </Col>
              </Row>
            </Card.Footer>
            <Card.Footer>
              <Row>
                <Col sm={4}>
                  <Button className="mb-2 mr-10" variant="success">
                    Mua lại
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button className="mb-2" variant="secondary">
                    Xem đánh giá
                  </Button>
                </Col>
                <Col sm={4}>
                  <Button className="mb-2" variant="danger" disabled>
                    Huỷ đơn
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </div>
      </Tab>
      <Tab eventKey="shipping" title="Đang giao">
        Shipping
      </Tab>
      <Tab eventKey="cancel" title="Đã huỷ">
        Cancel
      </Tab>
    </Tabs>
  );
};

export default OrderManagement;
