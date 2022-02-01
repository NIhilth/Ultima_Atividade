import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurmasComponent } from './turmas/turmas.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TurmasComponent, AlunosComponent, AvaliacaoComponent]
})
export class ProfessorModule { }
