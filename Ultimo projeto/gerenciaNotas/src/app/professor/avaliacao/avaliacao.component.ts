import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  id_professor = ''
  id_turma = ''
  rg_professor = ''
  nome = ''
  sexo = ''
  user = ''
  listaAlunos = []
  listaNotas = []
  nomeTurma = ''
  id_Materia
  conteudo = ""
  peso
  descricao = ""

  ngOnInit() {
    this.id_turma = this.router.url.charAt(this.router.url.length - 6)
    this.id_professor = this.router.url.charAt(this.router.url.length - 1)
    this.usuarioService.dadosProfessor()
      .then((result: any) => {
        result.find(valor => {
          if (valor.ID == this.id_professor) {
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
            this.user = resultado[i].USUARIO
            if (this.user != localStorage.getItem('USER')) {
              this.router.navigate([''])
            }
          }
        }
      })
    this.usuarioService.dadosAlunos()
      .then((resultadoAluno: any) => {
        resultadoAluno.find(valorAluno => {
          if (valorAluno.ID_TURMA == this.id_turma) {
            this.usuarioService.dadosPessoa()
              .then((resultadoPessoa: any) => {
                resultadoPessoa.find(valorPessoa => {
                  if (valorPessoa.RG == valorAluno.RG_PESSOA) {
                    let info = {
                      nome: valorPessoa.NOME,
                      id_aluno: valorAluno.ID,
                      idade: valorPessoa.IDADE,
                      sexo: valorPessoa.SEXO,
                      email: valorPessoa.EMAIL
                    }

                    this.listaAlunos.push(info)
                  }
                })
              })
          }
        })
      })
    this.usuarioService.dadosMateria()
      .then((result: any) => {
        result.find(valor => {
          if (valor.ID_PROFESSOR == this.id_professor) {
            this.usuarioService.dadosTurma()
              .then((resultado: any) => {
                resultado.find(info => {
                  if (info.ID_CURSO == valor.ID_CURSO) {
                    this.nomeTurma = valor.NOME
                    this.id_Materia = valor.ID
                  }
                })
              })
          }
        })
      })
  }

  voltar() {
    this.router.navigate(['professor/turma', this.id_turma], { queryParams: { id: this.id_professor } })
  }

  cadastrarNota() {
    let checar = false
    let notasPostas = 0
    let preenchido = false
    let numero = 0

    for (let i = 0; i < this.listaNotas.length; i++) {
      if (this.listaNotas[i] != "") {
        notasPostas++
      }

      if (!!+this.listaNotas[i]) {
        numero++
      }
    }

    if (this.conteudo != "" && this.descricao != "" && this.peso != undefined) {
      preenchido = true
    }

    if(notasPostas == this.listaNotas.length){
      if(numero == this.listaNotas.length){
        if(preenchido){
          checar = true
        } else {
          alert("Algum campo nas especificações está em branco!")
        }
      } else {
        alert("Alguma nota não é um número!")
      }
    } else {
      alert("Algum campo está em branco!")
    }

    console.log(notasPostas, " " , numero, " " , preenchido)

    if(checar) {
      this.usuarioService.cadastrarAvaliacao(this.conteudo, this.descricao, this.peso, this.id_Materia)
      this.usuarioService.cadastrarNota
      this.usuarioService.dadosPessoa()
        .then((resultadoPessoa: any) => {
          resultadoPessoa.find(valorPessoa => {
            for (let i = 0; i < this.listaAlunos.length; i++) {
              if (valorPessoa.NOME == this.listaAlunos[i].nome) {
                this.usuarioService.dadosAlunos()
                  .then((resultadoAluno: any) => {
                    resultadoAluno.find(valorAluno => {
                      if (valorPessoa.RG == valorAluno.RG_PESSOA) {
                        this.usuarioService.dadosAvaliacao()
                        .then((resultadoAvaliacao: any) => {
                        this.usuarioService.cadastrarNota(resultadoAvaliacao.length, valorAluno.ID, this.listaNotas[i])
                        this.router.navigate(['professor/turma', this.id_turma], { queryParams: { id: this.id_professor } })
                      })
                        }
                    })
                  })
              }
            }
          })
        })

    }
  }

}
