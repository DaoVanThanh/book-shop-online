package com.example.bookshop.service.impl;

import com.example.bookshop.dto.request.ChangePasswordDto;
import com.example.bookshop.entity.User;
import com.example.bookshop.repository.UserRepository;
import com.example.bookshop.service.ChangePassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class ChangePasswordServiceImpl implements ChangePassword {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow();
    }

    public boolean changePassword(ChangePasswordDto changePasswordDto) {
        var user = getUser();
        if (passwordEncoder.matches(changePasswordDto.getOldPassword(), user.getPassword())) {
            String hashedNewPassword = passwordEncoder.encode(changePasswordDto.getNewPassword());
            user.setPassword(hashedNewPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }

}

