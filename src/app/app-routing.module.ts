import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SupervisorGuard } from './guards/supervisor.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  //{ path: 'registrarse', loadChildren: './registrarse/registrarse.module#RegistrarsePageModule', canActivate: [SupervisorGuard] }
  { path: 'registrarse', loadChildren: './registrarse/registrarse.module#RegistrarsePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
