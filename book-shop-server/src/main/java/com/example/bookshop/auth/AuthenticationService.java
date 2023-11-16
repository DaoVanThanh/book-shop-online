package com.example.bookshop.auth;

import com.example.bookshop.config.JwtService;
import com.example.bookshop.entity.Cart;
import com.example.bookshop.entity.enums.Role;
import com.example.bookshop.entity.User;
import com.example.bookshop.exception.ParamInvalidException;
import com.example.bookshop.repository.CartRepository;
import com.example.bookshop.repository.UserRepository;
import com.example.bookshop.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationManager authenticationManager;

    public void register(RegisterRequest request) {
        var user = User.builder()
                .fullName(request.getFullName())
                .address(request.getAddress())
                .phoneNumber(request.getPhoneNumber())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();
        userRepository.save(user);
        Cart cart = new Cart();
        cart.setUser(user);
        cartRepository.save(cart);
    }

    public AuthenticationRespone authenticate(AuthenticationResquest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ParamInvalidException("Tài khoản chưa được đăng kí"));
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new ParamInvalidException("Mật khẩu không chính xác");
        }
        var accessToken = jwtService.generateToken(user);
        return AuthenticationRespone.builder()
                .accessToken(accessToken)
                .build();
    }
}
