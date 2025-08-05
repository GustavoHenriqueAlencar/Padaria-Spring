package com.gustavo_spring_usuario.usuario.infrastructure.repository;

import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Padaria;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PadariaRepository extends JpaRepository<Padaria, Integer> {

    Optional<Padaria> findById(Integer id);

    @Transactional
    void deleteById(Integer id);

    @Query("SELECT p FROM Padaria p WHERE p.id IN :produtosIds")
    List<Padaria> findAllById(List<Integer> produtosIds);
}
