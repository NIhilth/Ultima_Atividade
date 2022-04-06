import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { InicioAlunoComponent } from './inicioAluno/inicioAluno.component';
import { MateriaComponent } from './materia/materia.component';
import CheckLoggedStudent from '../checkLoggedStudent.canActivate'
import { LoginComponent } from '../login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { ProfessoresComponent } from './professores/professores.component';


const routes: Routes = [
  {
    path: 'aluno', children: [
      {
        path: ':id_aluno', canActivate: [CheckLoggedStudent], component: InicioAlunoComponent, children: [
          { path: 'materia', canActivate: [CheckLoggedStudent], component: MateriaComponent }
        ]
      },
      {
        path: '', component: LoginComponent
      },
      {
        path: 'perfil', children: [
          {
            path: ':id_aluno', canActivate: [CheckLoggedStudent], component: PerfilComponent
          }
        ]
      },
      {
        path: 'materias', children: [
          {
            path: ':id_aluno', canActivate: [CheckLoggedStudent], component: MateriaComponent
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
    FormsModule,
    BrowserModule
  ],
  declarations: [InicioAlunoComponent, MateriaComponent, PerfilComponent, DisciplinasComponent, ProfessoresComponent]
})
export class AlunoModule { }
