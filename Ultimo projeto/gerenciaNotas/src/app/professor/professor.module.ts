import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TurmasComponent } from './turmas/turmas.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import CheckLogged from '../checkLogged.canActivate';


const routes: Routes = [
  {
    path: 'professor', canActivate:[CheckLogged], children: [
      {
        path: ':id_professor', component: TurmasComponent, children: [
          { path: 'alunos', component: AlunosComponent },
          { path: 'avaliacao', component: AvaliacaoComponent }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [TurmasComponent, AlunosComponent, AvaliacaoComponent]
})
export class ProfessorModule { }
