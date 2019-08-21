import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from './upload.service';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule
  ],
  exports: [ UploadComponent ],
  providers: [ UploadService ]
})
export class UploadModule { }
