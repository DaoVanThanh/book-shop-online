package com.example.bookshop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ElementNotFoundException extends ResponseStatusException {

    public ElementNotFoundException(String message){
        super(HttpStatus.NOT_FOUND, message);
    }
}