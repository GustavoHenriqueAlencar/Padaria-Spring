package com.gustavo_spring_usuario.usuario.business;

import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Usuario;
import com.gustavo_spring_usuario.usuario.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario cadastrarUsuario(Usuario usuario) {
        repository.saveAndFlush(usuario);
        return usuario;
    }

    public Usuario buscarUsuarioPorCpf(String cpf) {
        return repository.findByCpf(cpf).orElseThrow(
                () -> new RuntimeException("CPF não encontrado")
        );
    }

    public List<Usuario> listarUsuarios() {
        return repository.findAll();
    }

    public void deletarUsuarioPorCpf(String cpf) {
        repository.deleteByCpf(cpf);
    }

    public void alterarUsuarioPorCpf(String cpf, Usuario usuario) {
        Usuario usuarioEntity = repository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        if (usuario.getCpf() != null && !usuario.getCpf().equals(usuarioEntity.getCpf())) {
            Optional<Usuario> usuarioExistente = repository.findByCpf(usuario.getCpf());
            if (usuarioExistente.isPresent()) {
                throw new RuntimeException("CPF já cadastrado para outro usuário!");
            }
        }

        Usuario usuarioAlterado = Usuario.builder()
                .id(usuarioEntity.getId())
                .nome(usuario.getNome() != null ? usuario.getNome()
                        : usuarioEntity.getNome())
                .cpf(usuarioEntity.getCpf())
                .dataNascimento(usuario.getDataNascimento() != null ? usuario.getDataNascimento()
                        : usuarioEntity.getDataNascimento())
                .email(usuario.getEmail() != null ? usuario.getEmail()
                        : usuarioEntity.getEmail())
                .telefone(usuario.getTelefone() != null ? usuario.getTelefone()
                        : usuarioEntity.getTelefone())
                .build();

        repository.saveAndFlush(usuarioAlterado);

    }

}
