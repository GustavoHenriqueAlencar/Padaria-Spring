package com.gustavo_spring_usuario.usuario.infrastructure.repository;

import com.gustavo_spring_usuario.usuario.infrastructure.entitys.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
