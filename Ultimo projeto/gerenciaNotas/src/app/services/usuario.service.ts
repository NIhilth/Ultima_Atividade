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


}
