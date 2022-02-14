import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  id

  constructor(
    private router: Router
  ){}

  ngOnInit() {
    let url = this.router.url
    this.id = url.charAt(url.length - 1)
  }

}
