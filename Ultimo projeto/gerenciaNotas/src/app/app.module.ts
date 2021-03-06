import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfessorModule } from './professor/professor.module';
import { AlunoModule } from './aluno/aluno.module';
import CheckLoggedProfessor from './checkLoggedProfessor.canActivate';
import CheckLoggedStudent from './checkLoggedStudent.canActivate'

const routes: Routes = [
  {path: '', component: LoginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ProfessorModule,
    AlunoModule
  ],
  providers: [CheckLoggedProfessor, CheckLoggedStudent],
  bootstrap: [AppComponent]
})
export class AppModule { }
