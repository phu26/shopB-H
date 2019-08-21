import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFilesComponent } from './upload-files.component';
import { UploadFilesRoutingModule } from './upload-files-routing.module';
import { MatIconModule, MatButtonModule, MatInputModule, MatTableModule, MatFormFieldModule, MatCheckboxModule, MatPaginator, MatPaginatorModule, MatSnackBarModule, MatSelectModule, MatDialogModule, MatProgressSpinnerModule, MatSortModule, MatListModule, MatStepperModule } from '@angular/material';
import { UploadModule } from 'app/common/components/upload/upload.module';
import { UploadFilesService } from './upload-files.service';
import { FormsModule } from '@angular/forms';
import { DanhMucUploadComponent } from './danh-muc-upload/danh-muc-upload.component';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { DataExcelService } from './data-excel-upload.service';
import { DongBoDanhMucComponent } from './dong-bo-danh-muc/dong-bo-danh-muc.component';

@NgModule({
  declarations: [UploadFilesComponent, DanhMucUploadComponent,DongBoDanhMucComponent],
  imports: [
    CommonModule,
    UploadFilesRoutingModule,
    MatButtonModule,
    MatIconModule,
    UploadModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSortModule,
    DialogModule,
    MatListModule,
    MatStepperModule
  ],
  providers:[UploadFilesService,DataExcelService],
  entryComponents: [DanhMucUploadComponent,DialogComponent,DongBoDanhMucComponent]
})
export class UploadFilesModule { }
