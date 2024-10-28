package com.rybina.springbootreactcommerzbank.repository;

import com.rybina.springbootreactcommerzbank.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findAllByOrderByEditedAtDesc(Pageable pageable);
}
