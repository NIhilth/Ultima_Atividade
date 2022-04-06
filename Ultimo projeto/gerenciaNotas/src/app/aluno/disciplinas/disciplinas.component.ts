import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {

  id
  nome = ''
  sexo = ''
  listaMaterias = []

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
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
                    this.sexo = valor.sexo
                    if (valor.USUARIO != localStorage.getItem('USER')) {
                      this.router.navigate([''])
                    }
                  }
                })
              })
          }
        })
      })
    this.usuarioService.dadosAlunos()
      .then((resultadoAluno: any) => {
        resultadoAluno.find(valorAluno => {
          if (valorAluno.ID == this.id) {
            this.usuarioService.dadosTurma()
              .then((resultadoTurma: any) => {
                resultadoTurma.find(valorTurma => {
                  if (valorTurma.ID == valorAluno.ID_TURMA) {
                    this.usuarioService.dadosMateria()
                      .then((resultadoMateria: any) => {
                        resultadoMateria.forEach(valorMateria => {
                          if (valorMateria.ID_CURSO == valorTurma.ID_CURSO) {
                            this.usuarioService.dadosProfessor()
                            .then((resultadoProfessor: any) => {
                              resultadoProfessor.find(valorProfessor => {
                                if(valorMateria.ID_PROFESSOR == valorProfessor.ID){
                                  this.usuarioService.dadosPessoa()
                                  .then((resultadoPessoa: any) => {
                                    resultadoPessoa.find(valorPessoa => {
                                      if(valorPessoa.RG == valorProfessor.RG_PESSOA){
                                        let materia = {
                                          nome: valorMateria.NOME,
                                          professorNome: valorPessoa.NOME,
                                          id: valorMateria.ID
                                        }

                                        this.listaMaterias.push(materia)
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
        })
      })
  }

  voltar() {
    this.router.navigate(['aluno/', this.id])
  }

  verTurma(numero) {
    this.router.navigate(['aluno/materia', numero], { queryParams: { id: this.id } })
  }

}
