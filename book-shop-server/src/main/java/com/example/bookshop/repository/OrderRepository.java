package com.example.bookshop.repository;

import com.example.bookshop.entity.Order;
import com.example.bookshop.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> getByOrderId(Long orderId);
    Optional<List<Order>> findByStatus(OrderStatus status);
    @Modifying
    @Query(
            value = "select order_id from orders " +
                    "where user_id = :user_id", nativeQuery = true)


    /*@Modifying
    @Query(
            value = "select order_id from orders " +
                    "where order.status = :status", nativeQuery = true)*/
    @Transactional
    ArrayList<Long> getOrderIdsByUserId(
            @Param("user_id") Long userId
    );
}