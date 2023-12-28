import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import {getBestSellerBooks, getFamousAuthors, getNewBooks} from "../../apiServices/AdminApi/ProductManagementService";
import Carousel from 'react-bootstrap/Carousel';
import {Product, ProductGrid} from "../Shop/Shop";
import {Link} from "react-router-dom";

const Home = () => {
    useEffect(() => {
        handleBestSellerBooks(4);
        handleNewBook(4);
        handleFamousAuthors(6);
    }, []);

    const [bestSellerBooks, setBestSellerBooks] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
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

    const handleNewBook = async (size) => {
        await getNewBooks(size)
            .then((response) => {
                setNewBooks(response.data.content)
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

    return (
        <div style={{
            margin: '10px 10%',
            backgroundColor: 'none',
        }}>
            <Slider/>
            <Heading text={'Book Shop'}/>
            <ToShop/>
            <Line/>
            <Heading text={'Sách bán chạy'}/>
            <HomeBook bestSellerBooks={bestSellerBooks}/>
            <Line/>
            {/*<Heading text={'Các tác giả'}/>*/}
            {/*<HotAuthor famousAuthors={famousAuthors}/>*/}
            {/*<Line/>*/}
            <Heading text={'Sách mới'}/>
            <HomeBook bestSellerBooks={newBooks}/>
        </div>
    );
};
const Slider = () => {

    return (
        <Carousel data-bs-theme="dark">

            <Carousel.Item>
                <img src={'slider1.jpeg'}  />
            </Carousel.Item>
            <Carousel.Item>
                <img src={'slider2.jpeg'}  />
            </Carousel.Item>
            <Carousel.Item>
                <img src={'slider3.jpeg'}  />

            </Carousel.Item>

        </Carousel>
    )
}

const ToShop = () => {
    return (
        <div style={{
            marginBottom: '50px',
        }}>
            <p style={{
                color: 'hsl(0, 0%, 0%)',
                textAlign: 'justify',
                marginLeft: '20px',
                fontSize: '20px',

            }}>
                Chào mừng bạn đến với BookShop, nơi mà chúng tôi không chỉ bán sách, mà còn là ngôi nhà dành cho những con tim đam mê và yêu sách. Tại đây, chúng tôi đã tạo ra một không gian tương tác, sôi động, và tràn đầy sự đa dạng, nơi mà mọi độc giả có thể khám phá, chia sẻ, và tìm kiếm những trải nghiệm đọc sách không giới hạn.            </p>
            <Link
                to={`/shop`}
                className="view-more-button"
                style={{backgroundColor: "#228b22"}}>
                Cửa hàng
            </Link>
        </div>
    )
}
const HomeBook = ({ bestSellerBooks }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const getColumnWidth = () => {
        if (windowWidth < 600) {
            return 'repeat(auto-fill, minmax(100%, 1fr))';
        } else if (windowWidth >= 600 && windowWidth < 900) {
            return 'repeat(auto-fill, minmax(40%, 1fr))';
        } else {
            return 'repeat(auto-fill, minmax(20%, 1fr))';
        }
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: getColumnWidth(),
        width: '100%',
        gap: '20px',
        padding: '20px',
    };

    return (
        <div style={gridStyle}>
            {bestSellerBooks.map((product) => (
                <Product key={product.bookId} {...product} />
            ))}
        </div>
    );
};



const imgAuthorDefault = "/author_image/blank_author.jpg";
const HotAuthor = ({famousAuthors}) => {
    const formatAuthorUrl = (url) => {
        if (url === '' || url === null) {
            return imgAuthorDefault
        } else {
            return url
        }
    }
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
                        src={formatAuthorUrl(author.imgUrl)}
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
