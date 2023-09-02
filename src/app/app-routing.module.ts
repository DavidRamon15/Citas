import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { permissionsGuard } from './guards/permissions.guard';

const routes: Routes = [
  

  { path: '', loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule) },
  { path: 'reservation', loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule) },
  //{ path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
