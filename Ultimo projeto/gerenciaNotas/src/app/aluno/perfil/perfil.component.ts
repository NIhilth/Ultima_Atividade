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
  id
  rg = ''
  rg_velho = ''
  sexo = ''
  email = ''
  tamanho = 0
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
                    this.nome = valor.NOME
                    this.sexo = valor.SEXO
                    this.email = valor.EMAIL
                    this.rg = valor.RG
                    this.rg_velho = valor.RG
                    this.usuario = valor.USUARIO
                    this.senha = valor.SENHA
                  }
                })
              })
          }
        })
      })
    this.usuarioService.dadosAlunos()
    .then((resultadoAluno: any) => {
      resultadoAluno.find(valorAluno => {
        if(valorAluno.ID == this.id){
          this.usuarioService.dadosTurma()
          .then((resultadoTurma: any) => {
            resultadoTurma.find(valorTurma => {
              if(valorTurma.ID == valorAluno.ID_TURMA){
                this.usuarioService.dadosCurso()
                .then((resultadoCurso: any) => {
                  resultadoCurso.find(valorCurso => {
                    if(valorCurso.ID == valorTurma.ID_CURSO){
                      this.usuarioService.dadosMateria()
                      .then((resultadoMateria: any) => {
                        resultadoMateria.find(valorMateria => {
                          if(valorMateria.ID_CURSO == valorCurso.ID){
                            this.tamanho++
                          }
                        })
                      })
                    }
                  })
                })
              }
            })
          })
        }
      })
    })

  }

  vai() {
    // this.router.navigate(['professor/turmas', this.id])
  }

  vaiLista() {
    //this.router.navigate(['professor/lista', this.id])
  }

  mudarPerfil() {
    this.usuarioService.mudarPessoa(this.rg, this.nome, this.email, this.usuario, this.senha, this.rg_velho)
    this.router.navigate(['aluno/', this.id])
  }

  voltar() {
    this.router.navigate(['aluno/', this.id])
  }


}
