package com.rybina.springbootreactcommerzbank.controller;

import com.rybina.springbootreactcommerzbank.dto.user.UserRequest;
import com.rybina.springbootreactcommerzbank.dto.user.UserResponse;
import com.rybina.springbootreactcommerzbank.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.bind.validation.BindValidationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @ExceptionHandler(BindValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleValidationException(BindValidationException ex) {
        return ResponseEntity.badRequest()
                .body("Invalid data input! " + ex.getMessage());
    }

    @GetMapping
    public ResponseEntity<Page<UserResponse>> getAll(Pageable pageable) {
        Page<UserResponse> users = userService.findAll(pageable);
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<UserResponse> create(@RequestBody @Valid UserRequest userRequest) {
        UserResponse createdUser = userService.create(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}