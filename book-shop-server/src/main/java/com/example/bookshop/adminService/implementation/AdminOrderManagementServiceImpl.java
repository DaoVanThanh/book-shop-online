package com.example.bookshop.adminService.implementation;

import com.example.bookshop.adminService.AdminOrderManagementService;
import com.example.bookshop.dto.request.AdminUpdateStatusOrderDto;
import com.example.bookshop.dto.response.AdminOrderManagementDto;
import com.example.bookshop.dto.response.GetOrderStatisticResponse;
import com.example.bookshop.entity.Order;
import com.example.bookshop.entity.enums.OrderStatus;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminOrderManagementServiceImpl implements AdminOrderManagementService {
    @Autowired
    private OrderRepository orderRepository;

    public AdminOrderManagementDto getOrderById(Long orderId) {
        Order order = orderRepository.getByOrderId(orderId).orElse(null);
        return new AdminOrderManagementDto(order);
    }

    public List<AdminOrderManagementDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(AdminOrderManagementDto::new)
                .collect(Collectors.toList());
    }

    public void updateOrderStatus(AdminUpdateStatusOrderDto adminUpdateStatusOrderDto) {
        Long orderId = adminUpdateStatusOrderDto.getOrderId();
        OrderStatus newStatus = adminUpdateStatusOrderDto.getNewStatus();
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(newStatus);
            orderRepository.save(order);
        }
    }

    public GetOrderStatisticResponse getOrderStatistic(Date startDate, Date endDate) throws ResponseStatusException {
        if(startDate.after(endDate)) {
            throw new ParamInvalidException("Start Date và End Date không hợp lệ");
        }
        GetOrderStatisticResponse response = new GetOrderStatisticResponse();
        response.setNumberOfOrder(orderRepository.getStatisticNumberOfOrder(startDate, endDate));
        response.setRevenue(orderRepository.getStatisticRevenue(startDate, endDate));
        response.setNumberOfBook(orderRepository.getStatisticNumberOfBook(startDate, endDate));
        return response;
    }

}
