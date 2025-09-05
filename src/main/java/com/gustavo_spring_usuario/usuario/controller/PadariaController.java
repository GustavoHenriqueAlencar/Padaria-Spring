package com.gustavo_spring_usuario.usuario.controller;

import com.gustavo_spring_usuario.usuario.business.PadariaService;
import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Padaria;
import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/padarias")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:63342")

public class PadariaController {

    private final PadariaService padariaService;

    @PostMapping
    public ResponseEntity<Padaria> cadastrarPadaria(@RequestBody Padaria padaria) {
        Padaria padariaCriada = padariaService.cadastrarPadaria(padaria);
        return ResponseEntity
                .created(URI.create("/padarias/" + padariaCriada.getId()))
                .body(padariaCriada);
    }
    @GetMapping
    public ResponseEntity<Padaria> buscarPadariaPorId(@RequestParam Integer id) {
        return ResponseEntity.ok(padariaService.buscarPadariaPorId(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Padaria>> listarPadarias() {
        List<Padaria> produtos = padariaService.listarPadarias();
        return ResponseEntity.ok(produtos);
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarPadariaPorId(@RequestParam Integer id) {
        padariaService.deletarPadariaPorId(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping
    public ResponseEntity<Void> alterarPadariaPorId(@RequestParam Integer id, @RequestBody Padaria padaria) {
        padariaService.alterarPadariaPorId(id, padaria);
        return ResponseEntity.ok().build();
    }

}
