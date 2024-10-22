package com.rybina.springbootreactcommerzbank.service;

import com.rybina.springbootreactcommerzbank.dto.user.UserMapper;
import com.rybina.springbootreactcommerzbank.dto.user.UserRequest;
import com.rybina.springbootreactcommerzbank.dto.user.UserResponse;
import com.rybina.springbootreactcommerzbank.model.User;
import com.rybina.springbootreactcommerzbank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public Page<UserResponse> findAll(Pageable pageable) {
        return userRepository.findAllByOrderByEditedAtDesc(pageable)
                .map(userMapper::userToUserResponse);
    }


    public UserResponse create(UserRequest userRequest) {
        User user = userMapper.userRequestToUser(userRequest);
        userRepository.save(user);
        log.info("User {} successfully added", user.getId());
        return userMapper.userToUserResponse(user);
    }
}
