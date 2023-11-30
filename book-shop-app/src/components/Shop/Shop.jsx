import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

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

const PriceFilter = ({ priceRange, onPriceChange }) => {
    const handleSliderChange = (event, newValue) => {
        if (newValue[0] <= newValue[1]) {
            onPriceChange(newValue);
        }
    };

    return (
        <Box sx={{ width: 300 }}>
            <Typography
                id="range-slider"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: 'green',
                    mb: 2,
                    mt: 2,
                    fontSize: '1.8rem',
                    textAlign: 'center'
                }}
            >
                Khoảng giá
            </Typography>

            <Slider
                getAriaLabel={() => 'Price range'}
                value={priceRange}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={999}
                getAriaValueText={(value) => `${value}đ`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{priceRange[0]}.000đ</Typography>
                <Typography>{priceRange[1]}.000đ</Typography>
            </Box>
        </Box>
    );
};


const Categories = ({ categories }) => {
    return (
        <div className="categories">
            <h3>Thể loại sách</h3>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </div>
    );
};


const LeftColumn = ({ priceRange, onPriceChange }) => {
    const categories = ['Tiểu thuyết', 'Kinh doanh', 'Kỹ năng sống', 'Lịch sử'];

    return (
        <div className="left-column">
            <PriceFilter
                priceRange={priceRange}
                onPriceChange={onPriceChange}
            />
            <Categories categories={categories} />
        </div>
    );
};

const RightColumn = ({ products, onSearch, searchKeyword, currentPage, totalPages, handlePageChange, onSort }) => (
    <div className="right-column">
        <div className="search-sort-container">
            <SearchBar onSearch={onSearch} />
            <SortOptions onSort={onSort} />
        </div>
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
    const [products, setProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [totalPages, setTotalPages] = useState(0);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);


    const handleMinPriceChange = (e) => {
        const value = parseInt(e.target.value);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e) => {
        const value = parseInt(e.target.value);
        setMaxPrice(value);
    };

    const [priceRange, setPriceRange] = useState([0, 1000]);

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
    };

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
            <LeftColumn
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
            />
            <RightColumn
                onSort={handleSort}
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
