import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";

import { AddBook } from "../../apiServices/AdminApi/ProductManagementService";
import './ProductManagement.css';

const ProductManagement = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [validated, setValidated] = useState(false);

  const [newBook, setNewBook] = useState({
    title: "",
    genre: [],
    author: [],
    publicationDate: "",
    price: 0,
    stockQuantity: 0,
    description: "",
  });

  const handleCloseAdd = () => {
    setShowAdd(false);
    setValidated(false);
  };
  const handleShowAdd = () => setShowAdd(true);

  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setValidated(false);
  };
  const handleShowUpdate = () => setShowUpdate(true);

  const handleSubmitAdd = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      /* console.log("Valid");
      try {
        await AddBook("a", "b", 100, "2000/01/01",2,"abc", ["Thanh"], ["thieu nhi"]);
        console.log("success")
      } catch(error) {
        console.log(error)
      } */
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
  };

  const handleSubmitUpdate = (event) => {
    const form = event.target;
    if (form.checkValidity() === true) {
      console.log("ValidUpdate");
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
  };

  const handleTitleAdd = (e) => {
    const title = e.target.value;
    setNewBook({ ...newBook, title: title });
  };

  const handleGenre = (e) => {};

  const handleAuthor = () => {};

  const handlePublicationDate = (e) => {};
  const handlePrice = (e) => {
    const price = e.target.value;
    setNewBook({ ...newBook, price: price });
  };
  const handleStockQuantity = (e) => {
    const stockQuantity = e.target.value;
    setNewBook({ ...newBook, stockQuantity: stockQuantity });
  };
  const handleDescription = (e) => {
    const description = e.target.value;
    setNewBook({ ...newBook, description: description });
    console.log(newBook);
  };
  return (
    <>
      <Button variant="success" onClick={handleShowAdd}>
        Thêm sản phẩm
      </Button>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmitAdd}>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Tên sách</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={handleTitleAdd}
                value={newBook.title}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên sách
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
              <Form.Label>Thể loại</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={handleGenre}
                value={newBook.genre}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên thể loại
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom03">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={handleAuthor}
                value={newBook.author}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên tác giả
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom04">
              <Form.Label>Ngày xuất bản</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={handlePublicationDate}
                value={newBook.publicationDate}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập ngày xuất bản
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom05">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={handlePrice}
                value={newBook.price}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập giá
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom06">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={handleStockQuantity}
                value={newBook.stockQuantity}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập số lượng
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom07">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                required
                onChange={handleDescription}
                value={newBook.description}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mô tả
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Đóng
            </Button>
            <Button type="submit" variant="success">
              Thêm
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Ngày xuất bản</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>
              <Button variant="success" onClick={handleShowUpdate}>
                Cập nhật
              </Button>{" "}
              <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Cập nhật sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmitUpdate}
                  >
                    <Form.Group controlId="validationCustom01">
                      <Form.Label>Tên sách</Form.Label>
                      <Form.Control type="text" required />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập tên sách
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom02">
                      <Form.Label>Thể loại</Form.Label>
                      <Form.Control type="text" required />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập tên thể loại
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom03">
                      <Form.Label>Tác giả</Form.Label>
                      <Form.Control type="text" required />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập tên tác giả
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom04">
                      <Form.Label>Ngày xuất bản</Form.Label>
                      <Form.Control type="date" required />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập ngày xuất bản
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom05">
                      <Form.Label>Giá</Form.Label>
                      <Form.Control type="number" required />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập giá
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom06">
                      <Form.Label>Số lượng</Form.Label>
                      <Form.Control type="number" required />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập số lượng
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom07">
                      <Form.Label>Mô tả</Form.Label>
                      <Form.Control type="text" as="textarea" required />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập mô tả
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="secondary" onClick={handleCloseUpdate}>
                      Đóng
                    </Button>
                    <Button type="submit" variant="success">
                      Cập nhật
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
              <Button variant="success">Xóa</Button>
            </td>
          </tr>
        </tbody>
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
      </Table>
    </>
  );
};

export default ProductManagement;
