import { Component } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public servUsuario: UsuarioService, public router: Router) {
    console.log(this.servUsuario.logueado.value);
  }

  saludo(): string{
    if (this.servUsuario.logueado.value) {
      return " "+this.servUsuario.el_usuario.nombre;
    } else {
      return "";
    }
  }

  navegar(ruta: string){
    this.router.navigateByUrl(ruta);
  }

}
