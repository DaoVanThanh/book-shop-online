import React, { useState } from 'react';
import './style.css';

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

const Product = ({ name, price, imageUrl, link }) => (
    <div className="product">
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p>${price}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="view-more-button">Xem thêm</a>
    </div>
);
const ProductGrid = ({ products, searchKeyword }) => {
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <div className="product-grid">
            {filteredProducts.map((product) => (
                <Product key={product.id} {...product} />
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
            <h3 style={{color: 'hsl(218, 81%, 75%)'}}>Gợi ý của chúng tôi</h3>
            <ul>
                {recommendedBooks.map((book) => (
                    <li style={{color: 'hsl(218, 81%, 85%)'}}   key={book.id}>{book.name}</li>
                ))}
            </ul>
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
    const products = [
        { id: 1, name: 'Chúa tể của những chiếc nhẫn', price: 23.99, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/Chua-te-nhung-chiec-nhan-dich-thuat-cong-chung-247.jpg',
            link: 'https://web.facebook.com/tcoldd'},
        { id: 2, name: 'Nhà giả kim', price: 17.99, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/Nha-gia-kim-dich-thuat-cong-chung-247.jpg',
            link: 'https://web.facebook.com/tcoldd'},
        { id: 3, name: 'Bố già', price: 18.88, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/bo-gia-dich-thuat-cong-chung-247.jpg',
            link: 'https://web.facebook.com/tcoldd'},
        { id: 4, name: 'Ông già và biển cả', price: 21.22, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/ong-ga-va-bien-ca-dich-thuat-cong-chung-247.jpg',
            link: 'https://web.facebook.com/tcoldd'},
        { id: 5, name: 'Hoàng tử bé', price: 20.88, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/sach-hoang-tu-be-dich-thuat-cong-chung-247.jpg',
            link: 'https://web.facebook.com/tcoldd'},
        { id: 6, name: 'Đắc nhân tâm', price: 22.22, imageUrl: 'https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png',
            link: 'https://web.facebook.com/tcoldd'},
    ];

    const recommendedBooks = [
        // Danh sách sách gợi ý
        { id: 7, name: 'Đắc nhân tâm' },
        { id: 8, name: 'Nhà giả kim' },
        { id: 9, name: 'Hoàng tử bé' },
    ];

    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOption, setSortOption] = useState(null);

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    const handleSort = (option) => {
        setSortOption(option);
    };

    const sortedProducts = () => {
        let sorted = [...products];

        if (sortOption === 'price_asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price_desc') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'rating') {

        } else if (sortOption === 'year') {

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
