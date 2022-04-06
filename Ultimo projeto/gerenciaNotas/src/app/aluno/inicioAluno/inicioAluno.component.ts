import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-inicioAluno',
  templateUrl: './inicioAluno.component.html',
  styleUrls: ['./inicioAluno.component.css']
})
export class InicioAlunoComponent implements OnInit {

  nome
  id
  sexo
  email
  tamanho = 0
  user 

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
    this.usuarioService.dadosAlunos()
      .then((resultadoAluno: any) => {
        resultadoAluno.find(valorAluno => {
          if (valorAluno.ID == this.id) {
            this.usuarioService.dadosTurma()
              .then((resultadoTurma: any) => {
                resultadoTurma.find(valorTurma => {
                  if (valorTurma.ID == valorAluno.ID_TURMA) {
                    this.usuarioService.dadosCurso()
                      .then((resultadoCurso: any) => {
                        resultadoCurso.find(valorCurso => {
                          if (valorCurso.ID == valorTurma.ID_CURSO) {
                            this.usuarioService.dadosMateria()
                              .then((resultadoMateria: any) => {
                                resultadoMateria.find(valorMateria => {
                                  if (valorMateria.ID_CURSO == valorCurso.ID) {
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

  vaiMaterias() {
     this.router.navigate(['aluno/materias', this.id])
  }

  vaiListaProfessores() {
    this.router.navigate(['aluno/professores', this.id])
  }

  vaiPerfil() {
    this.router.navigate(['aluno/perfil', this.id])
  }

  deslogar() {
    localStorage.setItem("USER", '')
    localStorage.setItem("PASSWORD", '')
    localStorage.setItem("PROFESSOR", null)
    localStorage.setItem("ID", null)
    this.router.navigate([''])
  }

}
