import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  id_professor

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.id_professor = route.snapshot.paramMap.get('id_professor')
  }

  ngOnInit() {
  }

}
