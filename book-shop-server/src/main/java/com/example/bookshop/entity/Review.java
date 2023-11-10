package com.example.bookshop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Data
@Entity
@Builder
@Table(name = "reviews", uniqueConstraints = {@UniqueConstraint(columnNames = {"book_id", "user_id"})})
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(name = "review", columnDefinition = "TEXT")
    @Lob
    @NotNull
    private String review;

    @Column(name = "point")
    @NotNull
    private Integer point;

    @Column(name = "review_date")
    private Date reviewDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
}
