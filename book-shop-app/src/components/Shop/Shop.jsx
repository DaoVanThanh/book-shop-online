import React, { Component } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import './style.css';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [], // Danh sách sách
            searchQuery: '', // Thông tin tìm kiếm
            priceFilter: 0, // Lọc theo giá
        };
    }
    componentDidMount() {
        const booksData = [
            { id: 1, title: 'Ngô Văn Tuân', price: 20 },
            { id: 2, title: 'Nguyễn Đức Thuận', price: 2000 },
            { id: 3, title: 'Đào Duy Chiến', price: 2003 },
            { id: 4, title: 'Đặng Nguyễn Duy Trúc', price: 2004 },
            { id: 5, title: 'Lê Hải Đăng', price: 2006 },
            { id: 6, title: 'Nguyễn Minh Chiến', price: 2005 },
            { id: 7, title: 'Trần Quang Tài', price: 2007 },
            { id: 8, title: 'Đào Văn Thành', price: 2009 },
            { id: 9, title: 'Nguyễn Thị Ngọc Ánh', price: 2010 },
            { id: 10, title: 'Tuna Ngô', price: 2010 },
            { id: 11, title: 'Ngô Tuna', price: 2010 },
            { id: 12, title: 'Problem H', price: 2010 },
            { id: 13, title: '13 submits', price: 2010 },
            { id: 14, title: 'xinCodeAC', price: 2010 },
            { id: 15, title: 'GrepCook', price: 2010 },
        ];

        this.setState({ books: booksData });
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    }

    handlePriceFilterChange = (event) => {
        this.setState({ priceFilter: parseFloat(event.target.value) });
    }

    render() {
        const filteredBooks = this.state.books.filter((book) => {
            return (
                book.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()) &&
                book.price >= this.state.priceFilter
            );
        });

        return (
            <Container>
                <Row>
                    <Col md={4}>
                        <h2>Tìm kiếm sách</h2>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={this.state.searchQuery}
                            onChange={this.handleSearchChange}
                        />

                        <h2>Lọc theo giá</h2>
                        <Form.Control
                            type="number"
                            placeholder="Nhập giá..."
                            value={this.state.priceFilter}
                            onChange={this.handlePriceFilterChange}
                        />
                    </Col>
                    <Col md={8}>
                        <h2>Danh sách các sách</h2>
                        <Row>
                            {filteredBooks.map((book) => (
                                <Col key={book.id} md={4} className="book-card">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{book.title}</Card.Title>
                                            <Card.Text>Giá: ${book.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Shop;