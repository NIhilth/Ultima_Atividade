import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  id
  rg_professor = ''
  nome = ''
  sexo = ''
  url = ''
  listaTurma = []
  listaAlunos = []
  listaRegentes = []

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    let url = this.router.url
    this.id = url.charAt(url.length - 1)
    this.usuarioService.dadosProfessor()
      .then((result: any) => {
        result.find(valor => {
          if (valor.ID == this.id) {
            this.rg_professor = valor.RG_PESSOA
          }
        })
      })
    this.usuarioService.dadosPessoa()
      .then((resultado: any) => {
        for (let i = 0; i < resultado.length; i++) {
          if (resultado[i].RG == this.rg_professor) {
            this.nome = resultado[i].NOME
            this.sexo = resultado[i].SEXO
          }
        }
      })
    this.usuarioService.dadosMateria()
      .then((result: any) => {
        result.find(valor => {
          if (valor.ID_PROFESSOR == this.id) {
            this.usuarioService.dadosTurma()
              .then((resultado: any) => {
                resultado.find(info => {
                  if (info.ID_CURSO == valor.ID_CURSO) {
                    let infoTurma = {
                      NOME: valor.NOME,
                      ID: info.ID
                    }
                    this.listaTurma.push(infoTurma)
                    this.usuarioService.dadosAlunos()
                      .then((resultadoALunos: any) => {
                        resultadoALunos.find(valorAluno => {
                          if (valorAluno.ID_TURMA == info.ID) {
                            this.usuarioService.dadosPessoa()
                              .then((resultadoPessoa: any) => {
                                resultadoPessoa.find(valorPessoa => {
                                  if (valorPessoa.RG == valorAluno.RG_PESSOA) {
                                    let infoAluno = {
                                      NOME: valorPessoa.NOME,
                                      ID: valorAluno.ID ,
                                      ID_TURMA: valorAluno.ID_TURMA
                                    }
                                    this.listaAlunos.push(infoAluno)
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
    this.usuarioService.dadosTurma()
      .then((resultado: any) => {
        resultado.find(valor => {
          this.usuarioService.dadosProfessor()
            .then((resultadoProfessor: any) => {
              resultadoProfessor.find(valorProfessor => {
                if (valor.PROFESSOR_REGENTE == valorProfessor.ID) {
                  this.usuarioService.dadosPessoa()
                  .then((resultadoPessoa: any) => {
                    resultadoPessoa.find(valorPessoa => {
                      if (valorPessoa.RG == valorProfessor.RG_PESSOA) {
                        this.listaRegentes.push(valorPessoa.NOME)
                      }
                    })
                  })
                }
              })
            })
        })
      })
  }



  verPerfil() {
    this.router.navigate(['professor/perfil', this.id])
  }

  verTurma(numero) {
    this.router.navigate(['professor/turma', numero], { queryParams: { id: this.id } })
  }

}
