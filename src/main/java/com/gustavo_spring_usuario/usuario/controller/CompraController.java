package com.gustavo_spring_usuario.usuario.controller;

import com.gustavo_spring_usuario.usuario.business.CompraService;
import com.gustavo_spring_usuario.usuario.dto.CompraRequestDTO;
import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Compra;
import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Padaria;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compra")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:63342")

public class CompraController {

    private final CompraService compraService;

    @PostMapping
    public ResponseEntity<Compra> criarCompra(@RequestBody CompraRequestDTO dto) {
        Compra novaCompra = compraService.criarCompraComDTO(dto);
        return ResponseEntity.ok(novaCompra);
    }

    @GetMapping
    public ResponseEntity<List<Compra>> buscarCompraComDTO(@RequestParam (required = false) Integer usuarioId,
                                                           @RequestParam(required = false) Long produtoId) {

        CompraRequestDTO dto = new CompraRequestDTO();
        dto.setUsuarioId(usuarioId);
        dto.setProdutoId(produtoId);

        List<Compra> compras = compraService.buscarCompraComDTO(dto);
        return ResponseEntity.ok(compras);

    }

    @GetMapping("/all")
    public ResponseEntity<List<Compra>> listarCompras() {
        List<Compra> compras = compraService.listarCompras();
        return ResponseEntity.ok(compras);
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarCompra(@RequestParam Long id) {
        compraService.deletarCompra(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Compra> alterarCompraPorId(@RequestParam Long id, @RequestBody CompraRequestDTO dto) {
        compraService.alterarCompraComDTO(id, dto);
        return ResponseEntity.ok().build();
    }

}
