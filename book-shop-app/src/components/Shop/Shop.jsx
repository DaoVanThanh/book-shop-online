import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {formatVND} from "../../common";

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
                placeholder="Tìm kiếm theo tên..."
                value={searchText}
                onChange={handleSearchChange}
            />
            <button>Tìm kiếm</button>
        </div>
    );
};

const Product = ({ title, price, imgUrl, bookId }) => {
    const imagePath = imgUrl.replace('/public', '');

    return (
        <div className="product">
            <img src={imagePath} alt={title} />
            <h3>{title}</h3>
            <p>{formatVND(price)}</p>
            <Link to={`/shop/detail/${bookId}`} className="view-more-button">Xem thêm</Link>
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
    const [minInput, setMinInput] = useState(priceRange[0]);
    const [maxInput, setMaxInput] = useState(priceRange[1]);

    const handleMinInputChange = (event) => {
        const newValue = Math.min(Number(event.target.value), maxInput);
        setMinInput(newValue);
        onPriceChange([newValue, maxInput]);
    };

    const handleMaxInputChange = (event) => {
        const newValue = Math.max(Number(event.target.value), minInput);
        setMaxInput(newValue);
        onPriceChange([minInput, newValue]);
    };

    const handleSliderChange = (event, newValue) => {
        setMinInput(newValue[0]);
        setMaxInput(newValue[1]);
        onPriceChange([newValue[0], newValue[1]]);
    };

    const onSearchClick = () => {
        onPriceChange(priceRange);
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Typography id="range-slider" gutterBottom>
                Khoảng giá
            </Typography>

            <div className="slider-container">
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={[minInput, maxInput]}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={999000}
                    step={10000}
                    getAriaValueText={(value) => `${value}đ`}
                />
                <button className="search-button" onClick={onSearchClick}>
                    <FontAwesomeIcon icon={faSearch} />
                    {/*Reset*/}
                </button>
            </div>

            <div className="price-input-container">
                <div className="price-input">
                    <label htmlFor="min-price">Giá tối thiểu: </label>
                    <div className="input-container">
                        <input id="min-price" type="number" value={minInput} onChange={handleMinInputChange} />
                        <span className="unit">đ</span>
                    </div>
                </div>
                <div className="price-input">
                    <label htmlFor="max-price">Giá tối đa: </label>
                    <div className="input-container">
                        <input id="max-price" type="number" value={maxInput} onChange={handleMaxInputChange} />
                        <span className="unit">đ</span>
                    </div>
                </div>
            </div>

        </Box>
    );
};




const Categories = ({ onSelectGenre }) => {
    const [categories, setCategories] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(0);


    useEffect(() => {
        axios.get('http://localhost:8080/api/genre/all')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu thể loại: ', error);
            });
    }, []);

    const displayCategories = showAll ? categories : categories.slice(0, 3);

    const handleGenreClick = (genreId) => () => {
        onSelectGenre(genreId);
        setSelectedGenre(genreId);
    };

    return (
        <div className="categories">
            <h3>Thể loại sách</h3>
            <ul>
                <li key={0} onClick={handleGenreClick(0)}>
                    Tất cả
                </li>
                {displayCategories.map((category) => (
                    <li
                        key={category.genreId}
                        onClick={handleGenreClick(category.genreId)}
                        className={selectedGenre === category.genreId ? 'selected' : ''}
                    >
                        {category.genreName}
                    </li>
                ))}
            </ul>
            {categories.length >= 5 && (
                <button onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Thu Gọn' : 'Xem Thêm thể loại'}
                </button>
            )}
        </div>
    );
};



const LeftColumn = ({ priceRange, onPriceChange, products, totalPages, onSelectGenre }) => {
    const categories = [];

    return (
        <div className="left-column">
            <PriceFilter
                priceRange={priceRange}
                onPriceChange={onPriceChange}
                products={products}
                totalPages={totalPages}
            />
            <Categories categories={categories} onSelectGenre={onSelectGenre}/>
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
        {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        /> */}
    </div>
);
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    const goToPrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    return (
        <ul className="pagination">
            <li>
                <button
                    className="page-link"
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                >
                    Trang trước
                </button>
            </li>
            {pageNumbers.map((pageNumber) => {
                if (totalPages <= maxVisiblePages) {
                    return (
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
                    );
                } else {
                    if (
                        pageNumber <= halfVisiblePages + 1 ||
                        pageNumber >= totalPages - halfVisiblePages ||
                        (pageNumber >= currentPage - halfVisiblePages &&
                            pageNumber <= currentPage + halfVisiblePages)
                    ) {
                        return (
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
                        );
                    } else if (
                        pageNumber === halfVisiblePages + 2 ||
                        pageNumber === totalPages - halfVisiblePages - 1
                    ) {
                        return (
                            <li key={pageNumber} className="page-item">
                                <span className="ellipsis">...</span>
                            </li>
                        );
                    }
                }
            })}
            <li>
                <button
                    className="page-link"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    Trang sau
                </button>
            </li>
        </ul>
    );
};



const Shop = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);


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

    const [priceRange, setPriceRange] = useState([0, 999000]);

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
        fetchProductsByPrice(newRange);
    };
    const fetchProductsByPrice = (range) => {
        axios.get(`http://localhost:8080/api/book/price?min_price=${range[0]}&max_price=${range[1]}&page=0&size=100&sort=asc`)
            .then(response => {
                setProducts(response.data.content);
                setTotalPages(1);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const [genreId, setGenreId] = useState(0);

    const handleSelectGenre = (genreId) => {
        setGenreId(genreId);
        if (genreId === 0) {
            axios.get(`http://localhost:8080/api/book/all?page=0&size=${100}`)
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
        } else {
            axios.get(`http://localhost:8080/api/book/genre/${genreId}?page=${0}&size=${100}`)
                .then(response => {
                    if (response.data && Array.isArray(response.data.content)) {
                        setProducts(response.data.content);
                        setTotalPages(response.data.totalPages);
                    } else {
                        console.error('Nhận dữ liệu không hợp lệ');
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu sách theo thể loại: ', error);
                });
        }
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/api/book/all?page=${currentPage - 1}&size=${100}`)
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
        window.scrollTo(0, 0);
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
        } else if (sortOption === 'year') {
            sorted.sort((a, b) => a.publication_date - b.publication_date);
        } else if (sortOption === 'rating') {
            sorted.sort((a, b) => a.stockQuantity - b.stockQuantity);
        }
        return sorted;
    };

    return (
        <div className="shop-container">
            <img src='https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/banner-col.jpg?1698221845135'></img>
            <div className='shop-grid'>
                <LeftColumn
                    priceRange={priceRange}
                    onPriceChange={handlePriceChange}
                    onSelectGenre={handleSelectGenre}
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
        </div>
    );
};

export { Product, ProductGrid};
export default Shop;
