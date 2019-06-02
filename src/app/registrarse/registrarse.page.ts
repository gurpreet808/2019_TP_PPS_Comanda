import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UsuarioService } from '../servicios/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  public registerForm: FormGroup;
  public un_usuario: Usuario;
  showpass: boolean = false;
  //showpass2: boolean = false;
  
  constructor(db: AngularFireDatabase, public servUsuario: UsuarioService, private formBuilder: FormBuilder, public router:Router) { 
    this.registerForm = this.formBuilder.group({
      correo: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      clave: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      //clave2: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
      perfil: ['', Validators.compose([Validators.required])],
    });
  }
  
  ngOnInit() {
    this.registerForm.reset();
  }
  
  ngOnDestroy() {
    this.registerForm.reset();
 }

  registrarme(){
  }

  iniciar_sesion(){
    this.router.navigateByUrl("/login");
  }

}
