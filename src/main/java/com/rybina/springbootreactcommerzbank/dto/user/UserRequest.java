package com.rybina.springbootreactcommerzbank.dto.user;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class UserRequest {

    @NotBlank(message = "Username can not be empty")
    String username;

    @Min(value = 1, message = "The user should be at least 6 years old!")
    int age;
}
