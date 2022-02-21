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
class CheckLoggedProfessor implements CanActivate {
    constructor(
        private router: Router,
        private usuarioService: UsuarioService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {

        let user = localStorage.getItem("USER")
        let password = localStorage.getItem("PASSWORD")
        let verifica = localStorage.getItem("PROFESSOR")
        let id = localStorage.getItem("ID")

        if (user && password) {
            if (verifica == '1') {
                this.usuarioService.dadosPessoa()
                .then((resultado: (Object: (String|boolean)) => [] ) => {
                    for(let i = 0; i < resultado.length; i++){
                        if(resultado[i].USUARIO === user && resultado[i].SENHA === password){
                            this.usuarioService.dadosProfessor()
                            .then((result: (Object: (String)) =>[]) => {
                                for(let j = 0; j< result.length; j++){
                                    if(id == result[j].ID){
                                        console.log("aaaa")
                                        return true
                                    }
                                }
                                console.log('hum')
                            })
                        }
                    }
                    console.log('blebleb')
                })
                console.log('foi checked')
            } else {
                console.log("a meu caralho")
                this.router.navigate([''])
                return false;
            }
        } else {
            console.log("pqp")
            this.router.navigate([''])
            return false;
        }
    }
}

export default CheckLoggedProfessor;