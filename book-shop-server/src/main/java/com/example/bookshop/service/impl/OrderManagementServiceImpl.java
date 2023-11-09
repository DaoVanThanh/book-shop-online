package com.example.bookshop.service.impl;


import com.example.bookshop.dto.BookQuantity;
import com.example.bookshop.dto.BookSummary;
import com.example.bookshop.dto.request.GetOrderCostRequest;
import com.example.bookshop.dto.response.*;
import com.example.bookshop.entity.*;
import com.example.bookshop.entity.enums.OrderStatus;
import com.example.bookshop.exception.ElementNotFoundException;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.*;
import com.example.bookshop.service.BookService;
import com.example.bookshop.service.OrderManagementService;
import com.example.bookshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Calendar;

@Service
@RequiredArgsConstructor
public class OrderManagementServiceImpl implements OrderManagementService {
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartDetailRepository cartDetailRepository;
    private final BookRepository bookRepository;
    private final OrderDetailRepository orderDetailRepository;

    private final BookService bookService;

    public GetStatusOrderResponse getStatusOrder(Long orderId) throws ResponseStatusException {
        var order = orderRepository
                .getByOrderId(orderId)
                .orElseThrow(() -> new ElementNotFoundException("order id"));
        return GetStatusOrderResponse.builder().status(order.getStatus()).build();
    }

    public void updateCart(Long bookId, Integer quantity) throws ResponseStatusException {
        Long userId = userService.getUserId();
        Cart cart = cartRepository
                .getCartByUserUserId(userId)
                .orElseThrow(() -> new ParamInvalidException("Rỏ hàng chưa được tạo"));
        bookRepository
                .findById(bookId)
                .orElseThrow(() -> new ElementNotFoundException("Book id"));
        if (quantity == 0) {
            cartDetailRepository.deteleByCartIdAndBookId(bookId, cart.getCartId());
        } else {
            cartDetailRepository.upsertByCartIdAndBookId(bookId, cart.getCartId(), quantity);
        }
    }

    public CreateOrderResponse createOrder(
            String deliveryAddress,
            ArrayList<BookQuantity> bookQuantities
    ) throws ResponseStatusException {
        try {
            if (!bookService.checkBookQuantity(bookQuantities).booleanValue()) {
                throw new ParamInvalidException("Không đủ sách trong kho");
            }
            Long total = bookService.calcCost(bookQuantities);
            Order order = Order.builder()
                    .orderDate(Calendar.getInstance().getTime())
                    .deliveryAddress(deliveryAddress)
                    .status(OrderStatus.CREATING)
                    .totalAmount(total)
                    .user(userService.getUser())
                    .build();

            orderRepository.save(order);
            bookService.removeBooksFromWarehouse(bookQuantities);
            for (BookQuantity bookQuantity : bookQuantities) {
                OrderDetail orderDetail = OrderDetail.builder()
                        .order(order)
                        .book(bookRepository.findById(bookQuantity.getBookId()).orElseThrow())
                        .quantity(bookQuantity.getQuantity())
                        .build();
                orderDetailRepository.save(orderDetail);
            }

            return CreateOrderResponse.builder()
                    .totalCost(total)
                    .orderId(order.getOrderId())
                    .build();
        } catch (Exception e) {
            throw e;
        }
    }

    public void updateStatusOrder(
            Long orderId,
            OrderStatus orderStatus
    ) throws ResponseStatusException {
        if (orderStatus == OrderStatus.CREATING) {
            throw new ParamInvalidException("Không cập nhật trạng thái CREATING");
        }
        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() -> new ElementNotFoundException("order id"));
        if (orderStatus == OrderStatus.CANCEL && order.getStatus() != OrderStatus.CREATING) {
            throw new ParamInvalidException("Không thể hủy đơn hàng đang giao");
        }
        if (orderStatus == OrderStatus.DELIVERING && order.getStatus() != OrderStatus.CREATING) {
            throw new ParamInvalidException("Cập nhật thất bại");
        }
        if (orderStatus == OrderStatus.DELIVERING && order.getStatus() != OrderStatus.CREATING) {
            throw new ParamInvalidException("Cập nhật thất bại");
        }
        if (orderStatus == OrderStatus.DONE && order.getStatus() != OrderStatus.DELIVERING) {
            throw new ParamInvalidException("Cập nhật thất bại");
        }
        order.setStatus(orderStatus);
        orderRepository.save(order);
    }

    public GetAllBookPurchasedResponse getAllBookPurchased() throws ResponseStatusException {
        Long userId = userService.getUserId();
        ArrayList<Long> orderIds = orderRepository.getOrderIdsByUserId(userId);
        ArrayList<Long> bookIds = orderDetailRepository.getBookIdsByOrderIds(orderIds);
        ArrayList<GetBookDetailResponse> bookDetails = bookService.getBookDetails(bookIds);

        return GetAllBookPurchasedResponse
                .builder()
                .books(BookSummary.mappingFromBookDetails(bookDetails))
                .build();
    }

    public GetOrderCostResponse getOrderCost(GetOrderCostRequest request) throws ResponseStatusException {
        return GetOrderCostResponse.builder().totalCost(bookService.calcCost(request.getBookQuantities())).build();
    }

    public GetCartDetailResponse getCartDetail() throws ResponseStatusException {
        Long userId = userService.getUserId();
        Cart cart = cartRepository
                .getCartByUserUserId(userId)
                .orElseThrow(() -> new ParamInvalidException("Rỏ hàng chưa được tạo"));
        ArrayList<CartDetail> cartDetails = cartDetailRepository.getCartDetailsByCart(cart);
        ArrayList<BookQuantity> bookQuantities = new ArrayList<>();
        for (CartDetail cartDetail : cartDetails) {
            bookQuantities.add(BookQuantity.builder()
                    .bookId(cartDetail.getBook().getBookId())
                    .quantity(cartDetail.getQuantity())
                    .build());
        }
        return GetCartDetailResponse.builder()
                .bookQuantities(bookQuantities)
                .build();
    }
}
