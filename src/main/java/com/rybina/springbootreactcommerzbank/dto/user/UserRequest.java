package com.rybina.springbootreactcommerzbank.dto.user;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class UserRequest {

    @NotBlank(message = "Name can not be empty")
    String name;

    @Min(value = 1, message = "The age should be positive")
    int age;
}
