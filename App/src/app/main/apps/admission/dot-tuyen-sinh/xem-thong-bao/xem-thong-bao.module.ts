import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XemThongBaoComponent } from './xem-thong-bao.component';
import { DotTuyenSinhService } from '../dot-tuyen-sinh.service';
import { MatTabsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { ThiSinhService } from '../../thi-sinh/thi-sinh.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DoiTuongUuTienService } from '../../doi-tuong-uu-tien/doi-tuong-uu-tien.service';
import { KhuVucUuTienService } from '../../khu-vuc-uu-tien/khu-vuc-uu-tien.service';

@NgModule({
  declarations: [XemThongBaoComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [XemThongBaoComponent],
  providers: [DotTuyenSinhService,ThiSinhService,DoiTuongUuTienService,KhuVucUuTienService],
  entryComponents: [XemThongBaoComponent]
})
export class XemThongBaoModule { }
