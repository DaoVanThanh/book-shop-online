package com.example.bookshop.repository;

import com.example.bookshop.entity.Book;
import com.example.bookshop.entity.Order;
import com.example.bookshop.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Modifying
    @Query(
            value = "select distinct book_id from order_details " +
                    "where order_id IN :order_ids", nativeQuery = true)
    @Transactional
    ArrayList<Long> getBookIdsByOrderIds(
            @Param("order_ids") ArrayList<Long> orderIds
    );

    ArrayList<OrderDetail> getOrderDetailsByOrder(Order order);
}
