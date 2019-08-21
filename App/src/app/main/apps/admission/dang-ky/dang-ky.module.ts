import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DangKyComponent } from './dang-ky.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule
  , MatNativeDateModule
  , MatSortModule
  , MatOptionModule
  , MatSelectModule
  , MatButtonModule
  , MatFormFieldModule
  , MatIconModule
  , MatCardModule
  , MatInputModule
  , MatAutocompleteModule
  , MatTableModule
  , MatPaginatorModule
  , MatRippleModule
  , MatSnackBarModule 
} from '@angular/material';

import { ToHopCotDiemService } from '../to-hop-cot-diem/to-hop-cot-diem.service';
import { CotDiemService } from '../cot-diem/cot-diem.service';
import { NganhDaoTaoService } from '../nganh-dao-tao/nganh-dao-tao.service';
import { KhaoSatService } from '../khao-sat/khao-sat.service';
import { QuanHuyenService } from '../quan-huyen/quan-huyen.service';
import { RouterModule } from '@angular/router';
import { DangKyRoutingModule } from './dang-ky-routing.module';
import { DotTuyenSinhService } from '../dot-tuyen-sinh/dot-tuyen-sinh.service';
import { HoSoXetTuyenService } from '../ho-so-xet-tuyen/ho-so-xet-tuyen.service';
import { FormDangKyModule } from './form-dang-ky/form-dang-ky.module';
import { FormXetTuyenModule } from './form-xet-tuyen/form-xet-tuyen.module';

@NgModule({
  declarations: [DangKyComponent],
  imports: [
    CommonModule,
    DangKyRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,

    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatInputModule, 
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
   
    MatSortModule,
    MatRippleModule,
    MatSnackBarModule,
    FormDangKyModule,
    FormXetTuyenModule
  ],
  providers: [MatDatepickerModule
    , ToHopCotDiemService
    , CotDiemService
    , NganhDaoTaoService
    , KhaoSatService
    , QuanHuyenService
    , DotTuyenSinhService
    , HoSoXetTuyenService
  ],
})
export class DangKyModule { }
