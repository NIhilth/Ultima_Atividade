import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  nome_velho = ''
  nome = ''
  id
  rg = ''
  rg_velho = ''
  sexo = ''
  email = ''
  usuario = ''
  senha = ''

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    let url = this.router.url
    let numero = url.length
    let num2 = numero - 2
    this.id = url.substring(num2, numero)
    this.usuarioService.dadosAlunos()
      .then((resultadoALunos: any) => {
        resultadoALunos.find(valorAluno => {
          if (valorAluno.ID == this.id) {
            this.usuarioService.dadosPessoa()
              .then((resultado: any) => {
                resultado.find(valor => {
                  if (valor.RG == valorAluno.RG_PESSOA) {
                    this.nome_velho = valor.NOME
                    this.nome = valor.NOME
                    this.sexo = valor.SEXO
                    this.email = valor.EMAIL
                    this.rg = valor.RG
                    this.rg_velho = valor.RG
                    this.usuario = valor.USUARIO
                    this.senha = valor.SENHA
                    if (this.usuario != localStorage.getItem('USER')) {
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
    this.usuarioService.mudarPessoa(this.nome, this.email, this.usuario, this.senha, this.rg_velho)
    this.router.navigate(['aluno/', this.id])
  }

  voltar() {
    this.router.navigate(['aluno/', this.id])
  }


}
