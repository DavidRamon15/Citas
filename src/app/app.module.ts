import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { LogoutComponent } from './auth/components/logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
