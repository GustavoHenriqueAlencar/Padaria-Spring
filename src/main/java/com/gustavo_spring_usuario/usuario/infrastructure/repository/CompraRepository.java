package com.gustavo_spring_usuario.usuario.infrastructure.repository;

import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Compra;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    @Transactional
    void deleteById(Long id);

    List<Compra> findAllByUsuarioId(Integer usuarioId);

    @Query("SELECT c FROM Compra c JOIN c.produtos p WHERE p.id = :produtoId")
    List<Compra> findByProdutosId(@Param("produtoId") Long produtoId);

    Optional<Compra> findById(Long id);

}
