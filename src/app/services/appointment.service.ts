import { Injectable } from '@angular/core';
import { EMPTY, EmptyError, Observable, empty } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Appointment } from '../models/appointment';




@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  public storage: string = localStorage['username'];
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public headersLogin = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.storage);

  constructor(private _http: HttpClient) { }

  getAppointments(): Observable<any> {
    return this._http.get(Global.url + 'appointments', { headers: this.headersLogin });
  }
  getAppointment(id: number): Observable<any> {
    return this._http.get(Global.url + 'appointment/' + id, { headers: this.headersLogin });
  }
  createAppointments(appointment: Appointment): Observable<any> {

    let params = JSON.stringify(appointment);
    console.log(params)
    return this._http.post(Global.url + 'createAppointment', params, { headers: this.headersLogin });

  }
  editApointment(appointment: Appointment): Observable<any> {
    let params = JSON.stringify(appointment);
    return this._http.put(Global.url + 'editAppointment/' + appointment.idappointment, params, { headers: this.headersLogin });
  }


}
