package com.example.bookshop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ConflictDataException extends ResponseStatusException {

    public ConflictDataException(String message){
        super(HttpStatus.CONFLICT, message);
    }
}
