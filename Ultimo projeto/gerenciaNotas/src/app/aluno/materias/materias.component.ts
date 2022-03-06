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

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    let url = this.router.url
    this.id = url.charAt(url.length - 1)
    this.usuarioService.dadosAlunos()
      .then((resultadoALunos: alunos[]) => { 
        console.log(resultadoALunos)
        resultadoALunos.find(valorAluno => {
          if (valorAluno.ID == this.id){
            this.usuarioService.dadosPessoa()
            .then((resultado: (Object: (String | boolean)) => []) => {
              for (let i = 0; i < resultado.length; i++) {
                if (resultado[i].RG == valorAluno.RG_PESSOA) {
                  this.nome = resultado[i].NOME
                  this.sexo = resultado[i].SEXO
                  this.email = resultado[i].EMAIL
                }
              }
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
  ID: number
  NOTA: number
  RG_PESSOA: string
  ID_TURMA: number
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
