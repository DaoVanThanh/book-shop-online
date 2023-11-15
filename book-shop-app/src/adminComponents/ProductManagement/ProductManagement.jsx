import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";

const ProductManagement = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [validated, setValidated] = useState(false);

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

  const handleSubmitAdd = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      console.log("Valid");
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
  };

  const handleSubmitUpdate = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      console.log("ValidUpdate");
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
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
            <Button variant="secondary" onClick={handleCloseAdd}>
              Đóng
            </Button>
            <Button type="submit" variant="success">
              Thêm
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Đóng
          </Button>
          <Button variant="success" type="submit" onClick={handleCloseAdd}>
            Thêm
          </Button>
        </Modal.Footer> */}
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
              <Button variant="success" onClick={handleShowUpdate}>Cập nhật</Button>{" "}
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
      </Table>
    </>
  );
};

export default ProductManagement;
