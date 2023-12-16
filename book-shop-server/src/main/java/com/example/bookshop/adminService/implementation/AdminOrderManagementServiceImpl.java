package com.example.bookshop.adminService.implementation;


import com.example.bookshop.adminService.AdminOrderManagementService;
import com.example.bookshop.dto.BookQuantitySummary;
import com.example.bookshop.dto.BookSummary;
import com.example.bookshop.dto.OrderSummary;
import com.example.bookshop.dto.request.AdminUpdateStatusOrderDto;
import com.example.bookshop.dto.response.AdminOrderManagementDto;
import com.example.bookshop.dto.response.GetBookDetailResponse;
import com.example.bookshop.dto.response.GetOrderStatisticResponse;
import com.example.bookshop.entity.Order;
import com.example.bookshop.entity.OrderDetail;
import com.example.bookshop.entity.enums.OrderStatus;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.OrderDetailRepository;
import com.example.bookshop.repository.OrderRepository;
import com.example.bookshop.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminOrderManagementServiceImpl implements AdminOrderManagementService {
    @Autowired
    private OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository ;
    private final BookService bookService;

    public AdminOrderManagementServiceImpl(OrderDetailRepository orderDetailRepository,BookService bookService ) {
        this.orderDetailRepository = orderDetailRepository;
        this.bookService = bookService ;
    }


    public OrderSummary getOderSummaryById(Long orderId) {
        Order order = orderRepository.getByOrderId(orderId).orElse(null);
        ArrayList<OrderDetail> orderDetails = orderDetailRepository.getOrderDetailsByOrder(order);
        ArrayList<BookQuantitySummary> bookQuantitySummaries = new ArrayList<>();
        for (OrderDetail orderDetail : orderDetails) {
            GetBookDetailResponse bookDetail = bookService.getBookDetail(orderDetail.getBook().getBookId());
            BookSummary bookSummary = new BookSummary();
            bookSummary.mapping(bookDetail);
            bookSummary.setPrice(orderDetail.getPrice());
            bookQuantitySummaries.add(BookQuantitySummary
                    .builder()
                    .bookSummary(bookSummary)
                    .quantity(orderDetail.getQuantity())
                    .build()
            );
        }
        assert order != null;
        OrderSummary orderSummary = new OrderSummary();
        orderSummary.setBookQuantitySummaries(bookQuantitySummaries);
        orderSummary.setOrderId(orderId);
        orderSummary.setOrderDate(order.getOrderDate());
        orderSummary.setDeliveryAddress(order.getDeliveryAddress());
        orderSummary.setStatus(order.getStatus());
        orderSummary.setTotalAmount(order.getTotalAmount());
        return orderSummary;
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
        if (startDate.after(endDate)) {
            throw new ParamInvalidException("Start Date và End Date không hợp lệ");
        }
        GetOrderStatisticResponse response = new GetOrderStatisticResponse();
        response.setNumberOfOrder(orderRepository.getStatisticNumberOfOrder(startDate, endDate));
        response.setRevenue(orderRepository.getStatisticRevenue(startDate, endDate));
        response.setNumberOfBook(orderRepository.getStatisticNumberOfBook(startDate, endDate));
        return response;
    }

}
