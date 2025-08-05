package com.gustavo_spring_usuario.usuario.dto;

import lombok.Data;

import java.util.List;

@Data
public class CompraRequestDTO {
    private Integer usuarioId;
    private Long produtoId;
    private List<Integer> produtosIds;
}
