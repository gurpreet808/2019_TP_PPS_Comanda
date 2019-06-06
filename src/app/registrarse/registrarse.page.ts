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

  perfiles = [
    "supervisor",
    "empleado",
    "mozo",
    "cocinero",
    "bartender",
    "cliente",
    "dueño"
  ];
  
  constructor(db: AngularFireDatabase, public servUsuario: UsuarioService, private formBuilder: FormBuilder, public router:Router) { 
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      apellido: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      dni: ['', Validators.compose([Validators.maxLength(8), Validators.required])],
      cuil: ['', Validators.compose([Validators.maxLength(11), Validators.required])],
      correo: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      clave: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
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
    this.un_usuario = this.registerForm.value;
    this.servUsuario.registrarConEmail(this.un_usuario);
  }

  cargarSelectPerfiles(authActual: string){

  }

  iniciar_sesion(){
    this.router.navigateByUrl("/login");
  }

}
