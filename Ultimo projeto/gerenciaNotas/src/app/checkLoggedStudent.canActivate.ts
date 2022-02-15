import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
class CheckLoggedStudent implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {

        let user = localStorage.getItem("USER")
        let password = localStorage.getItem("PASSWORD")
        let verifica = localStorage.getItem("PROFESSOR")

        if (user && password) {
            if (verifica == '0') {
                return true;
            } else {
                this.router.navigate([''])
                return false;
            }
        } else {
            this.router.navigate([''])
            return false;
        }
    }
}

export default CheckLoggedStudent;