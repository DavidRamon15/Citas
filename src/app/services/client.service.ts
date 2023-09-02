import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Client } from '../models/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', localStorage['username']);
  constructor(private _http: HttpClient) { }


  getClients(): Observable<any> {
    return this._http.get(Global.url + 'clients', { headers: this.headers });
  }
  createClient(client: Client): Observable<any> {
    return this._http.post(Global.url + 'createClient', JSON.stringify(client), { headers: this.headers });
  }
  getClient(id: number): Observable<any> {
    return this._http.get(Global.url + 'client/' + id, { headers: this.headers });
  }
  getClientsCIF(): Observable<any> {
    return this._http.get(Global.url + 'clientsCIF', { headers: this.headers });
  }
  editClient(client: Client): Observable<any> {
    return this._http.put(Global.url + 'editClient/' + client.id, JSON.stringify(client), { headers: this.headers });
  }
  removeClient(id: number): Observable<any> {
    return this._http.delete(Global.url + 'removeClient/' + id, { headers: this.headers });
  }
}
