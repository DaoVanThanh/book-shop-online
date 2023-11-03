package com.example.bookshop.service;

<<<<<<< HEAD
import com.example.bookshop.dto.response.GetBookDetailResponse;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

public interface BookService {
    GetBookDetailResponse getBookDetail(Long bookId) throws NotFoundException;
=======
import com.example.bookshop.dto.BookQuantity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;

@Service
public interface BookService {
    Boolean checkBookQuantity(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    Long calcCost(ArrayList<BookQuantity> bookQuantities) throws ResponseStatusException;
    void removeBooksFromWarehouse(ArrayList<BookQuantity> bookQuantities);
>>>>>>> master
}
