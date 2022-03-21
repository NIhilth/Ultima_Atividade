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
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TurmaComponent } from './turma/turma.component';

const routes: Routes = [
  {
    path: 'professor', children: [
      {
        path: ':id_professor', canActivate: [CheckLoggedProfessor], component: InicioProfessorComponent
      },
      { path: '', component: LoginComponent },
      {
        path: 'alunos', children: [
          { path: ':id_professor', canActivate: [CheckLoggedProfessor], component: AlunosComponent }
        ]
      },
      {
        path: 'turmas', canActivate: [CheckLoggedProfessor], children: [
          { path: ':id_professor', component: TurmasComponent }
        ]
      },
      {
        path: 'turma', children: [
          { path: ':id_turma', canActivate: [CheckLoggedProfessor], component: TurmaComponent }
        ]
      },
      {
        path: 'perfil', canActivate: [CheckLoggedProfessor], children: [
          {
            path: ':id_professor', component: PerfilComponent
          }
        ]
      },
      {
        path: 'cadastrar_nota', canActivate: [CheckLoggedProfessor], children: [
          {
            path: ':id_turma', canActivate: [CheckLoggedProfessor], component: AvaliacaoComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [TurmasComponent, AlunosComponent, AvaliacaoComponent, InicioProfessorComponent, PerfilComponent, TurmaComponent]
})
export class ProfessorModule { }
