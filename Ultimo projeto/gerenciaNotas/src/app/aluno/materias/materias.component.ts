import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  nome
  id
  sexo
  email
  tamanho = 0

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
                console.log(resultado)
                resultado.find(valor => {
                  if (valor.RG == valorAluno.RG_PESSOA) {
                    this.nome = valor.NOME
                    this.sexo = valor.SEXO
                    this.email = valor.EMAIL
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
