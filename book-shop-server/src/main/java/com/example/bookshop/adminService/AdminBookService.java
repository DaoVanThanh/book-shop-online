package com.example.bookshop.adminService;


import com.example.bookshop.dto.request.AddBookRequest;
import com.example.bookshop.dto.request.UpdateBookRequest;
import com.example.bookshop.dto.response.GetBookStatisticResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Service
public interface AdminBookService {
    void createNewBook(AddBookRequest request) throws ResponseStatusException;

    void updateBook(UpdateBookRequest request) throws ResponseStatusException;

    Page<GetBookStatisticResponse> getBookStatistic(Integer page, Integer size, Date startDate, Date endDate) throws ResponseStatusException;
}
