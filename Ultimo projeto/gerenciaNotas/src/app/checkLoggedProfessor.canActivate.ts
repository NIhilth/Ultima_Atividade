import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
class CheckLoggedProfessor implements CanActivate {
    constructor(
        private router: Router,
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


        if (!user && !password) {
            this.router.navigate([''])
            return false;
        } else {
            if (verifica != '1') {
                this.router.navigate([''])
                return false;
            } else {
                return true
            }
        }
    }
}

export default CheckLoggedProfessor;