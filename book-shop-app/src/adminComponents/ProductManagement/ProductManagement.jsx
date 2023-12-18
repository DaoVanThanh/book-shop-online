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
import FileBase64 from "react-file-base64";
import {
  AddBook,
  searchBook,
  getBookDetail,
  updateBook,
} from "../../apiServices/AdminApi/ProductManagementService";
import "./PM.css";
import { formatVND } from "../../common";

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
    imgUrl: "",
  });
  const [idUpdate, setIdUpdate] = useState(-1);

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
    setIdUpdate(-1);
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
        imgUrl: detail.imgUrl,
      });
      setIdUpdate(id);
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
            newBook.imgUrl,
            newBook.author,
            newBook.genre
          );
        } catch (error) {
          console.log(error);
        }
      } else if (action == UPDATE) {
        try {
          await updateBook(
            idUpdate,
            newBook.title.trim(),
            newBook.description.trim(),
            newBook.price,
            newBook.publicationDate,
            newBook.stockQuantity,
            newBook.imgUrl,
            newBook.author,
            newBook.genre
          );
        } catch (error) {
          console.log(error);
        }
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
    console.log(newBook);
  };

  const handleSearch = async () => {
    if (currentPage === 1) {
      const bookSearch = (await searchBook(searchKey, 0, itemsPerPage)).data;
      setAllBook(bookSearch.content);
      setTotalPage(bookSearch.totalPages);
    }
    setCurrentPage(1);
  };

  const displayRange = 2; // Số lượng trang hiển thị bên trái và bên phải của trang hiện tại

  const startPage = Math.max(1, currentPage - displayRange);
  const endPage = Math.min(totalPage, currentPage + displayRange);

  return (
    <div className="ad-container">
      <h1>Quản lý sản phẩm</h1>
      <div className="add-search">
        <Button className="admin-add" variant="primary" onClick={handleShowAdd}>
          Thêm sách
        </Button>

        <InputGroup>
          <Form.Control
            id="search"
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
            <th>Chỉnh sửa</th>
          </tr>
        </thead>

        <tbody>
          {allBook.map((book) => (
            <tr key={book.bookId}>
              <td style={{ textAlign: "left" }}>{book.title}</td>
              <td>{book.publication_date}</td>
              <td>{formatVND(book.price)}</td>
              <td>{book.stockQuantity}</td>
              <td>
                <Image src={book.imgUrl} style={{ width: "100px" }}></Image>
              </td>
              <td>
                <i
                  className="fa-regular fa-pen-to-square"
                  style={{ cursor: "pointer", marginRight: "20px" }}
                  onClick={() => handleShowUpdate(book.bookId)}
                ></i>
                <i className="fa-solid fa-trash"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination style={{justifyContent:"center"}}>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {/* Hiển thị trang đầu */}
        {startPage > 1 && (
          <>
            <Pagination.Item onClick={() => handlePageChange(1)}>
              {1}
            </Pagination.Item>
            {startPage > 2 && <Pagination.Ellipsis disabled />}
          </>
        )}

        {/* Hiển thị trang */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}

        {/* Hiển thị trang cuối */}
        {endPage < totalPage && (
          <>
            {endPage < totalPage - 1 && <Pagination.Ellipsis disabled />}
            <Pagination.Item onClick={() => handlePageChange(totalPage)}>
              {totalPage}
            </Pagination.Item>
          </>
        )}

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
            <Form.Floating className="mb-3" id="validationCustom01">
              <Form.Control
                id="fl1"
                type="text"
                placeholder="Tên sách"
                required
                onChange={handleTitleAdd}
                value={newBook.title}
              />
              <label htmlFor="fl1">Tên sách</label>
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên sách
              </Form.Control.Feedback>
            </Form.Floating>
            <Form.Floating
              className="mb-3 genre-author"
              id="validationCustom02"
            >
              <Form.Control
                id="fl2"
                type="text"
                placeholder="Thể loại"
                required={newBook.genre.length == 0}
                onChange={handleGenre}
                value={currentGenre}
                isInvalid={validated && newBook.genre.length === 0}
              />
              <label htmlFor="fl2">Thể loại</label>
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "10px" }}
              >
                Vui lòng thêm thể loại
              </Form.Control.Feedback>

              <Button
                variant="success"
                className="add-genre-author"
                style={{}}
                onClick={addGenre}
              >
                Thêm
              </Button>
            </Form.Floating>
            <div className="list-genre-author">
              {newBook.genre.map((genre, id) => (
                <ListGroup key={id}>
                  <ListGroup.Item
                    style={{
                      border: "none",
                      padding: "0 0 0 16px",
                    }}
                  >
                    <i
                      style={{
                        cursor: "pointer",
                        marginRight: "20px",
                      }}
                      className="fa-solid fa-trash"
                      onClick={() => handleDeleteGenre(genre)}
                    ></i>
                    {genre}
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </div>

            <Form.Floating
              className="mb-3 genre-author"
              id="validationCustom03"
            >
              <Form.Control
                id="fl3"
                type="text"
                placeholder="Tác giả"
                required={newBook.author.length === 0}
                onChange={handleAuthor}
                value={currentAuthor}
                isInvalid={validated && newBook.author.length === 0}
              />
              <label htmlFor="fl3">Tác giả</label>
              <Form.Control.Feedback
                type="invalid"
                style={{ marginLeft: "10px" }}
              >
                Vui lòng thêm tác giả
              </Form.Control.Feedback>

              <Button
                variant="success"
                className="add-genre-author"
                onClick={addAuthor}
              >
                Thêm
              </Button>
            </Form.Floating>
            <div className="list-genre-author">
              {newBook.author.map((author, id) => (
                <ListGroup key={id}>
                  <ListGroup.Item
                    style={{
                      border: "none",
                      padding: "0 0 0 16px",
                    }}
                  >
                    <i
                      style={{
                        cursor: "pointer",
                        marginRight: "20px",
                      }}
                      className="fa-solid fa-trash"
                      onClick={() => handleDeleteAuthor(author)}
                    ></i>
                    {author}
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </div>

            <Form.Floating className="mb-3" id="validationCustom04">
              <Form.Control
                id="fl4"
                type="date"
                placeholder="Ngày xuất bản"
                required
                onChange={handlePublicationDate}
                value={newBook.publicationDate}
              />
              <label htmlFor="fl4">Ngày xuất bản</label>
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập ngày xuất bản
              </Form.Control.Feedback>
            </Form.Floating>
            <Form.Floating className="mb-3" id="validationCustom05">
              <Form.Control
                id="fl5"
                type="number"
                placeholder="Giá"
                required
                onChange={handlePrice}
                value={newBook.price}
              />
              <label htmlFor="fl5">Giá</label>
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập giá
              </Form.Control.Feedback>
            </Form.Floating>
            <Form.Floating className="mb-3" id="validationCustom06">
              <Form.Control
                id="fl6"
                type="number"
                placeholder="Số lượng"
                required
                onChange={handleStockQuantity}
                value={newBook.stockQuantity}
              />
              <label htmlFor="fl6">Số lượng</label>
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập số lượng
              </Form.Control.Feedback>
            </Form.Floating>
            <Form.Floating className="mb-3" id="validationCustom07">
              <Form.Control
                id="fl7"
                type="text"
                as="textarea"
                placeholder="Mô tả"
                required
                onChange={handleDescription}
                value={newBook.description}
              />
              <label htmlFor="fl7">Mô tả</label>
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mô tả
              </Form.Control.Feedback>
            </Form.Floating>
            <Form.Group className="form-group" controlId="validationCustom07">
              <Form.Label className="form-label"></Form.Label>
              <FileBase64
                multiple={false}
                type="file"
                value={newBook.imgUrl}
                onDone={({ base64 }) =>
                  setNewBook({ ...newBook, imgUrl: base64 })
                }
              />
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
    </div>
  );
};

export default ProductManagement;
