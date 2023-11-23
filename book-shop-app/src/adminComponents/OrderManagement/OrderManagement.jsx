import React, { useEffect, useState } from 'react';
import { Button, Form, Tab, Table, Tabs } from 'react-bootstrap';
import './OrderManagement.css';

import {getAllOrders,updateStateOrder} from "../../apiServices/AdminApi/AdminOrmService";

const OrderManagement = () => {

    const [orders, setOrders] = useState([]);
    const orderStatuses = ['PENDING', 'ACCEPTED', 'DELIVERING', 'SUCCESS', 'RETURNED', 'CANCELLED'];
    useEffect(() => {
        getAllOrders()
            .then((response) => {
                const allOrders = response.data;
                setOrders(allOrders);
            })
            .catch((error) => {
                console.error("Error fetching account info", error);
            });
    }, []);

    const [selectedTab, setSelectedTab] = useState(0);
    const [temporaryStatus, setTemporaryStatus] = useState({});

    const handleTabChange = (selectedIndex) => {
        setSelectedTab(selectedIndex);
    };

    const handleEditStatus = (orderId, newStatus) => {
        const updatedTemporaryStatus = {...temporaryStatus};
        updatedTemporaryStatus[orderId] = newStatus;
        setTemporaryStatus(updatedTemporaryStatus);
    };

    const handleSaveStatus = () => {
        const updatedOrders = orders.map((order) => ({
            ...order,
            status: temporaryStatus[order.orderId] || order.status
        }));

        updatedOrders.map((order) => {
            const newState = {
              orderId:order.orderId,
              newStatus:order.status
            };
            updateStateOrder(newState).then(
                () => {
                })})
        setOrders(updatedOrders);
        setTemporaryStatus({});
    };

    useEffect(() => {
        setOrders(orders);
    }, []);

    return (
        <div className="container">
            <h1>Order Management</h1>
            <Tabs activeKey={selectedTab} onSelect={handleTabChange}>
                {orderStatuses.map((status, index) => (
                    <Tab eventKey={index} title={status} key={status}>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Ngày đặt hàng</th>
                                <th>Trạng thái</th>
                                <th>Tên khách hàng</th>
                                <th>Tên tài khoản</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Giá trị đơn hàng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders
                                .filter((order) => order.status === status)
                                .map((order) => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.orderDate}</td>
                                        <td>
                                            <Form.Group>
                                                <Form.Select
                                                    as="select"
                                                    value={temporaryStatus[order.orderId] || order.status}
                                                    onChange={(e) =>
                                                        handleEditStatus(order.orderId, e.target.value)
                                                    }
                                                >
                                                    {orderStatuses.map((newStatus) => (
                                                        <option key={newStatus} value={newStatus}>
                                                            {newStatus}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </td>
                                        <td>{order.fullName}</td>
                                        <td>{order.userName}</td>
                                        <td>{order.phoneNumber}</td>
                                        <td>{order.deliveryAddress}</td>
                                        <td>{order.totalAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                ))}
            </Tabs>
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            <Button variant="primary" onClick={handleSaveStatus}>
                Update
            </Button>
        </div>
    );
};

export default OrderManagement;



