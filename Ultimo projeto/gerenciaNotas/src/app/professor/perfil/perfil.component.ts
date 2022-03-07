import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id
  rg_professor
  nome
  sexo
  email
  cargo
  listaTurma = []
  tamanho
  alunos = 0

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioService.dadosMateria()
      .then((result: materia[]) => {
        result.find(valor => {
          if (valor.ID_PROFESSOR == this.id) {
            this.listaTurma.push(valor)
            this.tamanho = this.listaTurma.length
            this.usuarioService.dadosTurma()
              .then((resultado: turma[]) => {
                resultado.find(info => {
                  if (info.ID_CURSO == valor.ID_CURSO) {
                    this.usuarioService.dadosAlunos()
                      .then((resultadoALunos: alunos[]) => {
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
      .then((result: professor[]) => {
        result.find(valorProfessor => {
          if (valorProfessor.ID == this.id) {
            this.rg_professor == valorProfessor.RG_PESSOA
          }
        })
      })
    this.usuarioService.dadosPessoa()
      .then((resultado: pessoa[]) => {
        resultado.find(valorPessoa => {
          if (valorPessoa.RG == this.rg_professor) {
            this.nome = valorPessoa.NOME
            this.sexo = valorPessoa.SEXO
            this.email = valorPessoa.EMAIL
          }
        })
      })
    this.usuarioService.dadosTurma()
      .then((resultado: turma[]) => {
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
    //this.router.navigate(['professor/lista', this.id])
  }

  vaiPerfil() {
    //this.router.navigate(['professor/informacoes', this.id])
  }

  deslogar() {
    localStorage.setItem("USER", '')
    localStorage.setItem("PASSWORD", '')
    localStorage.setItem("PROFESSOR", null)
    localStorage.setItem("ID", null)
    this.router.navigate([''])
  }

}

interface materia {
  ID: number
  NOME: string
  CARGA_HORARIA: number
  ID_PROFESSOR: string
  ID_CURSO: number

}

interface turma {
  ID: number
  SIGLA: string
  NOME: string
  PROFESSOR_REGENTE: string
  ID_CURSO: number
}

interface alunos {
  ID_ALUNO: number
  NOTA: number
  RG_PESSOA: string
  ID_TURMA: number
}


interface professor {
  ID: number
  RG_PESSOA: string
}

interface pessoa {
  RG: string
  NOME: string
  IDADE: number
  SEXO: string
  EMAIL: string
  USUARIO: string
  SENHA: string
  PROFESSOR: number
}
