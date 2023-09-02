import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private _router: Router) { }
  logout() {
    localStorage.removeItem("username");
    this._router.navigate(['/login']);
  }
}
