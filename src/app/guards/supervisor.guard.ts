import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorGuard implements CanActivate {

  constructor(private router: Router, public servUsuario: UsuarioService) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    if (this.servUsuario.logueado) {
      if (this.servUsuario.el_usuario.perfil == "supervisor") {
        return true;
      }
    }
    
    this.router.navigateByUrl('/');
    return false;
  }
}