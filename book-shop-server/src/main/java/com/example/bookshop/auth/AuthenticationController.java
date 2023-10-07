package com.example.bookshop.auth;

import com.example.bookshop.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @Autowired
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        if(userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Tên người dùng đã tồn tại");
        }
        authenticationService.register(request);
        return ResponseEntity.ok("Register successfully");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationRespone> authenticate(
            @RequestBody AuthenticationResquest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshAuthenticationToken(@RequestBody AuthenticationRefreshRequest refreshRequest) throws Exception {
        try {
            AuthenticationRespone respone = authenticationService.refreshAuthenticationToken(refreshRequest.getRefreshToken());
            return ResponseEntity.ok(respone);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }

}
