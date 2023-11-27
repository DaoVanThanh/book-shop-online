import React from 'react';
import {Row, Col} from 'react-bootstrap';

function formatVND(n) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    }) + ' VND';
}

const Home = () => {
    const bestSellerBooks = [
        { id: 4, name: 'Book 1', price: 70000, imageUrl: 'https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/10/Poster5-1000x1000.jpg'},
        { id: 5, name: 'Book 2', price: 136000, imageUrl: 'https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/10/Poster5-1000x1000.jpg'},
        { id: 6, name: 'Book 3', price: 247000, imageUrl: 'https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/10/Poster5-1000x1000.jpg'},
    ];
    const reviewFromCustomers = [
        {
            id: 1,
            name: 'TAI.TQ',
            content: 'Fast shipping and excellent customer service. The product was even better than expected. I will definitely be a returning customer.',
            avartar: 'https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/earth-store-testimonial-avatar-img.jpeg',
        },
        {
            id: 2,
            name: 'TUNA.NV',
            content: 'Great user experience on your website. I found exactly what I was looking for at a great price. I will definitely be telling my friends.',
            avartar: 'https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/earth-store-testimonial-avatar-img.jpeg',
        },
        {
            id: 3,
            name: 'TIEN.PQ',
            content: 'Thank you for the excellent shopping experience. It arrived quickly and was exactly as described. I will definitely be shopping with you again in the future.',
            avartar: 'https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/earth-store-testimonial-avatar-img.jpeg',
        }
    ]
    const hotAuthors = [
        {
            id: 1,
            name: 'Trần Quang Tài',
            avartar: 'https://bizweb.dktcdn.net/100/363/455/articles/elizabeth-kolbert.jpg?v=1699331216893',
        },
        {
            id: 2,
            name: 'Trần Quang Tài',
            avartar: 'https://bizweb.dktcdn.net/100/363/455/articles/elizabeth-kolbert.jpg?v=1699331216893',
        },
        {
            id: 3,
            name: 'Trần Quang Tài',
            avartar: 'https://bizweb.dktcdn.net/100/363/455/articles/elizabeth-kolbert.jpg?v=1699331216893'
        },
        {
            id: 4,
            name: 'Trần Quang Tài',
            avartar: 'https://bizweb.dktcdn.net/100/363/455/articles/elizabeth-kolbert.jpg?v=1699331216893',
        },
        {
            id: 5,
            name: 'Trần Quang Tài',
            avartar: 'https://bizweb.dktcdn.net/100/363/455/articles/elizabeth-kolbert.jpg?v=1699331216893',
        },
        {
            id: 6,
            name: 'Trần Quang Tài',
            avartar: 'https://bizweb.dktcdn.net/100/363/455/articles/elizabeth-kolbert.jpg?v=1699331216893',
        }
    ]
    return (
        <div style={{
            backgroundColor: 'hsl(0, 0%, 100%)',
            marginTop: '-10px',
            marginBottom: '-10px',
        }}>
        <div style={{
            margin: '10px 10%',
            backgroundColor: 'none',
        }}>

            <HomeBook bestSellerBooks={bestSellerBooks}/>
            <Line/>
            <Heading text={'Các tác giả'}/>
            <HotAuthor hotAuthors={hotAuthors}/>
            <Line/>
            <Heading text={'Đánh giá của khách hàng'}/>
            <ReviewBookShop reviewFromCustomers={reviewFromCustomers}/>
        </div>
        </div>
    );
};

const HomeBook = ({bestSellerBooks}) => {
    return (
        <Row>
            {bestSellerBooks.map((book) => (
                <Col
                    key={book.id}
                    style={{
                        margin: '15px 1% 30px',
                    }}
                >
                    <img
                        src={book.imageUrl}
                        alt={book.name}
                        style={{
                            padding: '10px',
                            width: '100%'
                        }}
                    />
                    <p style={{
                        color: 'hsl(0, 0%, 0%)',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        marginLeft: '10px',
                        fontSize: '16px',
                    }}>{book.name}</p>
                    <p style={{
                        color: 'hsl(0, 0%, 22.7%)',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        marginLeft: '10px',
                        marginTop: '-10px',
                        fontSize: '14.4px',
                    }}>{formatVND(book.price)}</p>
                </Col>
            ))}
        </Row>
    );
}

const ReviewBookShop = ({reviewFromCustomers}) => {
    return (
        <Row>
            {reviewFromCustomers.map((review) => (
                <Col
                    key={review.id}
                    style={{
                        margin: '15px 1% 30px',
                    }}
                >
                    <p style={{
                        color: 'hsl(0, 0%, 22.7%)',
                        textAlign: 'left',
                        marginLeft: '10px',
                        fontSize: '17px',
                    }}>{review.content}</p>
                    <img
                        src={review.avartar}
                        alt={review.name}
                        style={{
                            display: 'flex',
                            marginLeft: '10px',
                            alignSelf: 'left',
                            width: '40px',
                            borderRadius: '50%',
                        }}
                    />
                    <p style={{
                        color: 'hsl(0, 0%, 0%)',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        marginLeft: '10px',
                        fontSize: '12px',
                        marginTop: '10px',
                    }}>{review.name}</p>
                </Col>
            ))}
        </Row>
    );
}

const HotAuthor = ({hotAuthors}) => {
    return (
        <Row>
            {hotAuthors.map((author) => (
                <Col
                    key={author.id}
                    style={{
                        margin: '15px 1% 30px',
                    }}
                >
                    <img
                        src={author.avartar}
                        alt={author.name}
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '130px',
                            borderRadius: '50%',
                        }}
                    />
                    <p style={{
                        color: 'hsl(0, 0%, 0%)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: '12px',
                        marginTop: '10px',
                    }}>{author.name}</p>
                </Col>
            ))}
        </Row>
    );
}

const Line = () => {
    return (
        <hr
            style={{
                color: 'hsl(0, 0%, 0%)',
                height: 1
            }}
        />
    )
}

const Heading = ({text}) => {
    return (
        <p style={{
            color: 'hsl(0, 0%, 0%)',
            fontWeight: 'bold',
            textAlign: 'left',
            marginLeft: '20px',
            fontSize: '25px',
            marginTop: '50px',
        }}>{text}</p>
    )
}
export default Home;
