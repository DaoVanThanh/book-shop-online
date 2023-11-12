import React from 'react';
import './style.css';
const SearchBar = () => (
    <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
    </div>
);

const PriceFilter = () => {
    return (
        <div className="price-filter">
            <span>$10</span>
            <input type="range" min="10" max="30" />
            <span>$30</span>
        </div>
    );
};

const CategoryList = () => {
    return (
        <ul>
            <li>Danh sách sản phẩm</li>
        </ul>
    );
};

const Product = ({ name, price, imageUrl }) => {
    return (
        <div className="product">
            <img src={imageUrl} alt={name} />
            <h3>{name}</h3>
            <p>${price}</p>
        </div>
    );
};

const ProductGrid = ({ products }) => {
    return (
        <div className="product-grid">
            {products.map(product => (
                <Product key={product.id} {...product} />
            ))}
        </div>
    );
};

const Sidebar = ({ recentProducts }) => {
    return (
        <div>
            <h3>Recently Viewed</h3>
            {recentProducts.map(product => (
                <Product key={product.id} {...product} />
            ))}
        </div>
    );
};


const Shop = () => {
    const products = [
        { id: 1, name: 'Chúa tể của những chiếc nhẫn', price: 23.99, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/Chua-te-nhung-chiec-nhan-dich-thuat-cong-chung-247.jpg' },
        { id: 2, name: 'Nhà giả kim', price: 17.99, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/Nha-gia-kim-dich-thuat-cong-chung-247.jpg'},
        { id: 3, name: 'Bố già', price: 18.88, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/bo-gia-dich-thuat-cong-chung-247.jpg' },
        { id: 3, name: 'Ông già và biển cả', price: 21.22, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/ong-ga-va-bien-ca-dich-thuat-cong-chung-247.jpg' },
        { id: 3, name: 'Hoàng tử bé', price: 20.88, imageUrl: 'https://dichthuatcongchung247.com/wp-content/uploads/2022/05/sach-hoang-tu-be-dich-thuat-cong-chung-247.jpg' },
        { id: 3, name: 'Đắc nhân tâm', price: 22.22, imageUrl: 'https://www.reader.com.vn/uploads/images/2019/10/30/19/dac-nhan-tam_600x865.png' },
        ];


    return (
        <div>
            <div className="search-filter-container">
                <SearchBar />
                <PriceFilter />
            </div>
            {/*<CategoryList />*/}
            <ProductGrid products={products} />
            <Sidebar recentProducts={products.slice(0, 2)} />
        </div>
    );
};

export default Shop;
