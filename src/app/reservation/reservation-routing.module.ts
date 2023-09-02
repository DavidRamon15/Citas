import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableReservationComponent } from './components/table-reservation/table-reservation.component';
import { CalendarReservationComponent } from './components/calendar-reservation/calendar-reservation.component';
import { TableClientsComponent } from './components/table-clients/table-clients.component';
import { DataTablesModule } from 'angular-datatables';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { permissionsGuard } from '../guards/permissions.guard';


const routes: Routes = [
  { path: '', component: TableReservationComponent, canActivate: [permissionsGuard] },
  { path: 'request-appointment', component: CalendarReservationComponent , canActivate: [permissionsGuard]},
  { path: 'reservations', component: TableReservationComponent , canActivate: [permissionsGuard]},
  { path: 'clients', component:  TableClientsComponent, canActivate: [permissionsGuard]},
  { path: 'create-client', component:  CreateClientComponent, canActivate: [permissionsGuard]},
  { path: 'edit-client/:id', component:  EditClientComponent, canActivate: [permissionsGuard]},
  { path: 'edit-appointment/:id', component:  EditAppointmentComponent, canActivate: [permissionsGuard]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)  ],
  exports: [RouterModule,DataTablesModule]
})
export class ReservationRoutingModule { }
