import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = ''
  password = ''

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logar() {
    this.usuarioService.checarPessoa()
    .then((resultado: (Object: (String|boolean)) =>[]) =>{
      console.log(resultado)
      for(let i = 0; i < resultado.length; i++){ 
        if(this.user === resultado[i].usuario && this.password === resultado[i].senha){
          if(resultado[i].validacao == true){
            this.usuarioService.dadosProfessor()
            .then((result: (Object: (String)) =>[]) => {
              for(let j = 0; j < result.length ; j++){
                if(result[j].RG_PESSOA === resultado[i].num){
                  let id_professor = result[j].ID
                  this.router.navigate(['/professor/', id_professor])
                } 
              }
            } )
          } else {
            this.usuarioService.dadosAlunos()
            .then((result: (Object: (String)) =>[]) => {
              for(let j = 0; j < result.length ; j++){
                if(result[j].RG_PESSOA === resultado[i].num){
                  let id_aluno = result[j].ID
                  this.router.navigate(['/aluno/', id_aluno])
                } 
              }
            } )
          }
        } 
      }
    })
    .catch(erro =>{
      console.log('deu mal', erro)
    })
  }

}
   