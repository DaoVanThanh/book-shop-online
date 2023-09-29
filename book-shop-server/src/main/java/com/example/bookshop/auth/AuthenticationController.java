package com.example.bookshop.auth;

import lombok.RequiredArgsConstructor;
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

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
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
