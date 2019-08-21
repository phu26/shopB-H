import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormXetTuyenService } from './form-xet-tuyen.service';
import { CotDiemService } from '../../cot-diem/cot-diem.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule, MatNativeDateModule, MatSortModule, MatOptionModule, MatSelectModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatCardModule, MatInputModule, MatAutocompleteModule, MatTableModule, MatPaginatorModule, MatRippleModule, MatSnackBarModule, MatDialog, MatDialogModule, MatCheckboxModule, MatProgressSpinnerModule, MatRadioModule } from '@angular/material';
import { FormDangKyModule } from '../form-dang-ky/form-dang-ky.module';
import { ToHopCotDiemService } from '../../to-hop-cot-diem/to-hop-cot-diem.service';
import { NganhDaoTaoService } from '../../nganh-dao-tao/nganh-dao-tao.service';
import { KhaoSatService } from '../../khao-sat/khao-sat.service';
import { QuanHuyenService } from '../../quan-huyen/quan-huyen.service';
import { DotTuyenSinhService } from '../../dot-tuyen-sinh/dot-tuyen-sinh.service';
import { HoSoXetTuyenService } from '../../ho-so-xet-tuyen/ho-so-xet-tuyen.service';
import { FormXetTuyenHocBaComponent, ConfirmDangKyComponent, BaseFormXetTuyenComponent, FormXetTuyenVanBang2NEUComponent, FormThiLienThongCaoDangLenDaiHocNEUComponent, FormXetTuyenDHChinhQuyKetHopNEUComponent, OptionsScrollDirective, AutoCloseDirective, FormXetTuyenHocBaAdminYersinComponent } from './form-xet-tuyen.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TruongThptService } from '../../truong-thpt/truong-thpt.service';
import { SelectDropdownModule } from 'app/common/components/select-dropdown/select-dropdown.module';
import { ThiSinhService } from '../../thi-sinh/thi-sinh.service';
import { HeDaoTaoService } from '../../he-dao-tao/he-dao-tao.service';
import { TextMaskModule } from 'angular2-text-mask';
import { MainPipeModule } from 'app/common/pipe/main-pipe.module';
import { CdkTableModule } from '@angular/cdk/table';
import { YersinComponent } from './yersin/yersin.component';
import { LawComponent, LawBoSungThongTinComponent } from './law/law.component';
import { HiuComponent } from './hiu/hiu.component';
import { QnuComponent, QnuLienThongComponent, QnuSauDaiHocComponent } from './qnu/qnu.component';
import { DnpuComponent, DnpuLienThongComponent, DnuSauDaiHocComponent } from './dnpu/dnpu.component';


//import { SelectDropDownModule } from 'ngx-select-dropdown'
@NgModule({
  declarations: [BaseFormXetTuyenComponent
    ,FormXetTuyenHocBaComponent
    , ConfirmDangKyComponent
 
    ,FormXetTuyenVanBang2NEUComponent
    ,QnuLienThongComponent
    ,QnuSauDaiHocComponent
    ,FormXetTuyenHocBaAdminYersinComponent
    ,YersinComponent
    ,FormThiLienThongCaoDangLenDaiHocNEUComponent
    ,FormXetTuyenDHChinhQuyKetHopNEUComponent
    ,DnpuComponent
    ,DnpuLienThongComponent
    ,DnuSauDaiHocComponent
    ,OptionsScrollDirective
    ,AutoCloseDirective, YersinComponent, LawComponent, HiuComponent, QnuComponent, DnpuComponent,
    LawBoSungThongTinComponent
  ],

  imports: [
    CdkTableModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDialogModule,
    TextMaskModule,
    MatProgressSpinnerModule,
    FormDangKyModule,
    NgSelectModule,
    //SelectDropDownModule,
    SelectDropdownModule,
    MainPipeModule
    
  ],
  providers: [MatDatepickerModule
    , ToHopCotDiemService
    , CotDiemService
    , NganhDaoTaoService
    , KhaoSatService
    , QuanHuyenService
    , DotTuyenSinhService
    , HoSoXetTuyenService
    , FormXetTuyenService
    , TruongThptService
    , ThiSinhService
    , HeDaoTaoService
  ],
  entryComponents: [ConfirmDangKyComponent],
  exports: []
})
export class FormXetTuyenModule { }


