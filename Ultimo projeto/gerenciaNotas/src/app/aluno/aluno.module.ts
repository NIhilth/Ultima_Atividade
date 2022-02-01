import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasComponent } from './materias/materias.component';
import { MateriaComponent } from './materia/materia.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MateriasComponent, MateriaComponent]
})
export class AlunoModule { }
