package com.gustavo_spring_usuario.usuario.exceptions;

public class ResourceNotFoundException extends  RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(Long id) {
        super("Recurso não encontrado com o ID: " + id);
    }
}
