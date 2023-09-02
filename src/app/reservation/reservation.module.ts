import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { TableReservationComponent } from './components/table-reservation/table-reservation.component';
import { CalendarReservationComponent } from './components/calendar-reservation/calendar-reservation.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableClientsComponent } from './components/table-clients/table-clients.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations:[TableReservationComponent, CalendarReservationComponent, TableClientsComponent, CreateClientComponent, EditClientComponent, EditAppointmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReservationRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
 // exports:[RouterModule]
})
export class ReservationModule { }
