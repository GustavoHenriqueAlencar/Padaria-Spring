package com.gustavo_spring_usuario.usuario.role;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum UserRole {

    ADMIN("admin"),

    USER("user");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    @JsonValue
    public String getRole() {
        return role;
    }

    @JsonCreator
    public static UserRole fromRole(String value) {
        for (UserRole role : UserRole.values()) {
            if (role.role.equalsIgnoreCase(value)) {
                return role;
            }
        }

        throw new IllegalArgumentException("Invalid role" + value);
    }
}
