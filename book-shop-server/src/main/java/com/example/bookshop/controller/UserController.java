package com.example.bookshop.controller;

import com.example.bookshop.dto.request.UserDto;
import com.example.bookshop.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("info")
    public UserDto getUserInfo() {
        // Sử dụng userService để lấy thông tin từ UserService
        return userService.getUserDto();
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        userService.updateUser(userDto);
        return ResponseEntity.ok("User information updated successfully.");
    }
}
