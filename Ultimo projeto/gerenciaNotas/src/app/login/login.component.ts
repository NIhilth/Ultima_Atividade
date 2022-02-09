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
    private UsuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // logar() {
  //   this.UsuarioService.checarAluno()
  //   .then(resultado => {
  //     console.log('RESULTADO:', resultado)
  //     this.user = resultado.user
  //     this.password = resultado.password
  //   })
  //   .catch(erro => {
  //     console.log('ERRO AO BUSCAR ALUNO:', erro)
  //   })
  // }

}
