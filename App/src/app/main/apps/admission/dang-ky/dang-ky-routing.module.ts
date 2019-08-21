import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
   
  
  FormXetTuyenVanBang2NEUComponent
  , FormThiLienThongCaoDangLenDaiHocNEUComponent
  , FormXetTuyenDHChinhQuyKetHopNEUComponent
  } from './form-xet-tuyen/form-xet-tuyen.component';
import { DangKyComponent } from './dang-ky.component';
import { YersinComponent } from './form-xet-tuyen/yersin/yersin.component';
import { LawComponent, LawBoSungThongTinComponent } from './form-xet-tuyen/law/law.component';
import { HiuComponent } from './form-xet-tuyen/hiu/hiu.component';
import { QnuComponent, QnuLienThongComponent, QnuSauDaiHocComponent } from './form-xet-tuyen/qnu/qnu.component';
import { DnpuComponent, DnpuLienThongComponent, DnuSauDaiHocComponent } from './form-xet-tuyen/dnpu/dnpu.component';

const routes: Routes = [
  {
    path: '',
    component: DangKyComponent,
    children: [
      // phuongThucId{ Id=2, Ten="Xét văn bằng 2" },
      // phuongThucId{ Id=14, Ten="Thi đánh giá năng lực" },
      // phuongThucId{ Id=1, Ten="Xét học bạ THPT" },
      // phuongThucId{ Id=5, Ten="Xét HS tốt CTTHPT quốc tế" },
      // phuongThucId{ Id=6, Ten="Xét kết quả kỳ thi SAT hoặc điểm THPT QG" }
      // phuongThucId{ Id=17, Ten="Liên thông" }
      // phuongThucId{ Id=11, Ten="Xét tuyển bằng học bạ" }
      // phuongThucId{ Id=12, Ten="Xét tuyển bằng điểm thi SAT hoặc THPTQG" }
      
      //========================HIU========================
      { path: 'admin/1/nhapdiem/:id/:dotTuyenSinhId', component: HiuComponent },
      { path: 'admin/14/chonmonthi/:id/:dotTuyenSinhId', component: HiuComponent  } ,
      { path: 'admin/5/chonmonthi/:id/:dotTuyenSinhId', component: HiuComponent  } ,
      { path: 'admin/6/nhapdiem/:id/:dotTuyenSinhId', component: HiuComponent  } ,
      { path: 'admin/15/nhapdiem/:id/:dotTuyenSinhId', component: HiuComponent  } ,
      
      //================================ NEU===========================================
      { path: 'admin/17/chonmonthi/:id/:dotTuyenSinhId', component: FormThiLienThongCaoDangLenDaiHocNEUComponent  } ,
      { path: 'admin/2/nhapdiem/:id/:dotTuyenSinhId', component: FormXetTuyenVanBang2NEUComponent },
      { path: 'admin/20/nhapdiem/:id/:dotTuyenSinhId', component: FormXetTuyenDHChinhQuyKetHopNEUComponent },
      
       //==============================LAW=========================
        { path: 'admin/22/nhapdiem/:id/:dotTuyenSinhId', component: LawComponent },
      //{ path: 'admin/22/chinhsuathongtin/:id/:dotTuyenSinhId', component: LawComponent },
      //{ path: 'admin/22/chinhsuathongtin/:id/:dotTuyenSinhId', component: LawBoSungThongTinComponent },

      //{ path: 'admin/22/nhapdiem/:id/:dotTuyenSinhId', component: LawDangKyPhucKhaoComponent },

      //==============================Yersin=========================
    //  { path: 'admin/11/nhapdiem/:id/:dotTuyenSinhId', component: FormXetTuyenHocBaAdminYersinComponent },
      { path: 'admin/11/nhapdiem/:id/:dotTuyenSinhId', component: YersinComponent },
      { path: 'admin/12/nhapdiem/:id/:dotTuyenSinhId', component:YersinComponent },
      { path: 'admin/19/nhapdiem/:id/:dotTuyenSinhId', component:YersinComponent },
      { path: 'admin/21/nhapdiem/:id/:dotTuyenSinhId', component:YersinComponent },

       //==============================QNU=========================

        //30: Thi năng khiếu
        //31: Hệ vừa học vừa làm
        //32: Liên thông từ TC lên ĐH hoặc CĐ lên ĐH
        //33: Văn bằng 2
        //34: Xét tuyển kết quả kì thi THPT QG
        //35: Sau đại học

       { path: 'admin/30/nhapdiem/:id/:dotTuyenSinhId', component: QnuComponent },
       { path: 'admin/31/nhapdiem/:id/:dotTuyenSinhId', component: QnuLienThongComponent },
       { path: 'admin/32/nhapdiem/:id/:dotTuyenSinhId', component: QnuLienThongComponent },
       { path: 'admin/33/nhapdiem/:id/:dotTuyenSinhId', component: QnuLienThongComponent },
       { path: 'admin/34/nhapdiem/:id/:dotTuyenSinhId', component: QnuComponent },
       { path: 'admin/35/nhapdiem/:id/:dotTuyenSinhId', component: QnuSauDaiHocComponent },

       //==============================DNU=========================

        //40: Văn bằng 2 hệ Vừa học Vừa làm (xét)
        //41: Văn bằng 2 hệ Vừa học Vừa làm (thi)
        //42: Văn bằng 2 Chính quy
        //43: Hệ vừa học vừa làm
        //44: Liên thông TC lên ĐH hoặc CĐ lên ĐH
        //45: Sau đại học
        //46: Xét tuyển Cao đẳng Chính quy

        { path: 'admin/40/nhapdiem/:id/:dotTuyenSinhId', component: DnpuComponent },
        { path: 'admin/41/chonmonthi/:id/:dotTuyenSinhId', component: DnpuComponent },
        { path: 'admin/42/nhapdiem/:id/:dotTuyenSinhId', component: DnpuComponent },
        { path: 'admin/43/nhapdiem/:id/:dotTuyenSinhId', component: DnpuComponent },
        { path: 'admin/44/nhapdiem/:id/:dotTuyenSinhId', component: DnpuLienThongComponent },
        { path: 'admin/45/nhapdiem/:id/:dotTuyenSinhId', component: DnuSauDaiHocComponent },
        { path: 'admin/46/nhapdiem/:id/:dotTuyenSinhId', component: DnpuComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DangKyRoutingModule { }
