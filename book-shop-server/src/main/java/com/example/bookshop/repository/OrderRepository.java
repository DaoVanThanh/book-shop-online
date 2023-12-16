package com.example.bookshop.repository;

import com.example.bookshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> getByOrderId(Long orderId);
    @Modifying
    @Query(
            value = "select order_id from orders " +
                    "where user_id = :user_id", nativeQuery = true)

    @Transactional
    ArrayList<Long> getOrderIdsByUserId(
            @Param("user_id") Long userId
    );

    ArrayList<Order> getOrdersByUserUserId(Long userId);

    ArrayList<Order> getOrdersByUserUserIdAndOrderIdIn(Long userId, ArrayList<Long> ids);

    @Query(
            value = "SELECT COUNT(*) " +
                    "FROM orders AS o " +
                    "WHERE o.order_date BETWEEN :start_date AND :end_date " +
                    "AND o.status = 'SUCCESS'",
            nativeQuery = true
    )
    @Transactional
    Long getStatisticNumberOfOrder(
            @Param("start_date") Date startDate,
            @Param("end_date") Date endDate
    );

    @Query(
            value = "SELECT SUM(total_amount) " +
                    "FROM orders AS o " +
                    "WHERE o.order_date BETWEEN :start_date AND :end_date " +
                    "AND o.status = 'SUCCESS'",
            nativeQuery = true
    )
    @Transactional
    Long getStatisticRevenue(
            @Param("start_date") Date startDate,
            @Param("end_date") Date endDate
    );

    @Query(
            value = "SELECT COUNT(DISTINCT od.book_id) " +
                    "FROM orders AS o " +
                    "JOIN order_details AS od ON od.order_id = o.order_id " +
                    "WHERE o.order_date BETWEEN :start_date AND :end_date " +
                    "AND o.status = 'SUCCESS'",
            nativeQuery = true
    )
    @Transactional
    Long getStatisticNumberOfBook(
            @Param("start_date") Date startDate,
            @Param("end_date") Date endDate
    );
}