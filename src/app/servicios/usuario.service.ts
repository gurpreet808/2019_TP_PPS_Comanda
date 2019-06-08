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
          this.traerDatosDelUsuario(authState.uid);
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

  async registrarConEmail(usuario_: Usuario) {
    try {
      let resultado = await this.afAuth.auth.createUserWithEmailAndPassword(usuario_.correo, usuario_.clave);
      console.log(resultado.user.uid);

      this.registrar_datos_del_usuario(usuario_, resultado.user.uid);

    } catch (error) {
      console.log(error.code);
      if (error.code == "auth/wrong-password") {
        console.log("Clave incorrecta");
      }
    }
  }

  registrar_datos_del_usuario(un_usuario: Usuario, uid_: string){
    delete un_usuario.clave;
    delete un_usuario.correo;
    
    let itemsRef = this.db.object('usuarios/'+uid_);
    itemsRef.set(un_usuario)
    .then( 
      datos => {
        //console.log(datos);
        console.log("Bien! Te registraste! Ahora podés iniciar sesión");
      }
    )
    .catch(
      err => {
        console.log("Hubo un error inténtalo de nuevo...");
      }
    );
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
