import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  id = ''
  rg_professor = ''
  nome = ''
  sexo = ''
  url = ''
  listaTurmas = []
  listaAlunos1 = []
  listaAlunos2 = []

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
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
    this.usuarioService.dadosTurma()
      .then((result: (Object: (any)) => []) => {
        for (let i = 0; i < result.length; i++) {
          let turma = result[i].NOME
          let nome_regente
          this.usuarioService.dadosProfessor()
            .then((resultado: (Object: (String)) => []) => {
              for (let j = 0; j < resultado.length; j++) {
                if (resultado[j].ID == result[i].PROFESSOR_REGENTE) {
                  let rg_pessoa_professor = resultado[j].RG_PESSOA
                  this.usuarioService.dadosPessoa()
                    .then((resultadoPessoa: (Object: (String | boolean)) => []) => {
                      for (let k = 0; k < resultadoPessoa.length; k++) {
                        if (resultadoPessoa[k].RG == rg_pessoa_professor) {
                          nome_regente = resultadoPessoa[k].NOME

                          let info = {
                            prof_regente: nome_regente,
                            nome_turma: turma,
                            numero: result[i].ID
                          }

                          this.listaTurmas.push(info)
                        }
                      }
                    })
                }
              }
            })
        }
      })
    this.usuarioService.dadosAlunos()
      .then((result: (Object: (String)) => []) => {
        for (let i = 0; i < result.length; i++) {
          let nome_aluno = ''
          let id_aluno = result[i].ID
          let id_turma = result[i].ID_TURMA
          let rg_aluno = result[i].RG_PESSOA
          this.usuarioService.dadosPessoa()
            .then((resultadoPessoa: (Object: (String | boolean)) => []) => {
              for (let j = 0; j < resultadoPessoa.length; j++) {
                if (rg_aluno == resultadoPessoa[j].RG) {
                  nome_aluno = resultadoPessoa[j].NOME

                  if (id_turma == 1) {
                    let info = {
                      id: id_aluno,
                      nome: nome_aluno,
                      turma: id_turma
                    }

                    this.listaAlunos1.push(info)
                  } else if (id_turma == 2) {
                    let info = {
                      id: id_aluno,
                      nome: nome_aluno,
                      turma: id_turma
                    }

                    this.listaAlunos2.push(info)
                  }
                }
              }
            })
        }
      })
  }

  verPerfil() {
    this.router.navigate(['professor/perfil', this.id])
  }

  verTurma(numero) {
    this.router.navigate(['professor/turma', numero], {queryParams: {id: this.id}})
  }

}
