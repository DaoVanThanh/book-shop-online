import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  ListGroup,
  Pagination,
  Image,
  InputGroup,
} from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";

import './ProductManagement.css';
import {
  AddBook,
  searchBook,
  getBookDetail,
} from "../../apiServices/AdminApi/ProductManagementService";
import "./PM.css";

const ProductManagement = () => {
  const ADD = "Thêm";
  const UPDATE = "Cập nhật";
  const [showAction, setShowAction] = useState(false);
  const [validated, setValidated] = useState(false);
  const [currentGenre, setCurrentGenre] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [allBook, setAllBook] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const itemsPerPage = 10;

  const [searchKey, setSearchKey] = useState("");

  const [action, setAction] = useState("");

  const [newBook, setNewBook] = useState({
    title: "",
    genre: [],
    author: [],
    publicationDate: new Date(),
    price: 0,
    stockQuantity: 0,
    description: "",
  });

  useEffect(() => {
    const getBooks = async (page, size) => {
      try {
        const books = (await searchBook(searchKey, page, size)).data;
        setAllBook(books.content);
        setTotalPage(books.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks(currentPage - 1, itemsPerPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClose = () => {
    setShowAction(false);
    setValidated(false);
    setAction("");
    clearNewBook();
  };

  const clearNewBook = () => {
    setNewBook({
      title: "",
      genre: [],
      author: [],
      publicationDate: new Date(),
      price: 0,
      stockQuantity: 0,
      description: "",
    });
    setCurrentGenre("");
    setCurrentAuthor("");
  };

  const handleShowAdd = () => {
    setAction(ADD);
    setShowAction(true);
  };

  const handleShowUpdate = async (id) => {
    setAction(UPDATE);
    setShowAction(true);
    try {
      const detail = (await getBookDetail(id)).data;
      console.log(detail);
      setNewBook({
        ...newBook,
        title: detail.title,
        description: detail.description,
        publicationDate: detail.publication_date,
        price: detail.price,
        stockQuantity: detail.stockQuantity,
        author: detail.authors.map((author) => author.authorName),
        genre: detail.genres.map((genre) => genre.genreName),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = async (event) => {
    const form = event.currentTarget;
    if (
      form.checkValidity() === true &&
      newBook.genre.length > 0 &&
      newBook.author.length > 0
    ) {
      if (action == ADD) {
        try {
          await AddBook(
            newBook.title.trim(),
            newBook.description.trim(),
            newBook.price,
            newBook.publicationDate,
            newBook.stockQuantity,
            "urlImg",
            newBook.author,
            newBook.genre
          );
        } catch (error) {
          console.log(error);
        }
      } else if (action == UPDATE) {
        console.log("update");
      }
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

  const handleGenre = (e) => {
    const genre = e.target.value;
    setCurrentGenre(genre);
  };

  const addGenre = () => {
    setNewBook({ ...newBook, genre: [...newBook.genre, currentGenre.trim()] });
    setCurrentGenre("");
  };

  const handleDeleteGenre = (genre) => {
    const updateGenres = newBook.genre.filter(
      (genreName) => genreName !== genre
    );
    setNewBook({ ...newBook, genre: updateGenres });
  };

  const handleAuthor = (e) => {
    const author = e.target.value;
    setCurrentAuthor(author);
  };

  const addAuthor = () => {
    setNewBook({
      ...newBook,
      author: [...newBook.author, currentAuthor.trim()],
    });
    setCurrentAuthor("");
  };

  const handleDeleteAuthor = (author) => {
    const updateAuthors = newBook.author.filter(
      (authorName) => authorName !== author
    );
    setNewBook({ ...newBook, author: updateAuthors });
  };

  const handlePublicationDate = (e) => {
    const publicationDate = e.target.value;
    setNewBook({ ...newBook, publicationDate: publicationDate });
  };

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
    console.log(newBook)
  };

  const handleSearch = async () => {
    if (currentPage === 1) {
      const bookSearch = (await searchBook(searchKey, 0, itemsPerPage)).data;
      setAllBook(bookSearch.content);
      setTotalPage(bookSearch.totalPages);
    }
    setCurrentPage(1);
  };

  return (
    <>
      <h1>Quản lý sản phẩm</h1>
      <div className="add-search">
        <Button className="admin-add" variant="success" onClick={handleShowAdd}>
          Thêm sách
        </Button>

        <InputGroup>
          <Form.Control id="search"
            type="text"
            placeholder="Tìm kiếm sách ..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Button onClick={handleSearch}>
            <MDBIcon icon="search" />
          </Button>
        </InputGroup>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên sách</th>
            <th>Ngày xuất bản</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Ảnh</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {allBook.map((book) => (
            <tr key={book.bookId}>
              <td style={{ textAlign: "left" }}>{book.title}</td>
              <td>{book.publication_date}</td>
              <td>{book.price}đ</td>
              <td>{book.stockQuantity}</td>
              <td>
                <Image src={book.imgUrl}></Image>
              </td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleShowUpdate(book.bookId)}
                >
                  Cập nhật
                </Button>{" "}
                <Button variant="success">Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPage).keys()].map((pageNumber) => (
          <Pagination.Item
            key={pageNumber + 1}
            active={pageNumber + 1 === currentPage}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPage)} />
      </Pagination>
      <Modal size="lg" show={showAction} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action} sách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
            <Form.Group className="form-group" controlId="validationCustom01">
              <Form.Label className="form-label">Tên sách</Form.Label>
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
            <Form.Group className="form-group" controlId="validationCustom02">
              <Form.Label className="form-label">Thể loại</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    required={newBook.genre.length == 0}
                    onChange={handleGenre}
                    value={currentGenre}
                    isInvalid={validated && newBook.genre.length === 0}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng thêm thể loại
                  </Form.Control.Feedback>
                </Col>
                <Col>
                  <Button variant="success" onClick={addGenre}>
                    Thêm
                  </Button>
                </Col>
                {newBook.genre.map((genre, id) => (
                  <ListGroup key={id}>
                    <ListGroup.Item
                      style={{
                        border: "none",
                        marginTop: "10px",
                        padding: "0 16px",
                      }}
                    >
                      {genre}
                      <i
                        style={{
                          float: "right",
                          cursor: "pointer",
                          marginTop: "5px",
                        }}
                        className="fa-solid fa-trash"
                        onClick={() => handleDeleteGenre(genre)}
                      ></i>
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </Row>
            </Form.Group>
            <Form.Group className="form-group" controlId="validationCustom03">
              <Form.Label className="form-label">Tác giả</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    required={newBook.author.length === 0}
                    onChange={handleAuthor}
                    value={currentAuthor}
                    isInvalid={validated && newBook.author.length === 0}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng thêm tác giả
                  </Form.Control.Feedback>
                </Col>
                <Col>
                  <Button variant="success" onClick={addAuthor}>
                    Thêm
                  </Button>
                </Col>
                {newBook.author.map((author, id) => (
                  <ListGroup key={id}>
                    <ListGroup.Item
                      style={{
                        border: "none",
                        marginTop: "10px",
                        padding: "0 16px",
                      }}
                    >
                      {author}
                      <i
                        style={{
                          float: "right",
                          cursor: "pointer",
                          marginTop: "5px",
                        }}
                        className="fa-solid fa-trash"
                        onClick={() => handleDeleteAuthor(author)}
                      ></i>
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </Row>
            </Form.Group>
            <Form.Group className="form-group" controlId="validationCustom04">
              <Form.Label className="form-label">Ngày xuất bản</Form.Label>
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
            <Form.Group className="form-group" controlId="validationCustom05">
              <Form.Label className="form-label">Giá</Form.Label>
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
            <Form.Group className="form-group" controlId="validationCustom06">
              <Form.Label className="form-label">Số lượng</Form.Label>
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
            <Form.Group className="form-group" controlId="validationCustom07">
              <Form.Label className="form-label">Mô tả</Form.Label>
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
            <div
              style={{
                paddingTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={{ marginRight: "20px" }}
                variant="secondary"
                onClick={handleClose}
              >
                Đóng
              </Button>
              <Button style={{}} type="submit" variant="success">
                {action}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductManagement;
