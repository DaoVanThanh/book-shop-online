package com.example.bookshop.adminService;


import com.example.bookshop.dto.request.AdminUpdateStatusOrderDto;
import com.example.bookshop.dto.response.AdminOrderManagementDto;
import com.example.bookshop.dto.response.GetOrderStatisticResponse;
import org.springframework.web.server.ResponseStatusException;
import com.example.bookshop.dto.OrderSummary;


import java.util.Date;
import java.util.List;


public interface AdminOrderManagementService {

    OrderSummary getOderSummaryById(Long OrderId);
    List<AdminOrderManagementDto> getAllOrders();

    void updateOrderStatus(AdminUpdateStatusOrderDto adminUpdateStatusOrderDto);

    GetOrderStatisticResponse getOrderStatistic(Date startDate, Date endDate) throws ResponseStatusException;
}
