import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFilesComponent } from './upload-files.component';
import { DanhMucUploadComponent } from './danh-muc-upload/danh-muc-upload.component';

const routes: Routes = [
  
  // {
  //   path: ':id',
  //   component:DanhMucUploadComponent ,
  // },
  {
    path: ':id',
    component:UploadFilesComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFilesRoutingModule { }