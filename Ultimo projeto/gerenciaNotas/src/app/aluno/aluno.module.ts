import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MateriasComponent } from './materias/materias.component';
import { MateriaComponent } from './materia/materia.component';
import CheckLogged from '../checkLogged.canActivate';

const routes: Routes = [
  {path: 'aluno', canActivate: [CheckLogged],children:[
    {path: ':id_aluno', canActivate: [CheckLogged], component: MateriasComponent, children: [
      {path: 'materia', canActivate: [CheckLogged], component: MateriaComponent}
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
