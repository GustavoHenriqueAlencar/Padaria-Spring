package com.gustavo_spring_usuario.usuario.business;


import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Padaria;
import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Usuario;
import com.gustavo_spring_usuario.usuario.infrastructure.repository.PadariaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PadariaService {
    private final PadariaRepository repository;

    public PadariaService(PadariaRepository repository) {
        this.repository = repository;
    }

    public Padaria cadastrarPadaria(Padaria padaria) {
        repository.saveAndFlush(padaria);
        return padaria;
    }

    public Padaria buscarPadariaPorId(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new RuntimeException("Id não encontrado!")
        );
    }

    public List<Padaria> listarPadarias() {
        return repository.findAll();
    }

    public void deletarPadariaPorId(Integer id) {
        repository.deleteById(id);
    }

    public void alterarPadariaPorId(Integer id, Padaria padaria) {
        Padaria padariaEntity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
        Padaria padariaAlterada = Padaria.builder()
                .id(padariaEntity.getId())
                .nome(padaria.getNome() != null ? padaria.getNome()
                        : padariaEntity.getNome())
                .preco(padaria.getPreco() != null ? padaria.getPreco()
                        : padariaEntity.getPreco())
                .build();
        repository.saveAndFlush(padariaAlterada);
    }
}
