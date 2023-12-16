package com.example.bookshop.repository;

import com.example.bookshop.entity.Cart;
import com.example.bookshop.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    @Modifying
    @Query(
            value = "insert into cart_details (book_id, cart_id, quantity) " +
                    "values (:book_id, :cart_id, :quantity) " +
                    "on duplicate key update quantity = :quantity", nativeQuery = true)
    @Transactional
    void upsertByCartIdAndBookId(
            @Param("book_id") Long bookId,
            @Param("cart_id") Long cartId,
            @Param("quantity") Integer quantity
    );

    @Modifying
    @Query(
            value = "insert into cart_details (book_id, cart_id, quantity) " +
                    "values (:book_id, :cart_id, :quantity) " +
                    "on duplicate key update quantity = quantity + :quantity", nativeQuery = true)
    @Transactional
    void addBookToCart(
            @Param("book_id") Long bookId,
            @Param("cart_id") Long cartId,
            @Param("quantity") Integer quantity
    );

    @Modifying
    @Query(
            value = "delete from cart_details " +
                    "where book_id = :book_id and cart_id = :cart_id",
            nativeQuery = true)
    @Transactional
    void deteleByCartIdAndBookId(
            @Param("book_id") Long bookId,
            @Param("cart_id") Long cartId
    );

    ArrayList<CartDetail> getCartDetailsByCart(Cart cart);
}