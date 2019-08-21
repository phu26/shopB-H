import { NgModule } from '@angular/core';

import { NguyenVongRoutingModule } from './nguyen-vong-routing.module';
import { NguyenVongComponent } from './nguyen-vong.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, 
  MatNativeDateModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatCardModule,
  MatInputModule, 
  MatAutocompleteModule, 
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSortModule,
  MatRippleModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCheckboxModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatListModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { DanhSachNguyenVongComponent, DanhSachNguyenVongTheoDotComponent } from './danh-sach-nguyen-vong/danh-sach-nguyen-vong.component';
import { NguyenVongService } from './nguyen-vong.service';
import { NganhDaoTaoService } from '../nganh-dao-tao/nganh-dao-tao.service';
import { ToHopCotDiemService } from '../to-hop-cot-diem/to-hop-cot-diem.service';
import { CotDiemService } from '../cot-diem/cot-diem.service';
import { KhaoSatService } from '../khao-sat/khao-sat.service';
import { UploadModule } from 'app/common/components/upload/upload.module';
import { QuanHuyenService } from '../quan-huyen/quan-huyen.service';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { DongBoUISDialogComponent } from './danh-sach-nguyen-vong/dong-bo-uisdialog/dong-bo-uisdialog.component';

 
@NgModule({
  declarations: [NguyenVongComponent, DanhSachNguyenVongComponent, DanhSachNguyenVongTheoDotComponent, DongBoUISDialogComponent],
  
  imports: [
    NguyenVongRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,

    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatInputModule, 
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatRippleModule,
    MatSnackBarModule,
    UploadModule,
    DialogModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatListModule
  ],providers: [MatDatepickerModule
    , NguyenVongService
    ,ToHopCotDiemService
    , CotDiemService
    , NganhDaoTaoService
    , KhaoSatService
    , QuanHuyenService
  ],entryComponents: [
    DongBoUISDialogComponent
  ]
})
export class NguyenVongModule { }
