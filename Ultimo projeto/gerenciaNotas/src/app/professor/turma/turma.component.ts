import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

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
  nomeMateria = ''
  listaProvas = []

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
            if(this.user != localStorage.getItem('USER')){
              this.router.navigate([''])
            }
          }
        }
      })
    this.usuarioService.dadosAlunos()
    .then((resultadoAluno: any) => {
      resultadoAluno.find( valorAluno => {
        if(valorAluno.ID_TURMA == this.id_turma){
          this.usuarioService.dadosPessoa()
          .then((resultadoPessoa: any) => {
            resultadoPessoa.find(valorPessoa => {
              if(valorPessoa.RG == valorAluno.RG_PESSOA){
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
      result.find(valorMateria => {
        if (valorMateria.ID_PROFESSOR == this.id_professor) {
          this.usuarioService.dadosTurma()
            .then((resultado: any) => {
              resultado.find(valorTurma => {
                if (valorTurma.ID_CURSO == valorMateria.ID_CURSO) {
                  this.nomeMateria = valorMateria.NOME
                  this.usuarioService.dadosAvaliacao()
                  .then((resultadoAvaliacao: any) => {
                    resultadoAvaliacao.find(valorAvaliacao => {
                      if(valorAvaliacao.ID_MATERIA ==valorMateria.ID){
                        this.usuarioService.dadosNota()
                        .then((resultadoNota: any) => {
                          let listaNotas = []
                          resultadoNota.find(valorNota => {
                            if(valorNota.ID_AVALIACAO == valorAvaliacao.ID){
                              listaNotas.push(valorNota.NOTA)
                            }
                          })
                          this.listaProvas.push(listaNotas)
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
    this.router.navigate(['professor/turmas', this.id_professor])
  }

  vaiCadastrarNota(){
    this.router.navigate(['professor/cadastrar_nota', this.id_turma], { queryParams: { id: this.id_professor } })
  }

  remover(){
    
  }

}
