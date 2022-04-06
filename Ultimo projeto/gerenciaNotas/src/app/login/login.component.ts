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
    this.usuarioService.checarPessoa(this.user, this.password)
      .then((resultado: any) => {
        if (resultado == '') {
          alert("User ou senha inválidos!")
        } else {
          let result = resultado[0]
          if (result.PROFESSOR == 1) {
            this.usuarioService.dadosProfessor()
              .then((resultadoProfessor: any) => {
                resultadoProfessor.find(valorProfessor => {
                  if (result.RG == valorProfessor.RG_PESSOA) {
                    this.checou = true
                    let id_professor = valorProfessor.ID
                    localStorage.setItem("USER", result.USUARIO)
                    localStorage.setItem("PASSWORD", result.SENHA)
                    localStorage.setItem("PROFESSOR", result.PROFESSOR.toString())
                    this.router.navigate(['professor/', id_professor])
                    return
                  }
                })
              })
          } else {
            this.usuarioService.dadosAlunos()
              .then((resultadoALuno: any) => {
                resultadoALuno.find(valorAluno => {
                  if (result.RG == valorAluno.RG_PESSOA) {
                    this.checou = true
                    localStorage.setItem("USER", result.USUARIO)
                    localStorage.setItem("PASSWORD", result.SENHA)
                    localStorage.setItem("PROFESSOR", result.PROFESSOR.toString())
                    let id_aluno = '0' + valorAluno.ID
                    this.router.navigate(['aluno/', id_aluno])
                    return
                  }
                })
              })
          }
        }
      })
  }

}