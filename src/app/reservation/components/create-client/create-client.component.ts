import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  address,
  empresas,
  municipality,
  provinces
} from './arrays';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  public form: FormGroup;
  public Date!: Date;
  constructor(private _clientService: ClientService, private datePipe: DatePipe, private _router: Router) {
    this.form = new FormGroup({
      CIF: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      municipality: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      numReco: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
    let client: Client = {

      CIF: this.form.controls['CIF'].value!,
      companyName: this.form.controls['companyName'].value!,
      address: this.form.controls['address'].value!,
      municipality: this.form.controls['municipality'].value!,
      province: this.form.controls['province'].value!,
      startDate: this.datePipe.transform(this.form.controls['startDate'].value, "yyyy-MM-dd")!,
      endDate: this.datePipe.transform(this.form.controls['endDate'].value, "yyyy-MM-dd")!,
      numReco: this.form.controls['numReco'].value!
    }
    var result = this._clientService.createClient(client).subscribe(
      response => {
        this._router.navigateByUrl('/clients');
      },
      error => {
        console.log(<any>error)
      });


  }

  createcliens() {
    for (let i = 0; i < 1000; i++) {
      const fechaInicial = new Date(2000, 0, 1); // Fecha inicial (por ejemplo, 1 de enero de 2000)
      const fechaFinal = new Date(); // Fecha actual

      const tiempoInicial = fechaInicial.getTime();
      const tiempoFinal = fechaFinal.getTime();

      const tiempoAleatorio = Math.random() * (tiempoFinal - tiempoInicial) + tiempoInicial;
      let fechaAleatoria = new Date(tiempoAleatorio);
      let fechaAleatoriaFin = fechaAleatoria.getFullYear() + 1;


      let client: Client = {
        CIF: "CIF" + i,
        companyName: empresas[Math.floor(Math.random() * 9) + 1] + " " + i,
        address: address[Math.floor(Math.random() * 9) + 1],
        municipality: municipality[Math.floor(Math.random() * 9) + 1],
        province: provinces[Math.floor(Math.random() * 9) + 1],
        startDate: this.datePipe.transform(fechaAleatoria, "yyyy-MM-dd")!,
        endDate: this.datePipe.transform(fechaAleatoriaFin, "yyyy-MM-dd")!,
        numReco: Math.floor(Math.random() * 100) + 1!
      }
      console.log(client)
      this._clientService.createClient(client).subscribe(
        response => {
          console.log("Insertado:" + i)
        },
        error => {
          console.log(<any>error)
        });
    }
  }
}
