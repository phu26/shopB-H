import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalrComponent } from './signalr.component';
import { LoadingSignalrComponent } from './loading-signalr/loading-signalr.component';


const routes: Routes = [
  {
    path: '',
    component: SignalrComponent,
    children: [
      { path: '', component: LoadingSignalrComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignalrRoutingModule { }
