import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as FullCalendar from 'fullcalendar';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DatePipe } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-calendar-reservation',
  templateUrl: './calendar-reservation.component.html',
  styleUrls: ['./calendar-reservation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarReservationComponent implements OnInit {
  showForm = false; // Variable para mostrar/ocultar el formulario
  public form: FormGroup;
  public Date!: Date;
  clients: any = [];
  constructor(private router: Router, private _appointmentService: AppointmentService, private _clientService: ClientService, private datePipe: DatePipe, private _router: Router) {

    this.form = new FormGroup({
      CIF: new FormControl('', [Validators.required]),
      numEmployee: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getClientsCIF();
    // Obtener el elemento por su ID
    const calendarEl = document.getElementById('calendar');

    if (calendarEl) {
      const calendar = new FullCalendar.Calendar(calendarEl, {
        selectable: true,
        locale: esLocale,

        select: this.handleDateSelect.bind(this),

      });
      calendar.render();
    } else {
      console.error("El elemento con ID 'calendar' no fue encontrado.");
    }
  }

  handleDateSelect(arg: FullCalendar.DateSelectArg) {
    this.Date = arg.start;
    this.showForm = false;
    this.showForm = true;
  }

  onSubmit() {
    let appointment: Appointment = {
      CIF: this.form.controls['CIF'].value!,
      numEmployee: this.form.controls['numEmployee'].value!,
      startDate: this.datePipe.transform(this.Date, "yyyy-MM-dd")!,
      startTime: this.form.controls['startTime'].value!,
      endTime: this.form.controls['endTime'].value!,
    }
    var result = this._appointmentService.createAppointments(appointment).subscribe(
      response => {
        this._router.navigateByUrl('/');
      },
      error => {
        console.log(<any>error)
      });
  }

  getClientsCIF() {
    this._clientService.getClientsCIF().subscribe(
      response => {
        if (response) {
          this.clients = response;
        }
      },
      error => {
        console.log("ERROR");
        console.log(<any>error);
      });
  }

  generarHoraAleatoria() {
    const horaInicio = 9; // 9 AM
    const horaFin = 21;  // 9 PM

    // Genera valores aleatorios para las horas, minutos y segundos dentro del rango
    const horaAleatoria = Math.floor(Math.random() * (horaFin - horaInicio + 1)) + horaInicio;


    // Formatea la hora en formato HH:MM:SS


    return horaAleatoria;
  }
  sumarHoras(horaAleatoria: string, horasASumar: number): string {
    // Convierte la hora aleatoria en un objeto Date
    const horaActual = new Date(`1970-01-01T${horaAleatoria}`);

    // Suma las horas especificadas
    horaActual.setHours(horaActual.getHours() + horasASumar);

    // Formatea la hora resultante en HH:MM:SS
    const horaResultante = horaActual.toTimeString().split(' ')[0];

    return horaResultante;
  }
  createReservations() {
    for (let i = 0; i < 100; i++) {
      const fechaInicial = new Date(2000, 0, 1); // Fecha inicial (por ejemplo, 1 de enero de 2000)
      const fechaFinal = new Date(); // Fecha actual

      const tiempoInicial = fechaInicial.getTime();
      const tiempoFinal = fechaFinal.getTime();

      const tiempoAleatorio = Math.random() * (tiempoFinal - tiempoInicial) + tiempoInicial;
      let fechaAleatoria = new Date(tiempoAleatorio);

      let numEmployee = Math.floor(Math.random() * 10) + 1;
      let hours = this.generarHoraAleatoria();
      const horaFormateada = `${hours.toString().padStart(2, '0')}:00:00`;
      let hoursfin = this.sumarHoras(horaFormateada, numEmployee)

      let appointment: Appointment = {
        CIF: this.clients[Math.floor(Math.random() * 999) + 1].CIF,
        numEmployee: Math.floor(Math.random() * 10) + 1,
        startDate: this.datePipe.transform(fechaAleatoria, "yyyy-MM-dd")!,
        startTime: horaFormateada,
        endTime: hoursfin,
      }

      var result = this._appointmentService.createAppointments(appointment).subscribe(
        response => {

        },
        error => {
          console.log(<any>error)
        });
    }
  }
}
