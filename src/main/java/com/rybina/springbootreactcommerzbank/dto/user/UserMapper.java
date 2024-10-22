package com.rybina.springbootreactcommerzbank.dto.user;

import com.rybina.springbootreactcommerzbank.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse userToUserResponse(User user);

    @Mapping(target = "editedAt", expression = "java(java.time.LocalDateTime.now())")
    User userRequestToUser(UserRequest userRequest);
}
