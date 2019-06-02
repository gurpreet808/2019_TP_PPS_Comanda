import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public logueado = new BehaviorSubject(false);
  el_usuario: Usuario;
  public iud = new BehaviorSubject(false);

  constructor(public afAuth: AngularFireAuth) { 

  }

  async loginEmail(correo: string, clave: string) {
    try {
      let resultado = await this.afAuth.auth.signInWithEmailAndPassword(correo, clave);
      this.logueado.next(true);
      console.log(resultado.user.uid);

    } catch (error) {
      console.log(error.code);
      if (error.code == "auth/wrong-password") {
        console.log("Clave incorrecta");
      }
      if (error.code == "auth/user-not-found") {
        console.log("No se encontró ese mail");
      }
    }
  }

  traerDatosDelUsuario(iud: string){

  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
