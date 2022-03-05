import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

import { UsuarioService } from "./services/usuario.service";

@Injectable()
class CheckLoggedStudent implements CanActivate {
    constructor(
        private router: Router,
        private usuarioService: UsuarioService
    ) { }

    url = this.router.url
    urlNumber = Number(this.url.charAt(this.url.length - 2))
    certificar

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {

        let user = localStorage.getItem("USER")
        let password = localStorage.getItem("PASSWORD")
        let verifica = localStorage.getItem("PROFESSOR")
        let id = Number(localStorage.getItem("ID"))

        if (!user && !password) {
            this.router.navigate([''])
            return false;
        } else {
            if (verifica != '0') {
                this.router.navigate([''])
                return false;
            } else {
                if (this.urlNumber != 0) {
                    if (this.urlNumber != id) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    this.usuarioService.dadosPessoa()
                        .then((resultado: pessoa[]) => {
                            this.certificar = resultado.find(valor => {
                                if (valor.USUARIO === user && valor.SENHA === password) {
                                    return true;
                                }
                            })
                        })
                }
            }
        }

        if (this.certificar) {
            return true
        }
    }
}


interface pessoa {
    EMAIL: string
    IDADE: number
    NOME: string
    PROFESSOR: boolean
    RG: string
    SENHA: string
    SEXO: string
    USUARIO: string
}

export default CheckLoggedStudent;