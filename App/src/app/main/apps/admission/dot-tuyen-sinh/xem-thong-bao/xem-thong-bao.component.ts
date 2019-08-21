import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DotTuyenSinh } from '../../Models/DotTuyenSinh.model';
import { DotTuyenSinhService } from '../dot-tuyen-sinh.service';
import { fuseAnimations } from '@fuse/animations';
import { ThiSinh } from '../../Models/ThiSinh.model';
import { ThiSinhService } from '../../thi-sinh/thi-sinh.service';
import { HoSoXetTuyenService } from '../../ho-so-xet-tuyen/ho-so-xet-tuyen.service';
import { HoSoXetTuyen } from '../../Models/HoSoXetTuyen.model';
import { NguyenVongService } from '../../nguyen-vong/nguyen-vong.service';
import { NguyenVong } from '../../Models/NguyenVong.model';
import { DoiTuongUuTienService } from '../../doi-tuong-uu-tien/doi-tuong-uu-tien.service';
import { NganhDaoTaoService } from '../../nganh-dao-tao/nganh-dao-tao.service';

import { MatSnackBar } from '@angular/material';

import { environment } from 'environments/environment';
import { KhuVucUuTienService } from '../../khu-vuc-uu-tien/khu-vuc-uu-tien.service';

@Component({
  selector: 'app-xem-thong-bao',
  templateUrl: './xem-thong-bao.component.html',
  styleUrls: ['./xem-thong-bao.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class XemThongBaoComponent implements OnInit {
  thiSinh: ThiSinh = new ThiSinh();
  dotTuyenSinh: DotTuyenSinh = new DotTuyenSinh();
  hoSoXetTuyen: HoSoXetTuyen = new HoSoXetTuyen();
  nguyenVong: NguyenVong = new NguyenVong();
  diemDoiTuongUuTien:number;
  diemKhuVucUuTien: number;
  diemCong: number;
  tenNganhDaoTao:string;
  
  _TruongLayout = 'HIU';

  constructor(private _DotTuyenSinhService: DotTuyenSinhService,
    private _ThiSinhService: ThiSinhService,
    private _DoiTuongUuTienService: DoiTuongUuTienService,
    private _KhuVucUuTienService : KhuVucUuTienService,
    private _NganhDaoTaoService: NganhDaoTaoService,
    private _HoSoXetTuyenService: HoSoXetTuyenService,
    private _matSnackBar: MatSnackBar) {

  }

  ngOnInit() {
    //alert(this.thiSinh.Id);
    this._TruongLayout = environment.truong;
    //alert(this._TruongLayout);
    this._DotTuyenSinhService.single(this.dotTuyenSinh.Id).pipe()
      .subscribe(item => {
        this.dotTuyenSinh = new DotTuyenSinh(item);
        //console.log(this.dotTuyenSinh);
      });

    // this._ThiSinhService.single(this.thiSinh.Id).pipe()
    //   .subscribe(item => {
    //     this.thiSinh = new ThiSinh(item);

    //     console.log(this.thiSinh);
    //   });

    
    // this._DoiTuongUuTienService.single(this.thiSinh.DoiTuongUuTienId).pipe()
    //   .subscribe(item => {
    //     console.log("Đối tượng ưu tiên " + item);
    //   });
    // // this._HoSoXetTuyenService.all(undefined,undefined,"ThiSinhId="+this.thiSinh.Id,undefined).pipe()
    // //   .subscribe(item => {
    // //     this.hoSoXetTuyen = new HoSoXetTuyen(item);
    // console.log(this.hoSoXetTuyen);
    // //   });

    // // this._NguyenVongService.all(undefined, undefined, "HoSoXetTuyenId=" + this.hoSoXetTuyen.Id, undefined).pipe()
    // //   .subscribe(item => {
    // //     this.nguyenVong = new NguyenVong(item);
    // //   })
    this.LoadDataAsync();
  }
  async LoadDataAsync() {
    let res = await Promise.all(
      [
        this._DotTuyenSinhService.singleAsync(this.dotTuyenSinh.Id)
          .then(item => {
            this.dotTuyenSinh = new DotTuyenSinh(item);
            //console.log(this.dotTuyenSinh);
          })
        ,
        this._ThiSinhService.singleAsync(this.thiSinh.Id)
          .then(item => {
            this.thiSinh = new ThiSinh(item);

            console.log(this.thiSinh);
          })
      ]);
    // await alert(this.thiSinh.DoiTuongUuTienId);
    await this._DoiTuongUuTienService.singleAsync(this.thiSinh.DoiTuongUuTienId).then(item => {
      console.log("Đối tượng ưu tiên " + item.DiemCong);
      this.diemDoiTuongUuTien = item.DiemCong;
    });
    await this._KhuVucUuTienService.singleAsync(this.thiSinh.KhuVucUuTienId).then(item => {
      console.log("Đối tượng ưu tiên " + item.DiemCong);
      this.diemKhuVucUuTien = item.DiemCong;
    });
    await this._NganhDaoTaoService.all(undefined,undefined,"NganhId='"+this.thiSinh.MaNganh+"'",undefined).pipe().subscribe(item => {
      item.forEach(i=>{
        this.tenNganhDaoTao=i.Ten;
        //alert(this.tenNganhDaoTao);
      })
    })
    //await this._NganhDaoTaoService.singleAsync(this.hoSoXetTuyen.)
  }

  isDangKyPhucKhao(){
    this._HoSoXetTuyenService.dangKyPhucKhao(this.hoSoXetTuyen.Id).subscribe(x => {
      this.hoSoXetTuyen.IsPhucKhao=x.IsPhucKhao;
      
      this._matSnackBar.open(x.IsPhucKhao == true?'Đăng kí phúc khảo thành công.':'Hủy đăng kí phúc khảo thành công', 'Thành công', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 4000, panelClass: 'SuccessSnackbar'
      });
    }, error => {
      console.log(error);
      this._matSnackBar.open(error.message, 'Lỗi', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 4000, panelClass: 'ErrorSnackbar'
      });
    })
  }

}
