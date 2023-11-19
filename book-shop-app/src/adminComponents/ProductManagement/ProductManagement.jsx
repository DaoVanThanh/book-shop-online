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
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  AddBook,
  searchBook,
} from "../../apiServices/AdminApi/ProductManagementService";

const ProductManagement = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [validated, setValidated] = useState(false);
  const [currentGenre, setCurrentGenre] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [allBook, setAllBook] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const itemsPerPage = 10;

  const [searchKey, setSearchKey] = useState("");

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

  const [newBook, setNewBook] = useState({
    title: "",
    genre: [],
    author: [],
    publicationDate: new Date(),
    price: 0,
    stockQuantity: 0,
    description: "",
  });

  const handleCloseAdd = () => {
    setShowAdd(false);
    setValidated(false);
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

  const handleShowAdd = () => setShowAdd(true);

  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setValidated(false);
  };

  const handleShowUpdate = () => setShowUpdate(true);

  const handleSubmitAdd = async (event) => {
    const form = event.currentTarget;
    if (
      form.checkValidity() === true &&
      newBook.genre.length > 0 &&
      newBook.author.length > 0
    ) {
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
    setNewBook({ ...newBook, title: title});
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
    setNewBook({ ...newBook, author: [...newBook.author, currentAuthor.trim()] });
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
                    <ListGroup.Item>
                      {genre}
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => handleDeleteGenre(genre)}
                      ></i>
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </Row>
            </Form.Group>
            <Form.Group controlId="validationCustom03">
              <Form.Label>Tác giả</Form.Label>
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
                    <ListGroup.Item>
                      {author}
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => handleDeleteAuthor(author)}
                      ></i>
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </Row>
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

      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm sách"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Button onClick={handleSearch}>Tìm kiếm</Button>
        <i className="fa-solid fa-magnifying-glass"></i>
      </InputGroup>

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
              <td>{book.title}</td>
              <td>{book.publication_date}</td>
              <td>{book.price}đ</td>
              <td>{book.stockQuantity}</td>
              <td>
                <Image src={book.imgUrl}></Image>
              </td>
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
          ))}
        </tbody>
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
    </>
  );
};

export default ProductManagement;
