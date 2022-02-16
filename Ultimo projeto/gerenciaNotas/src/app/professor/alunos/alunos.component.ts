import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  
  id_professor
  id_turma

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

   }

  ngOnInit() {
    let url = this.router.url
    this.id_professor = url.charAt(url.length - 1)
    this.id_turma = url.charAt(url.length - 6)
  }

}
