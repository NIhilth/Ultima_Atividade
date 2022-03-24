import { ResolvedStaticSymbol } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  dadosEspecificosPessoa() {
    return new Promise((resolve, reject) => {
      fetch('/api/checar',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosProfessor() {
    return new Promise((resolve, reject) => {
      fetch('/api/ver_professor',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosAlunos() {
    return new Promise((resolve, reject) => {
      fetch('/api/ver_aluno',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosTurma() {
    return new Promise((resolve, reject) => {
      fetch('/api/usar_turma',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosMateria() {
    return new Promise((resolve, reject) => {
      fetch('/api/usar_materia',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosPessoa() {
    return new Promise((resolve, reject) => {
      fetch('/api/ver_pessoa',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosCurso() {
    return new Promise((resolve, reject) => {
      fetch('/api/ver_curso',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosNota(){
    return new Promise((resolve, reject) => {
      fetch('/api/ver_nota',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  dadosAvaliacao(){
    return new Promise((resolve, reject) => {
      fetch('/api/ver_prova',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  mudarPessoa(RG, NOME, EMAIL, USER, SENHA, RG_ANTIGO) {
    return new Promise((resolve, reject) => {
      fetch('/api/alterar_pessoa',
        {
          method: 'POST',
          body: JSON.stringify({ RG, NOME, EMAIL, USER, SENHA, RG_ANTIGO }),
          headers: { 'Content-Type': 'application/json' }
        }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  checarPessoa(USER, PASSWORD){
    return new Promise((resolve, reject) => {
      fetch('/api/checar_pessoa',
        {
          method: 'POST',
          body: JSON.stringify({USER, PASSWORD}),
          headers: { 'Content-Type': 'application/json' }
        }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  cadastrarNota(ID_AVALIACAO,ID_ALUNO, ID_TURMA, NOTA){
    return new Promise((resolve, reject) => {
      fetch('/api/cadastrar_nota',
        {
          method: 'POST',
          body: JSON.stringify({ID_AVALIACAO, ID_ALUNO, ID_TURMA, NOTA}),
          headers: { 'Content-Type': 'application/json' }
        }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }

  cadastrarAvaliacao(CONTEUDO, DESCRICAO, PESO){
    return new Promise((resolve, reject) => {
      fetch('/api/cadastrar_prova',
        {
          method: 'POST',
          body: JSON.stringify({CONTEUDO, DESCRICAO, PESO}),
          headers: { 'Content-Type': 'application/json' }
        }
      ).then(result => result.json())
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }
}
