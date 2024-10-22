package com.rybina.springbootreactcommerzbank.dto.user;

import lombok.Value;

import java.time.LocalDate;

@Value
public class UserResponse {
    Integer id;
    String username;
    int age;
}
