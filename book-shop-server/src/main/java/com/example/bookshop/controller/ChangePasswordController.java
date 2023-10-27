package com.example.bookshop.controller;

import com.example.bookshop.dto.request.ChangePasswordDto;
import com.example.bookshop.service.impl.ChangePasswordServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ChangePasswordController {
    @Autowired
    private ChangePasswordServiceImpl changePasswordServiceImp;

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
        if (changePasswordServiceImp.changePassword(changePasswordDto)) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.badRequest().body("Incorrect old password");
        }
    }
}

