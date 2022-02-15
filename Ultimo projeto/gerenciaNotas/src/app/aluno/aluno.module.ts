import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MateriasComponent } from './materias/materias.component';
import { MateriaComponent } from './materia/materia.component';
import CheckLoggedStudent from '../chackLoggedStudent.canActivate'

const routes: Routes = [
  {path: 'aluno',children:[
    {path: ':id_aluno', canActivate: [CheckLoggedStudent], component: MateriasComponent, children: [
      {path: 'materia', canActivate: [CheckLoggedStudent], component: MateriaComponent}
    ]}
  ]}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [MateriasComponent, MateriaComponent]
})
export class AlunoModule { }
