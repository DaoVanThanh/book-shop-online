package com.example.bookshop.service;

import com.example.bookshop.dto.request.ChangePasswordDto;
import com.example.bookshop.entity.User;

public interface ChangePassword {
    User getUser();
    boolean changePassword(ChangePasswordDto changePasswordDto);
}
