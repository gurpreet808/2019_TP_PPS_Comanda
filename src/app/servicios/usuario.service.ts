import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { map, first } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public logueado = new BehaviorSubject(false);
  el_usuario: Usuario;
  public iud = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        return authState.uid
      }
    })
  );

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public toastCtrl: ToastController) {
    this.afAuth.authState.subscribe(
      (authState) =>{
        if (authState) {
          this.logueado.next(true);
        } else {
          this.logueado.next(false);
        }
      }
    );
  }

  async loginEmail(correo: string, clave: string) {
    try {
      let resultado = await this.afAuth.auth.signInWithEmailAndPassword(correo, clave);

      this.traerDatosDelUsuario(resultado.user.uid);

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

  traerDatosDelUsuario(uid: string){
    try {
      let usuarioQuery = this.db.object('/usuarios/'+uid).valueChanges().subscribe(
        (usuario: Usuario) => {
          this.el_usuario = usuario;
          console.log(this.el_usuario);
          usuarioQuery.unsubscribe();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
