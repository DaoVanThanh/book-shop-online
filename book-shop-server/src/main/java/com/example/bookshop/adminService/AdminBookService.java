package com.example.bookshop.adminService;


import com.example.bookshop.dto.request.AddBookRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public interface AdminBookService {
    public void createNewBook(AddBookRequest request) throws ResponseStatusException;
}
