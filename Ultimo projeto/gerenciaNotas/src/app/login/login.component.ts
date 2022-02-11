import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
          // if(resultado[i].validacao == true){
          //   this.router.navigate(['/professor/'])
          // } else {
          //   this.router.navigate(['/aluno/'])
          // }
          console.log('foi')
        } 
      }
    })
    .catch(erro =>{
      console.log('deu mal', erro)
    })
  }

}
   