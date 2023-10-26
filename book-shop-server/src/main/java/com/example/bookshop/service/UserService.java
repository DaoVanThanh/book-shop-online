package com.example.bookshop.service;

import com.example.bookshop.dto.request.UserDto;
import com.example.bookshop.entity.User;

public interface UserService {
    User getUser();
    Long getUserId();
    UserDto getUserDto();
    User updateUser(UserDto userDto);
}
