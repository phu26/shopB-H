import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThongBaoNgoaiComponent } from './thong-bao-ngoai.component';

const routes: Routes = [
  {
    path: '',
    component: ThongBaoNgoaiComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongBaoNgoaiRoutingModule { }
