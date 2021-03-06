import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public splash = true;

  public appPages = [];

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private servUsuario: UsuarioService
  ) {
    this.initializeApp();
    setTimeout(() => this.splash = false, 5000);
    this.servUsuario.logueado.subscribe(
      valor =>{
        if (valor == false) {
          this.appPages = [
            {
              title: 'Iniciar sesión',
              url: '/login',
              icon: 'log-in'
            },
            {
              title: 'Registrarse',
              url: '/registrarse',
              icon: 'list'
            }
          ];
        } else {
          this.appPages = [
            {
              title: 'Inicio',
              url: '/',
              icon: 'home'
            }
          ];
        }
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  estilo_app(): object{
    if(this.splash){
      let estilo_splash = {
        "background-color": "#6bfc77"
      };

      return estilo_splash;
    }
    return {};
  }

  salir(){
    this.servUsuario.logout();
  }
}
