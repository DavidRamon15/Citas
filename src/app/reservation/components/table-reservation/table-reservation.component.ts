import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';


import { AppointmentService } from 'src/app/services/appointment.service';
import { tableOptions } from './table-options';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { DataTableRecord } from 'src/app/models/dataTableRecord';
import { Global } from 'src/app/services/global';
import { Appointment } from 'src/app/models/appointment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-reservation',
  templateUrl: './table-reservation.component.html',
  styleUrls: ['./table-reservation.component.css'],
  providers: [AppointmentService]
})
export class TableReservationComponent implements OnInit {
  appointments: Appointment[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: ADTSettings = {};

  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', localStorage['username']);

  constructor(private _appointmentService: AppointmentService, private _route: ActivatedRoute, private _router: Router, private http: HttpClient, private pipeDate: DatePipe) { }

  ngOnInit() {
    this.dtOptions = {
      responsive: true,
      language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
      pageLength: 10,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .get<DataTableRecord>(
            Global.url + 'appointments', { headers: this.headers })
          .subscribe(resp => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          });
      },
      columns: [
        {
          title: 'ID',
          data: 'idappointment'
        },
        {
          title: 'CIF',
          data: 'CIF',
        },
        {
          title: 'Número de empleados',
          data: 'numEmployee'
        },
        {
          title: 'Reconocimientos Realizados',
          data: 'numEmployeeReal'
        },
        {
          title: 'Fecha',
          data: 'startDate',
          ngPipeInstance: this.pipeDate,
          ngPipeArgs: ['yyyy/MM/dd']
        },
        {
          title: 'Hora inicio',
          data: 'startTime'
        },
        {
          title: 'Hora fin',
          data: 'endTime',
        }
      ],
      rowCallback: (row: Node, data: Appointment | Object, index: number) => {
        const self = this;

        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.editAppointment(data);
        });
        return row;
      },
    };
  }
  createAppointment() {
    this._router.navigateByUrl('/reservation/request-appointment');
  }
  navigateToClients() {
    this._router.navigateByUrl('/reservation/clients');
  }
  editAppointment(data: Appointment) {
    this._router.navigateByUrl('/reservation/edit-appointment/' + data.idappointment);
  }
}


