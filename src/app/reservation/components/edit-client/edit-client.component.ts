import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { DatePipe } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  public form: FormGroup;
  public Date!: Date;
  public title: string;
  client: any = [];

  constructor(private _clientService: ClientService, private datePipe: DatePipe, private _router: Router, private _route: ActivatedRoute) {
    this.title = "Modificar Cliente";
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
    this._route.params.subscribe(params => {
      var id = params['id'];
      this.getClient(id);

    });
  }

  getClient(id: number) {
    this._clientService.getClient(id).subscribe(
      response => {
        if (response) {
          this.client = response;
          const specificDate = new Date(this.client[0].startDate);
          const formattedSpecificDateStart = specificDate.toISOString().substr(0, 10);
          const specificDateEnd = new Date(this.client[0].endDate);
          const formattedSpecificDateEnd = specificDateEnd.toISOString().substr(0, 10);
          this.form.controls['CIF'].setValue(this.client[0].CIF);
          this.form.controls['companyName'].setValue(this.client[0].companyName);
          this.form.controls['address'].setValue(this.client[0].address);
          this.form.controls['municipality'].setValue(this.client[0].municipality);
          this.form.controls['province'].setValue(this.client[0].province);
          this.form.controls['startDate'].setValue(formattedSpecificDateStart);
          this.form.controls['endDate'].setValue(formattedSpecificDateEnd);
          this.form.controls['numReco'].setValue(this.client[0].numReco);
        }

      },
      error => {
        console.log("ERROR");
        console.log(<any>error);
      });
  }

  onSubmit() {
    let client: Client = {
      id: this.client[0].id,
      CIF: this.form.controls['CIF'].value!,
      companyName: this.form.controls['companyName'].value!,
      address: this.form.controls['address'].value!,
      municipality: this.form.controls['municipality'].value!,
      province: this.form.controls['province'].value!,
      startDate: this.datePipe.transform(this.form.controls['startDate'].value, "yyyy-MM-dd")!,
      endDate: this.datePipe.transform(this.form.controls['endDate'].value, "yyyy-MM-dd")!,
      numReco: this.form.controls['numReco'].value!
    }
    var result = this._clientService.editClient(client).subscribe(
      response => {
        this._router.navigateByUrl('/clients');
      },
      error => {
        console.log(<any>error)
      });


  }

  removeClient() {
    console.log(this.client[0].idclients);
    var result = this._clientService.removeClient(this.client[0].idclients).subscribe(
      response => {
        this._router.navigateByUrl('/clients');
      },
      error => {
        console.log(<any>error)
      });

  }
}
