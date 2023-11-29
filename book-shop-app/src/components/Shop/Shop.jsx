import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from "react-router-dom";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        onSearch(text);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={handleSearchChange}
            />
            <button>Search</button>
        </div>
    );
};

const Product = ({ title, price, imgUrl, bookId }) => {
    const imagePath = imgUrl.replace('/public', '');

    return (
        <div className="product">
            <img src={imagePath} alt={title} />
            <h3>{title}</h3>
            <p>{price}đ</p>
            <Link to={`/shop/${bookId}`} className="view-more-button">Xem thêm</Link>
        </div>
    );
};


const ProductGrid = ({ products, searchKeyword }) => {
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <div className="product-grid">
            {filteredProducts.map((product) => (
                <Product key={product.bookId} {...product} />
            ))}
        </div>
    );
};


const SortOptions = ({ onSort }) => {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleSort = (option) => {
        setShowOptions(false);
        onSort(option);
    };

    return (
        <div className="sort-options-container">
            <button className="sort-button" onClick={toggleOptions}>
                Sắp xếp các cuốn sách
            </button>
            {showOptions && (
                <ul className="sort-options-list">
                    <li onClick={() => handleSort('price_asc')}>Sắp xếp giá tăng dần</li>
                    <li onClick={() => handleSort('price_desc')}>Sắp xếp giá giảm dần</li>
                    <li onClick={() => handleSort('rating')}>Sắp xếp theo đánh giá</li>
                    <li onClick={() => handleSort('year')}>Sắp xếp theo năm sản suất</li>
                </ul>
            )}
        </div>
    );
};

const RecommendedBooks = ({ recommendedBooks }) => {
    if (!recommendedBooks || recommendedBooks.length === 0) {
        return (
            <div className="recommended-books">
                <h3>Gợi ý của chúng tôi</h3>
                <p>none</p>
            </div>
        );
    }

    return (
        <div className="recommended-books">
            <h3 style={{ color: 'hsl(218, 81%, 75%)' }}>Gợi ý của chúng tôi</h3>
            <div className="recommended-books-list">
                {recommendedBooks.map((book) => (
                    <div key={book.bookId} className="recommended-book">
                        <a href={book.link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={book.imgUrl}
                                alt={book.title}
                                style={{ maxWidth: '200px', maxHeight: '200px' }}
                            />
                            <div style={{ color: 'hsl(218, 81%, 85%)' }}>{book.title}</div>
                        </a>
                        <p style={{ color: 'hsl(218, 81%, 85%)' }}>{book.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );

};

const LeftColumn = ({ onSort, recommendedBooks }) => (
    <div className="left-column">
        <SortOptions onSort={onSort} />
        <RecommendedBooks recommendedBooks={recommendedBooks} />
    </div>
);

const RightColumn = ({ products, onSearch, searchKeyword, currentPage, totalPages, handlePageChange }) => (
    <div className="right-column">
        <SearchBar onSearch={onSearch} />
        <ProductGrid products={products} searchKeyword={searchKeyword} />
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    </div>
);
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumbers.map((pageNumber) => (
                <li
                    key={pageNumber}
                    className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                </li>
            ))}
        </ul>
    );
};

const Shop = () => {
    const recommendedBooks = [
        {
            "bookId": 35,
            "title": "Luật Im Lặng",
            "price": 135000,
            "publication_date": "2023-01-01",
            "stockQuantity": 62,
            "imgUrl": "/book_image/luat-im-lang.jpg"
        },
        {
            "bookId": 31,
            "title": "Chuyện Tình Yêu Loài Người",
            "price": 80100,
            "publication_date": "2023-01-01",
            "stockQuantity": 13,
            "imgUrl": "/book_image/chuyen-tinh-yeu-loai-nguoi.jpg"
        },
        {
            "bookId": 32,
            "title": "Tần Số Cô Đơn",
            "price": 85500,
            "publication_date": "2023-01-01",
            "stockQuantity": 37,
            "imgUrl": "/book_image/tan-so-co-don.jpg"
        },
        {
            "bookId": 33,
            "title": "Ở Quán Cà Phê Của Tuổi Trẻ Lạc Lối",
            "price": 62100,
            "publication_date": "2023-01-01",
            "stockQuantity": 13,
            "imgUrl": "/book_image/o-quan-ca-phe-cua-tuoi-tre-lac-loi.jpg"
        },
    ];

    const [products, setProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/book/all?page=${currentPage}&size=${pageSize}`)
            .then(response => {
                if (response.data && Array.isArray(response.data.content)) {
                    setProducts(response.data.content);
                    setTotalPages(response.data.totalPages);
                } else {
                    console.error('Nhận dữ liệu không hợp lệ');
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu bằng axios: ', error);
            });
    }, [currentPage, pageSize]);

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    const handleSort = (option) => {
        setSortOption(option);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const sortedProducts = () => {
        if (!Array.isArray(products)) {
            return [];
        }

        let sorted = [...products];

        if (sortOption === 'price_asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price_desc') {
            sorted.sort((a, b) => b.price - a.price);
        }

        return sorted;
    };

    return (
        <div className="shop-container">
            <LeftColumn recommendedBooks={recommendedBooks} onSort={handleSort} />
            <RightColumn
                products={sortedProducts()}
                onSearch={handleSearch}
                searchKeyword={searchKeyword}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default Shop;
