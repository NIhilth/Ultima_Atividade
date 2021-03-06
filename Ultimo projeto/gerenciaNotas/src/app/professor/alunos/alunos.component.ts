import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  nome = ''
  id
  rg = ''
  rg_velho = ''
  sexo = ''
  email = ''
  usuario = ''
  senha = ''
  listaAlunos = []
  user = ''

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    let url = this.router.url
    this.id = url.charAt(url.length - 1)
    this.usuarioService.dadosProfessor()
      .then((resultadoProfessor: any) => {
        resultadoProfessor.find(valorProfessor => {
          if (valorProfessor.ID == this.id) {
            this.usuarioService.dadosPessoa()
              .then((resultado: any) => {
                resultado.find(valor => {
                  if (valor.RG == valorProfessor.RG_PESSOA) {
                    this.nome = valor.NOME
                    this.sexo = valor.SEXO
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
    this.usuarioService.dadosMateria()
      .then((result: any) => {
        result.find(valor => {
          if (valor.ID_PROFESSOR == this.id) {
            this.usuarioService.dadosTurma()
              .then((resultado: any) => {
                resultado.find(info => {
                  if (info.ID_CURSO == valor.ID_CURSO) {
                    this.usuarioService.dadosAlunos()
                      .then((resultadoALunos: any) => {
                        resultadoALunos.find(valorAluno => {
                          if (valorAluno.ID_TURMA == info.ID) {
                            this.usuarioService.dadosPessoa()
                              .then((resultadoPessoa: any) => {
                                resultadoPessoa.find(valorPessoa => {
                                  if (valorPessoa.RG == valorAluno.RG_PESSOA) {
                                    let aluno = {
                                      NOME: valorPessoa.NOME,
                                      TURMA: info.NOME,
                                      ID_ALUNO: valorAluno.ID,
                                      MATERIA: valor.NOME,
                                      STATUS: valorAluno.STATUS
                                    }
                                    this.listaAlunos.push(aluno)
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
    this.router.navigate(['professor/', this.id])
  }


}
