package com.example.bookshop.service.impl;

import org.modelmapper.ModelMapper;
import com.example.bookshop.dto.request.UserDto;
import com.example.bookshop.entity.User;
import com.example.bookshop.repository.UserRepository;
import com.example.bookshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    private ModelMapper modelMapper;
    private final UserRepository userRepository;

    public User getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow();
    }

    public Long getUserId() {
        return getUser().getUserId();
    }

    @Override
    public UserDto getUserDto() {
        User user = this.getUser();
        return this.modelMapper.map(user, UserDto.class);
    }

    @Override
    public User updateUser(UserDto userDto) {
        User user = getUser(); // You need to implement this method to get the current user
        if(userDto.getFullName() == null || userDto.getPhoneNumber() == null || userDto.getAddress() == null) {
            throw new IllegalArgumentException("All fields are required.");
        }
        user.setFullName(userDto.getFullName());
        user.setAddress(userDto.getAddress());
        user.setPhoneNumber(userDto.getPhoneNumber());

        return userRepository.save(user);
    }
}
