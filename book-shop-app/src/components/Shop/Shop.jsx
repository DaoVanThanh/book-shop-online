import React, {useEffect, useState} from 'react';
import './style.css';
import {Link} from "react-router-dom";
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

const Product = ({ title, price, imgUrl, link }) => {
    const imagePath = imgUrl.replace('/public', '');

    return (
        <div className="product">
            <img src={imagePath} alt={title} />
            <h3>{title}</h3>
            <p>{price}đ</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="view-more-button">Xem thêm</a>
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
                    <div key={book.id} className="recommended-book">
                        <a href={book.link} target="_blank" rel="noopener noreferrer">
                            <img
                                src={book.imageUrl}
                                alt={book.name}
                                style={{ maxWidth: '100px', maxHeight: '150px' }}
                            />
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

const RightColumn = ({ products, onSearch, searchKeyword }) => (
    <div className="right-column">
        <SearchBar onSearch={onSearch} />
        <ProductGrid products={products} searchKeyword={searchKeyword} />
    </div>
);

const Shop = () => {
    const recommendedBooks = [
        { id: 4, name: 'Ông già và biển cả', price: 21.22, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/ong-ga-va-bien-ca-dich-thuat-cong-chung-247.jpg',
            link: 'https://web.facebook.com/tcoldd'},
        { id: 5, name: 'Hoàng tử bé', price: 20.88, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/sach-hoang-tu-be-dich-thuat-cong-chung-247.jpg',
            link: 'https://web.facebook.com/tcoldd'},
        { id: 6, name: 'Đắc nhân tâm', price: 22.22, imageUrl: 'https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png',
            link: 'https://web.facebook.com/tcoldd'},
    ];

    const [products, setProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/book/all?page=${currentPage}&size=${pageSize}`)
            .then(response => {
                if (response.data && Array.isArray(response.data.content)) {
                    setProducts(response.data.content);
                } else {
                    console.error('Received invalid data');
                }
            })
            .catch(error => {
                console.error('Error fetching data with axios: ', error);
            });
    }, [currentPage, pageSize]);

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    const handleSort = (option) => {
        setSortOption(option);
    };

    const sortedProducts = () => {
        console.log('Products:', products);

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
            <RightColumn products={sortedProducts()} onSearch={handleSearch} searchKeyword={searchKeyword} />
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        </div>
    );
};

export default Shop;


