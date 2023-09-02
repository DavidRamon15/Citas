import { Component, OnInit } from '@angular/core';
import { Login } from '../../../models/login';
import { LoginService } from '../../../services/login.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  public status: String = '';
  public styleInputError: string = '';
  public form: FormGroup;
  loginError: boolean = false;

  constructor(private _loginService: LoginService, private _router: Router) {

    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    let login: Login = {
      user: this.form.controls['userName'].value!,
      password: this.form.controls['password'].value!
    }
    var result = this._loginService.verificateUser(login).subscribe(
      response => {
        console.log(response)
        if (response == false) {
          this.loginError = true;
          this.form.reset();
        } else {
          localStorage["username"] = response.token;
          this._router.navigate(['/reservation']);
        }
      },
      error => {
        console.log(<any>error)
      });
  }

  hasError() {
    return this.loginError === true;
  }
}

