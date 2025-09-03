package com.gustavo_spring_usuario.usuario.dto;

import com.gustavo_spring_usuario.usuario.role.UserRole;

public record RegisterDTO(String login, String password, UserRole role) {
}
