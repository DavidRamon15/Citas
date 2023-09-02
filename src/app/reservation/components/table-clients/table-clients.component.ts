import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { DataTableDirective } from 'angular-datatables';
import { ClientService } from 'src/app/services/client.service';
import { tableOptions } from './table-options';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from 'src/app/services/global';
import { DatePipe } from '@angular/common';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Client } from 'src/app/models/client';
import { DataTableRecord } from 'src/app/models/dataTableRecord';



@Component({
  selector: 'app-table-clients',
  templateUrl: './table-clients.component.html',
  styleUrls: ['./table-clients.component.css']
})
export class TableClientsComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', localStorage['username']);
  constructor(private _router: Router, private _clientService: ClientService, private http: HttpClient, private pipeDate: DatePipe) { }

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<any> = new Subject();

  ngOnInit(): void {
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
      ajax: (params: any, callback) => {
        this.http
          .get<DataTableRecord>(
            Global.url + 'clients', { headers: this.headers })
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
          data: 'id'
        },
        {
          title: 'CIF',
          data: 'CIF',
        },
        {
          title: 'Nombre',
          data: 'companyName'
        },
        {
          title: 'Dirección',
          data: 'address'
        },
        {
          title: 'Municipio',
          data: 'municipality'
        },
        {
          title: 'Provincia',
          data: 'province'
        },
        {
          title: 'Fecha inicio',
          data: 'startDate',
          ngPipeInstance: this.pipeDate,
          ngPipeArgs: ['yyyy/MM/dd']
        },
        {
          title: 'Fecha Fin',
          data: 'endDate',
          ngPipeInstance: this.pipeDate,
          ngPipeArgs: ['yyyy/MM/dd']
        },
        {
          title: 'Número de reconomientos',
          data: 'numReco'
        }
      ],
      rowCallback: (row: Node, data: Client | Object, index: number) => {
        const self = this;

        $('td', row).off('click');
        $('td', row).on('click', () => {

          self.editClient(data);
        });
        return row;
      },
    };
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  navigateToAppoinment() {
    this._router.navigateByUrl('/reservation');
  }
  createClient() {
    this._router.navigateByUrl('/reservation/create-client');
  }
  editClient(data: Client) {
    this._router.navigateByUrl('/reservation/edit-client/' + data.id);
  }


}
