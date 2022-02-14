import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MateriasComponent } from './materias/materias.component';
import { MateriaComponent } from './materia/materia.component';

const routes: Routes = [
  {path: 'aluno', children:[
    {path: 'id_aluno:', component: MateriasComponent, children: [
      {path: 'materia', component: MateriaComponent}
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
