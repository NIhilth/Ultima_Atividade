import { ResolvedStaticSymbol } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  blablausuario() {
    return new Promise((resolve, reject) => {
      fetch('/api/buscar_usuario',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }).then(resultado => resultado.json()
        ).then(function (dados) {
          dados = resolve(dados)
        }).catch(reject)
    })
  }

  checarAluno() {
    return new Promise((resolve, reject) => {
      fetch('/api/checar',
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      ).then(result => result.json)
        .then(resolvido => resolve(resolvido))
        .catch(reject)
    })
  }


}
