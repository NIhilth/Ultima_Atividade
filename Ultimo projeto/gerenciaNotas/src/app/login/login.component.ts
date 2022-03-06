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
  checou = false

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logar() {
    this.usuarioService.checarPessoa()
    .then((resultado: (Object: (String|boolean)) => [] ) =>{
      for(let i = 0; i < resultado.length; i++){ 
        if(this.user === resultado[i].usuario && this.password === resultado[i].senha){
          if(resultado[i].validacao == true){
            this.usuarioService.dadosProfessor()
            .then((result: (Object: (String)) =>[]) => {
              for(let j = 0; j < result.length ; j++){
                if(result[j].RG_PESSOA === resultado[i].num){
                  this.checou = true
                  let id_professor = result[j].ID
                  localStorage.setItem("USER", resultado[i].usuario)
                  localStorage.setItem("PASSWORD", resultado[i].senha)
                  localStorage.setItem("PROFESSOR", resultado[i].validacao )
                  localStorage.setItem("ID", id_professor )
                  this.router.navigate(['professor', id_professor])
                }
              }
            } )
          } else {
            this.usuarioService.dadosAlunos()
            .then((result: (Object: (String)) => []) => {
              for(let j = 0; j < result.length ; j++){
                if(result[j].RG_PESSOA === resultado[i].num){
                  this.checou = true
                  let id_aluno = result[j].ID
                  localStorage.setItem("USER", resultado[i].usuario)
                  localStorage.setItem("PASSWORD", resultado[i].senha)
                  localStorage.setItem("PROFESSOR", resultado[i].validacao )
                  localStorage.setItem("ID", id_aluno )
                  this.router.navigate(['/aluno/', id_aluno])
                } 
              }
            } )
          }
        }
      }

      if(!this.checou){
        alert("Senha ou Usuário inválidos")
      }
    })
    .catch(erro =>{
      console.log('deu mal', erro)
    })
  }

}
   