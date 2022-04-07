import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  id_aluno = ''
  id_materia = ''
  nome = ''
  sexo = ''
  user = ''
  listaProvas = []
  nomeMateria = ''

  ngOnInit() {
    this.id_materia = this.router.url.charAt(this.router.url.length - 7)
    let url = this.router.url
    let numero = url.length
    let num2 = numero - 2
    this.id_aluno = url.substring(num2, numero)
    this.usuarioService.dadosAlunos()
      .then((resultadoALunos: any) => {
        resultadoALunos.find(valorAluno => {
          if (valorAluno.ID == this.id_aluno) {
            this.usuarioService.dadosPessoa()
              .then((resultado: any) => {
                resultado.find(valor => {
                  if (valor.RG == valorAluno.RG_PESSOA) {
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
      .then((resultadoMateria: any) => {
        resultadoMateria.find(valorMateria => {
          console.log(valorMateria)
          if(valorMateria.ID == this.id_materia){
            this.nomeMateria = valorMateria.NOME
            this.usuarioService.dadosAvaliacao()
            .then((resultadoProva: any) => {
              resultadoProva.find(valorProva => {
                if(valorProva.ID_MATERIA == valorMateria.ID){
                  this.listaProvas.push(valorProva)
                  console.log(this.listaProvas)
                }
              })
            })
          }
        })
      })
  }

  voltar() {
    this.router.navigate(['aluno/materias', this.id_aluno])
  }

}
