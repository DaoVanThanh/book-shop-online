package com.example.bookshop.repository;

import com.example.bookshop.entity.Review;
import com.example.bookshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    ArrayList<Review> findAllByUser(User user);
    ArrayList<Review> getReviewsByUserAndBookBookIdIn(User user, ArrayList<Long> bookIds);
}
