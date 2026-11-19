import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { authGuard } from './guards/auth-guard';
import { Usuario } from './usuario/usuario';
import { Panel } from './panel/panel';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'usuario', component: Usuario, canActivate: [authGuard] },
  { path: 'panel', component: Panel, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];