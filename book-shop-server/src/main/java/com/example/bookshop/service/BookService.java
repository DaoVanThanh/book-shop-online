package com.example.bookshop.service;

import com.example.bookshop.dto.response.GetBookDetailResponse;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

public interface BookService {
    GetBookDetailResponse getBookDetail(Long bookId) throws NotFoundException;
}
