import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { UsuarioService } from './../../services/usuario.service';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  nome = ''
  id
  rg = ''
  rg_velho = ''
  sexo = ''
  email = ''
  usuario = ''
  senha = ''
  listaAlunos = []

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    let url = this.router.url
    this.id = url.charAt(url.length - 1)
    this.usuarioService.dadosProfessor()
      .then((resultadoProfessor: any) => {
        resultadoProfessor.find(valorProfessor => {
          if (valorProfessor.ID == this.id) {
            this.usuarioService.dadosPessoa()
              .then((resultado: any) => {
                resultado.find(valor => {
                  if (valor.RG == valorProfessor.RG_PESSOA) {
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
    this.usuarioService.dadosMateria()
      .then((result: any) => {
        result.find(valor => {
          if (valor.ID_PROFESSOR == this.id) {
            this.usuarioService.dadosTurma()
              .then((resultado: any) => {
                resultado.find(info => {
                  if (info.ID_CURSO == valor.ID_CURSO) {
                    this.usuarioService.dadosAlunos()
                      .then((resultadoALunos: any) => {
                        resultadoALunos.find(valorAluno => {
                          console.log(valorAluno)
                          if (valorAluno.ID_TURMA == info.ID) {
                            this.usuarioService.dadosPessoa()
                              .then((resultadoPessoa: any) => {
                                resultadoPessoa.find(valorPessoa => {
                                  if (valorPessoa.RG == valorAluno.RG_PESSOA) {
                                    let aluno = {
                                      NOME: valorPessoa.NOME,
                                      TURMA: info.NOME,
                                      ID_ALUNO: valorAluno.ID,
                                      MATERIA: valor.NOME,
                                      STATUS: valorAluno.STATUS
                                    }
                                    this.listaAlunos.push(aluno)
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
    console.log(this.listaAlunos)
  }
  voltar() {
    this.router.navigate(['professor/', this.id])
  }


}
