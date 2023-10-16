package com.example.bookshop.service.impl;


import com.example.bookshop.entity.Cart;
import com.example.bookshop.dto.response.GetStatusOrderResponse;
import com.example.bookshop.repository.CartDetailRepository;
import com.example.bookshop.repository.CartRepository;
import com.example.bookshop.repository.OrderRepository;
import com.example.bookshop.service.OrderManagementService;
import com.example.bookshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderManagementServiceImpl implements OrderManagementService {
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartDetailRepository cartDetailRepository;

    public GetStatusOrderResponse getStatusOrder(Long orderId) throws NotFoundException {
        var order = orderRepository
                .getByOrderId(orderId)
                .orElseThrow(() -> new NotFoundException());
        return GetStatusOrderResponse.builder().status(order.getStatus()).build();
    }

    public void updateCart(Long bookId, Integer quantity) throws Exception {
        Long userId = userService.getUserId();
        Cart cart = cartRepository
                .getCartByUserUserId(userId)
                .orElseThrow(() -> new Exception());

        if (quantity == 0) {
            cartDetailRepository.deteleByCartIdAndBookId(bookId, cart.getCartId());
        } else {
            cartDetailRepository.upsertByCartIdAndBookId(bookId, cart.getCartId(), quantity);
        }
    }
}
