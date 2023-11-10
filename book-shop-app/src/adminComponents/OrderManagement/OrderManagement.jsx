import React, { useEffect, useState } from 'react';
import { Button, Form, Tab, Table, Tabs } from 'react-bootstrap';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const orderStatuses = ['PENDING', 'ACCEPTED', 'DELIVERING', 'SUCCESS', 'RETURNED', 'CANCELLED'];

    // Mock data for orders (you can replace this with actual API calls)
    const sampleOrders = [
        {id: 1, status: 'PENDING', details: 'Order details...'},
        {id: 2, status: 'ACCEPTED', details: 'Order details...'},
        {id: 3, status: 'SUCCESS', details: 'Order details...'},
        {id: 4, status: 'RETURNED', details: 'Order details...'},
        {id: 5, status: 'DELIVERING', details: 'Order details...'},
        {id: 6, status: 'CANCELLED', details: 'Order details...'},
        {id: 7, status: 'SUCCESS', details: 'Order details...'},
        {id: 8, status: 'DELIVERING', details: 'Order details...'},
        {id: 9, status: 'CANCELLED', details: 'Order details...'},
        {id: 10, status: 'RETURNED', details: 'Order details...'},
        {id: 11, status: 'SUCCESS', details: 'Order details...'},
        {id: 12, status: 'PENDING', details: 'Order details...'},
        // Thêm dữ liệu mẫu khác ở đây
    ];

    const [selectedTab, setSelectedTab] = useState(0);
    const [temporaryStatus, setTemporaryStatus] = useState({});

    const handleTabChange = (selectedIndex) => {
        setSelectedTab(selectedIndex);
    };

    const handleEditStatus = (orderId, newStatus) => {
        const updatedTemporaryStatus = { ...temporaryStatus };
        updatedTemporaryStatus[orderId] = newStatus;
        setTemporaryStatus(updatedTemporaryStatus);
    };

    const handleSaveStatus = () => {
        // Chuyển đơn hàng sang tab tương ứng với trạng thái mới
        const updatedOrders = orders.map((order) => ({
            ...order,
            status: temporaryStatus[order.id] || order.status
        }));

        setOrders(updatedOrders);
        setTemporaryStatus({});
    };

    useEffect(() => {
        setOrders(sampleOrders);
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
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Quantity</th>
                                <th>Total Payment</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders
                                .filter((order) => order.status === status)
                                .map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>
                                            <Form.Group>
                                                <Form.Select
                                                    as="select"
                                                    value={temporaryStatus[order.id] || order.status}
                                                    onChange={(e) =>
                                                        handleEditStatus(order.id, e.target.value)
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
                                        <td>Date</td>
                                        <td>Tên KH</td>
                                        <td>Địa chỉ</td>
                                        <td>SDT</td>
                                        <td>Số lượng sách</td>
                                        <td>Tổng số tiền</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                ))}
            </Tabs>
            <Button variant="primary" onClick={handleSaveStatus}>
                Update
            </Button>
        </div>
    );
};

export default OrderManagement;



