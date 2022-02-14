import { ResolvedStaticSymbol } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  checarPessoa() {
    return new Promise((resolve, reject) => {
      fetch('/api/checar',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosProfessor(){
    return new Promise((resolve,reject) =>{
      fetch('/api/ver_professor',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosAlunos(){
    return new Promise((resolve,reject) =>{
      fetch('/api/ver_aluno',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }
}
