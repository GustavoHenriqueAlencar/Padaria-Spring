package com.gustavo_spring_usuario.usuario.business;

import com.gustavo_spring_usuario.usuario.infrastructure.entitys.User;
import com.gustavo_spring_usuario.usuario.infrastructure.repository.UserRepository;
import com.gustavo_spring_usuario.usuario.role.UserRole;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class AuthorizationService {

    private final UserRepository repository;


    public AuthorizationService(UserRepository repository) {
        this.repository = repository;
    }

    public boolean userExists(String username) {
        return repository.findByUsername(username) != null;
    }

    public void registerUser(String login, String password, String roleStr) {
        if (userExists(login)) {
            throw new RuntimeException("User already exists");
        }

        String encryptPassword = new BCryptPasswordEncoder().encode(password);
        UserRole roleEnum;

        try {
            roleEnum = UserRole.valueOf(roleStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role! Use ADMIN or USER");
        }

        User newUser = new User(login, encryptPassword, roleEnum);
        repository.save(newUser);

    }

    public User findByLogin(String login) {
        return repository.findByUsername(login);
    }
}
