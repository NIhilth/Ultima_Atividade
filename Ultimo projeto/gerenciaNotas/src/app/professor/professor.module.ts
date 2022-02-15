import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TurmasComponent } from './turmas/turmas.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import CheckLoggedProfessor from '../checkLoggedProfessor.canActivate';
import { LoginComponent } from '../login/login.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'professor', children: [
      {
        path: ':id_professor', canActivate: [CheckLoggedProfessor], component: TurmasComponent, children: [
          { path: 'alunos', canActivate: [CheckLoggedProfessor], component: AlunosComponent },
          { path: 'avaliacao', canActivate: [CheckLoggedProfessor], component: AvaliacaoComponent },

        ]
      },
      { path: '', component: LoginComponent },
      { path: 'perfil', canActivate: [CheckLoggedProfessor], component: PerfilComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [TurmasComponent, AlunosComponent, AvaliacaoComponent, PerfilComponent]
})
export class ProfessorModule { }
