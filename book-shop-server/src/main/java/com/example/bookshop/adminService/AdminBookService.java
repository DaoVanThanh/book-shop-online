package com.example.bookshop.adminService;


import com.example.bookshop.dto.request.AddBookRequest;
import com.example.bookshop.dto.request.UpdateBookRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public interface AdminBookService {
    void createNewBook(AddBookRequest request) throws ResponseStatusException;

    void updateBook(UpdateBookRequest request) throws ResponseStatusException;
}
