import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { TurmasComponent } from './turmas/turmas.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import CheckLoggedProfessor from '../checkLoggedProfessor.canActivate';
import { LoginComponent } from '../login/login.component';
import { InicioProfessorComponent } from './inicioProfessor/inicioProfessor.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'professor', children: [
      {
        path: ':id_professor', canActivate: [CheckLoggedProfessor], component: InicioProfessorComponent, children: [
          { path: 'avaliacao', canActivate: [CheckLoggedProfessor], component: AvaliacaoComponent }
        ]
      },
      { path: '', component: LoginComponent },
      {
        path: 'turma', children: [
          { path: ':id_turma', canActivate: [CheckLoggedProfessor], component: AlunosComponent }
        ]
      },
      {
        path: 'turmas', canActivate: [CheckLoggedProfessor], children: [
          { path: ':id_professor', component: TurmasComponent }
        ]
      },
      // {
      //   path: 'informacoes', children: [
      //     {
      //       path:
      //     }
      //   ]
      // }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [TurmasComponent, AlunosComponent, AvaliacaoComponent, InicioProfessorComponent, PerfilComponent]
})
export class ProfessorModule { }
