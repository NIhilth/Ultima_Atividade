import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nome = ''
  nome_velho = ''
  id
  rg = ''
  rg_velho = ''
  sexo = ''
  email = ''
  usuario = ''
  senha = ''
  user = ''

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    let url = this.router.url
    this.id = url.charAt(url.length -1)
    this.usuarioService.dadosProfessor()
      .then((resultadoProfessor: any) => {
        resultadoProfessor.find(valorProfessor => {
          if (valorProfessor.ID == this.id) {
            this.usuarioService.dadosPessoa()
              .then((resultado: any) => {
                resultado.find(valor => {
                  if (valor.RG == valorProfessor.RG_PESSOA) {
                    this.nome = valor.NOME
                    this.nome_velho = valor.NOME
                    this.sexo = valor.SEXO
                    this.email = valor.EMAIL
                    this.rg = valor.RG
                    this.rg_velho = valor.RG
                    this.usuario = valor.USUARIO
                    this.senha = valor.SENHA
                    this.user = valor.USUARIO
                    if (this.user != localStorage.getItem('USER')) {
                      this.router.navigate([''])
                    }
                  }
                })
              })
          }
        })
      })

  }

  mudarPerfil() {
    this.usuarioService.mudarPessoa(this.rg, this.nome, this.email, this.usuario, this.senha, this.rg_velho)
    this.router.navigate(['professor/', this.id])
  }

  voltar() {
    this.router.navigate(['professor/', this.id])
  }


}
