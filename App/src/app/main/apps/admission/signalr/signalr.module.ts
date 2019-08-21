import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignalrRoutingModule } from './signalr-routing.module';
import { SignalrComponent } from './signalr.component';
import { LoadingSignalrComponent } from './loading-signalr/loading-signalr.component';
import {  HttpModule,  JsonpModule  } from '@angular/http';   
import {  FormsModule  } from '@angular/forms';

@NgModule({
  declarations: [SignalrComponent, LoadingSignalrComponent],
  imports: [
    CommonModule,
    SignalrRoutingModule,
    HttpModule,  
    JsonpModule,  
    FormsModule 
  ]
})
export class SignalrModule { }
