import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = ''
  password = ''
  checou 

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logar() {
    this.usuarioService.checarPessoa()
      .then((resultado: checarPessoa[]) => {
        resultado.find(valorPessoa => {
          if (this.user === valorPessoa.usuario && this.password === valorPessoa.senha) {
            if (valorPessoa.validacao == true) {
              this.usuarioService.dadosProfessor()
                .then((result: professor[]) => {
                  result.find(valorProfessor => {
                    if (valorProfessor.RG_PESSOA === valorProfessor.RG_PESSOA) {
                      this.checou = true
                      let id_professor = valorProfessor.ID
                      localStorage.setItem("USER", valorPessoa.usuario)
                      localStorage.setItem("PASSWORD", valorPessoa.senha)
                      localStorage.setItem("PROFESSOR", valorPessoa.validacao.toString())
                      localStorage.setItem("ID", id_professor)
                      this.router.navigate(['professor', id_professor])
                      return
                    }
                  })
                })
            } else {
              this.usuarioService.dadosAlunos()
                .then((result: alunos[]) => {
                  result.find(valorAluno => {
                    if (valorAluno.RG_PESSOA === valorAluno.RG_PESSOA) {
                      this.checou = true
                      let id_aluno = valorAluno.ID
                      localStorage.setItem("USER", valorPessoa.usuario)
                      localStorage.setItem("PASSWORD", valorPessoa.senha)
                      localStorage.setItem("PROFESSOR", valorPessoa.validacao.toString())
                      localStorage.setItem("ID", id_aluno)
                      this.router.navigate(['aluno', id_aluno])
                      return
                    }
                  })
                })
            }
          }
        })
      })
      .catch(erro => {
        console.log('deu mal', erro)
      })
    if (this.checou == false) {
      alert("Senha ou Usuário inválidos")
    } 
  }

}

interface checarPessoa {
  usuario: string,
  senha: string,
  validacao: boolean,
  num: string
}

interface professor {
  ID: string
  RG_PESSOA: string
}

interface alunos {
  ID: string
  NOTA: number
  RG_PESSOA: string
  ID_TURMA: number
}