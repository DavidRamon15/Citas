import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  public title : string;
  public form: FormGroup;
  appointment: any = [];
  constructor(private _appointmentService:AppointmentService , private _route: ActivatedRoute ,private _router: Router ) {
    this.title = "Modificar Cita";
    this.form = new FormGroup({
      CIF: new FormControl('', [Validators.required]),
      numEmployee: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      numEmployeeReal: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {

    this._route.params.subscribe( params => {
      var  id = params['id'];
       this.getAppointment(id);
    
     });
   
  }
  getAppointment(id:number){
    this._appointmentService.getAppointment(id).subscribe(
      response => {
        if (response) {
          this.appointment = response
          const specificDate = new Date(this.appointment[0].startDate);
          const formattedSpecificDateStart = specificDate.toISOString().substr(0, 10);  

          this.form.controls['CIF'].setValue(this.appointment[0].CIF);
          this.form.controls['numEmployee'].setValue(this.appointment[0].numEmployee);
          this.form.controls['startDate'].setValue(formattedSpecificDateStart);
          this.form.controls['numEmployeeReal'].setValue(this.appointment[0].numEmployeeReal);
        }
       
      },
      error => {
        console.log("ERROR");
        console.log(<any>error);
      });
  }

  onSubmit() { 
    let appointment: Appointment = {
      idappointment: this.appointment[0].idappointment,
      CIF: this.form.controls['CIF'].value!,
      numEmployee: this.form.controls['numEmployee'].value!,
      startDate: this.form.controls['startDate'].value!,
      numEmployeeReal: this.form.controls['numEmployeeReal'].value!,
    };
    var result = this._appointmentService.editApointment(appointment).subscribe(
      response => {
        this._router.navigateByUrl('/');
      },
      error => {
        console.log(<any>error)
      });
  }
}
