import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import {getBestSellerBooks, getFamousAuthors} from "../../apiServices/AdminApi/ProductManagementService";

function formatVND(n) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    }) + ' VND';
}

const Home = () => {
    useEffect(() => {
        handleBestSellerBooks(4);
        handleFamousAuthors(6);
    }, []);

    const [bestSellerBooks, setBestSellerBooks] = useState([]);
    const [famousAuthors, setFamousAuthors] = useState([]);

    const handleBestSellerBooks = async (size) => {
         await getBestSellerBooks(size)
            .then((response) => {
                setBestSellerBooks(response.data.content)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handleFamousAuthors = async (size) => {
        await getFamousAuthors(size)
            .then((response) => {
                setFamousAuthors(response.data.content)
            })
            .catch((error) => {
                console.log(error)
            });
    }

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
            <HotAuthor famousAuthors={famousAuthors}/>
            <Line/>
            <Heading text={'Đánh giá của khách hàng'}/>
            <ReviewBookShop reviewFromCustomers={reviewFromCustomers}/>
        </div>
        </div>
    );
};

const HomeBook = ({bestSellerBooks}) => {
    return (
        <Row style={{overflow: 'hidden'}}>
            {bestSellerBooks.map((book) => (
                <Col
                    className="overflow-hidden"
                    key={book.bookId}
                    style={{
                        margin: '15px 1% 30px',
                    }}
                >
                    <img
                        src={book.imgUrl}
                        alt={book.title}
                        style={{
                            padding: '10px',
                            height: '300px',
                        }}
                    />
                    <p style={{
                        color: 'hsl(0, 0%, 0%)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: '16px',
                    }}>{book.title}</p>
                    <p style={{
                        color: 'hsl(0, 0%, 22.7%)',
                        fontWeight: 'bold',
                        textAlign: 'center',
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

const HotAuthor = ({famousAuthors}) => {
    console.log(famousAuthors)
    return (
        <Row>
            {famousAuthors.map((author) => (
                <Col
                    className="overflow-hidden"
                    key={author.authorId}
                    style={{
                        margin: '15px 1% 30px'
                    }}
                >
                    <img
                        src={author.imgUrl}
                        alt={author.authorName}
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
                    }}>{author.authorName}</p>
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
