import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs";

export const outerInjection = () => inject(Router);

export const authStateObs$ = () => inject(AuthService).authState$;

export const authGuard: CanActivateChildFn = () => {
    const router = outerInjection();

    return authStateObs$().pipe(
        map((user) => {
            if (!user) {
                console.debug('authGuard Usuario no autenticado');
                router.navigate(["login"]);
                return false;
            }
            return true;
        })
    );
};

export const publicGuard: CanActivateChildFn = () => {
    const router = outerInjection();

    return authStateObs$().pipe(
        map((user) => {
            if (user) {
                console.debug('publicGuard Usuario autenticado:', user.email);
                router.navigateByUrl("/home");
                return false;
            }
            return true;
        })
    );
};