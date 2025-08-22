package com.gustavo_spring_usuario.usuario.business;

import com.gustavo_spring_usuario.usuario.dto.CompraRequestDTO;
import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Compra;
import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Padaria;
import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Usuario;
import com.gustavo_spring_usuario.usuario.infrastructure.repository.CompraRepository;
import com.gustavo_spring_usuario.usuario.infrastructure.repository.PadariaRepository;
import com.gustavo_spring_usuario.usuario.infrastructure.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompraService {

    private final CompraRepository compraRepository;
    private final UsuarioRepository usuarioRepository;
    private final PadariaRepository padariaRepository;

    public Compra criarCompraComDTO(CompraRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario não encontrado!"));

        List<Padaria> produtos = padariaRepository.findAllById(dto.getProdutosIds());


        Compra compra = Compra.builder()
                .usuario(usuario)
                .produtos(produtos)
                .dataCompra(LocalDateTime.now())
                .valorTotal(calcularValorTotal(produtos))
                .build();

        return compraRepository.save(compra);

    }

    public List<Compra> listarCompras() {
        return compraRepository.findAll();
    }


    public List<Compra> buscarCompraComDTO(CompraRequestDTO dto) {

        List<Compra> busca = (dto.getUsuarioId() != null) ? compraRepository.findAllByUsuarioId(dto.getUsuarioId())
                : compraRepository.findByProdutosId(dto.getProdutoId());
        return busca;
    }

    public void deletarCompra(Long id) {
        compraRepository.deleteById(id);
    }

    public void alterarCompraComDTO(Long id, CompraRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario não encontrado!"));

        List<Padaria> produtos = padariaRepository.findAllById(dto.getProdutosIds());

        Compra compraEntity = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra não encontrado!"));



        Compra compraAlterada = Compra.builder()
                .id(compraEntity.getId())
                .usuario(usuario)
                .produtos(produtos)
                .dataCompra(compraEntity.getDataCompra())
                .valorTotal(calcularValorTotal(produtos))
                .build();

        compraRepository.save(compraAlterada);
    }

    private Double calcularValorTotal(List<Padaria> produtos){
        return produtos.stream()
                .map(Padaria::getPreco)
                .reduce(0.0, Double::sum);
    }
}
