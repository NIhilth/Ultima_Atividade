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
  listaTurma = []
  tamanho 
  alunos

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
          }
        })
      })
    
     

    let url = this.router.url
    this.id = url.charAt(url.length - 1)
    this.usuarioService.dadosProfessor()
      .then((result: (Object: (String)) => []) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].ID == this.id) {
            this.rg_professor = result[i].RG_PESSOA

          }
        }
      })
    this.usuarioService.dadosPessoa()
      .then((resultado: (Object: (String | boolean)) => []) => {
        for (let i = 0; i < resultado.length; i++) {
          if (resultado[i].RG == this.rg_professor) {
            this.nome = resultado[i].NOME
            this.sexo = resultado[i].SEXO
          }
        }
      })
    
  }

  vai() {
    this.router.navigate(['professor/turmas', this.id])
  }

}


interface materia {
  CARGA_HORARIA: number
  CODIGO: number
  ID_CURSO: number
  ID_PROFESSOR: string
  NOME: string
}