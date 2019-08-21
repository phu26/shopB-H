import { NgModule } from '@angular/core';
import { ToHopCotDiemRoutingModule } from './to-hop-cot-diem-routing.module';
import { ToHopCotDiemComponent } from './to-hop-cot-diem.component';
import { ToHopCotDiemService } from './to-hop-cot-diem.service';
import { CotDiemService } from '../cot-diem/cot-diem.service';
import { CotDiemModule } from '../cot-diem/cot-diem.module';
import { DanhSachToHopCotDiemModule } from './danh-sach-to-hop-cot-diem/danh-sach-to-hop-cot-diem.module';
import { ChiTietToHopCotDiemModule } from './chi-tiet-to-hop-cot-diem/chi-tiet-to-hop-cot-diem.module';

@NgModule({
  declarations: [ToHopCotDiemComponent],
  imports: [
    ToHopCotDiemRoutingModule,
    CotDiemModule,
    DanhSachToHopCotDiemModule,
    ChiTietToHopCotDiemModule
  ],
  providers: [ToHopCotDiemService,CotDiemService]
})
export class ToHopCotDiemModule { }
