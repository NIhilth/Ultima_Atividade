import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  id
  rg_professor
  nome
  sexo
  url

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    let url = this.router.url
    this.id = url.charAt(url.length - 1)
    this.usuarioService.dadosProfessor()
      .then((result: (Object: (String)) => []) => {
        console.log(result)
        for (let i = 0; i < result.length; i++) {
          if (result[i].ID == this.id) {
            this.rg_professor = result[i].RG_PESSOA

          }
        }
      })
    this.usuarioService.dadosPessoa()
      .then((resultado: (Object: (String | boolean)) => []) => {
        console.log(resultado)
        for (let i = 0; i < resultado.length; i++) {
          if (resultado[i].RG == this.rg_professor) {
            this.nome = resultado[i].NOME
            this.sexo = resultado[i].SEXO
          }
        }
      })
  }

  verPerfil(){
    this.router.navigate(['professor/perfil'])
    //arruma isso aqui mano
  }

}
