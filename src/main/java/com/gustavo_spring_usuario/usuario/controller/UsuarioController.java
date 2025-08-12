package com.gustavo_spring_usuario.usuario.controller;


import com.gustavo_spring_usuario.usuario.business.UsuarioService;
import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor

public class UsuarioController {

   private final UsuarioService usuarioService;

   @PostMapping
   public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {
       Usuario usuarioCriado = usuarioService.cadastrarUsuario(usuario);


       return ResponseEntity
               .created(URI.create("/usuario/" + usuarioCriado.getCpf()))  // Adiciona a URI do recurso criado
               .body(usuarioCriado);
   }
   @GetMapping
   public ResponseEntity<Usuario> buscarUsuarioPorCpf(@RequestParam String cpf) {
       return ResponseEntity.ok(usuarioService.buscarUsuarioPorCpf(cpf));
   }
   @DeleteMapping
   public ResponseEntity<Void> deletarUsuarioPorCpf(@RequestParam String cpf) {
       usuarioService.deletarUsuarioPorCpf(cpf);
       return ResponseEntity.ok().build();
   }
   @PutMapping
   public ResponseEntity<Void> alterarUsuarioPorCpf(@RequestParam String cpf, @RequestBody Usuario usuario) {
       usuarioService.alterarUsuarioPorCpf(cpf, usuario);
       return ResponseEntity.ok().build();
   }

}

// package com.gustavo_spring_usuario.usuario.controller;

// import com.gustavo_spring_usuario.usuario.business.UsuarioService;
// import com.gustavo_spring_usuario.usuario.infrastructure.entitys.Usuario;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.net.URI;
// import java.time.LocalDate;

// @RestController
// @RequestMapping("/usuario")
// @RequiredArgsConstructor
// public class UsuarioController {

//     private final UsuarioService usuarioService;

//     @PostMapping
//     public ResponseEntity<Usuario> cadastrarUsuario(
//             @RequestParam String nome,
//             @RequestParam String cpf,
//             @RequestParam String dataNascimento,
//             @RequestParam String email,
//             @RequestParam String telefone
//     ) {
//         Usuario usuario = new Usuario();
//         usuario.setNome(nome);
//         usuario.setCpf(cpf);
//         usuario.setDataNascimento(LocalDate.parse(dataNascimento)); // Ajuste se necessário o formato
//         usuario.setEmail(email);
//         usuario.setTelefone(telefone);

//         Usuario usuarioCriado = usuarioService.cadastrarUsuario(usuario);

//         return ResponseEntity
//                 .created(URI.create("/usuario/" + usuarioCriado.getCpf()))
//                 .body(usuarioCriado);
//     }

//     @GetMapping
//     public ResponseEntity<Usuario> buscarUsuarioPorCpf(@RequestParam String cpf) {
//         return ResponseEntity.ok(usuarioService.buscarUsuarioPorCpf(cpf));
//     }

//     @DeleteMapping
//     public ResponseEntity<Void> deletarUsuarioPorCpf(@RequestParam String cpf) {
//         usuarioService.deletarUsuarioPorCpf(cpf);
//         return ResponseEntity.ok().build();
//     }

//     @PutMapping
//     public ResponseEntity<Void> alterarUsuarioPorCpf(
//             @RequestParam String cpf,
//             @RequestParam String nome,
//             @RequestParam String dataNascimento,
//             @RequestParam String email,
//             @RequestParam String telefone
//     ) {
//         Usuario usuario = new Usuario();
//         usuario.setNome(nome);
//         usuario.setCpf(cpf);
//         usuario.setDataNascimento(LocalDate.parse(dataNascimento)); // Ajuste se necessário
//         usuario.setEmail(email);
//         usuario.setTelefone(telefone);

//         usuarioService.alterarUsuarioPorCpf(cpf, usuario);
//         return ResponseEntity.ok().build();
//     }
// }
