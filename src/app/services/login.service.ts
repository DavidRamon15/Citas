import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';


@Injectable()
export class LoginService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) { }

  verificateUser(login: Login): Observable<any> {
    return this._http.post(Global.url + 'verificateUser/', JSON.stringify(login), { headers: this.headers });
  }

  isUserAllowedToAccessRoute(): Observable<any> {
    let headersLogin = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', localStorage["username"] || '');
    return this._http.post(Global.url + 'verificateAccess/', null, { headers: headersLogin });
  }
}
