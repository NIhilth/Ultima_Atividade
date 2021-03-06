import { UsuarioService } from '../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicioProfessor',
  templateUrl: './inicioProfessor.component.html',
  styleUrls: ['./inicioProfessor.component.css']
})
export class InicioProfessorComponent implements OnInit {

  id
  rg_professor = ''
  nome = ''
  sexo = ''
  email = ''
  cargo = ''
  listaTurma = []
  tamanho
  alunos = 0
  user = ''

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioService.dadosMateria()
      .then((result: any) => {
        result.find(valor => {
          if (valor.ID_PROFESSOR == this.id) {
            this.listaTurma.push(valor)
            this.tamanho = this.listaTurma.length
            this.usuarioService.dadosTurma()
              .then((resultado: any) => {
                resultado.find(info => {
                  if (info.ID_CURSO == valor.ID_CURSO) {
                    this.usuarioService.dadosAlunos()
                      .then((resultadoALunos: any) => {
                        resultadoALunos.find(valorAluno => {
                          if (valorAluno.ID_TURMA == info.ID) {
                            this.alunos++
                          }
                        })
                      })
                  }
                })
              })
          }
        })
      })
    let url = this.router.url
    this.id = url.charAt(url.length - 1)
    this.usuarioService.dadosProfessor()
      .then((result: any) => {
        result.find(valorProfessor => {
          if (valorProfessor.ID == this.id) {
            this.rg_professor = valorProfessor.RG_PESSOA
          }
        })
      })
    this.usuarioService.dadosPessoa()
      .then((resultado: any) => {
        resultado.find(valorPessoa => {
          if (valorPessoa.RG == this.rg_professor) {
            this.nome = valorPessoa.NOME
            this.sexo = valorPessoa.SEXO
            this.email = valorPessoa.EMAIL
            this.user = valorPessoa.USUARIO
            if(this.user != localStorage.getItem('USER')){
              this.router.navigate([''])
            }
          }
        })
      })
    this.usuarioService.dadosTurma()
      .then((resultado: any) => {
        this.cargo = "Professor"
        resultado.find(valor => {
          if (this.id == valor.PROFESSOR_REGENTE) {
            this.cargo = "Professor Regente"
          }
        })
      })
  }

  vai() {
    this.router.navigate(['professor/turmas', this.id])
  }

  vaiLista() {
    this.router.navigate(['professor/alunos', this.id])
  }

  vaiPerfil() {
    this.router.navigate(['professor/perfil', this.id])
  }

  deslogar() {
    localStorage.setItem("USER", '')
    localStorage.setItem("PASSWORD", '')
    localStorage.setItem("PROFESSOR", null)
    localStorage.setItem("ID", null)
    this.router.navigate([''])
  }

}