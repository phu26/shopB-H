import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, 
        MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSortModule, 
        MatSnackBarModule, MatTabsModule, MatDialogModule } from '@angular/material';
import { DoiTuongUuTienRoutingModule } from './doi-tuong-uu-tien-routing.module';
import { DoiTuongUuTienComponent } from './doi-tuong-uu-tien.component';
import { ThemDoiTuongUuTienComponent } from './them-doi-tuong-uu-tien/them-doi-tuong-uu-tien.component';
import { DanhSachDoiTuongUuTienComponent } from './danh-sach-doi-tuong-uu-tien/danh-sach-doi-tuong-uu-tien.component';
import { DoiTuongUuTienService } from './doi-tuong-uu-tien.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { DialogModule } from 'app/common/components/dialog/dialog.module';

// const routes: Routes = [
//   {
//     path: '',
//     component: DanhSachDoiTuongUuTienComponent,
//     resolve: {
//       data: DoiTuongUuTienService
//     }
//   },
//   {
//     path: '/:id',
//     component: DoiTuongUuTienSingleComponent,
//     resolve: {
//       data: DoiTuongUuTienService
//     }
//   },
//   {
//     path: '/:pageType',
//     component: DoiTuongUuTienSingleComponent,
//     resolve: {
//       data: DoiTuongUuTienService
//     }
//   }
// ];

@NgModule({
  declarations: [DoiTuongUuTienComponent, ThemDoiTuongUuTienComponent, DanhSachDoiTuongUuTienComponent],
  imports: [
    CommonModule,
    DoiTuongUuTienRoutingModule,

    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    // MatSpinner,

    FuseSharedModule,
    FuseWidgetModule,
    DialogModule
  ],
  providers: [
    DoiTuongUuTienService
  ],
  entryComponents: [DialogComponent]
})
export class DoiTuongUuTienModule { }
