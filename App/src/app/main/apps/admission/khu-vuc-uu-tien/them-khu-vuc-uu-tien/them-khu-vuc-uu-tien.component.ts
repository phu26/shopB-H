import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { KhuVucUuTien } from '../../Models/KhuVucUuTien.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { KhuVucUuTienService } from '../khu-vuc-uu-tien.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-them-khu-vuc-uu-tien',
  templateUrl: './them-khu-vuc-uu-tien.component.html',
  styleUrls: ['./them-khu-vuc-uu-tien.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ThemKhuVucUuTienComponent implements OnInit {
  
  khuVucUuTien: KhuVucUuTien = new KhuVucUuTien();
  pageType: string = 'new';
  khuVucUuTienForm: FormGroup;
  _idRouter: string;

  constructor(
    private _khuVucUuTienService: KhuVucUuTienService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {

    this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
    if (this._idRouter == 'them') {
      this.khuVucUuTien = new KhuVucUuTien();
      this.pageType = 'new';
    }
     else {
      this._khuVucUuTienService.single(Number(this._idRouter)).pipe()
        .subscribe(khuVucUuTien => {
          
          this.khuVucUuTien = new KhuVucUuTien(khuVucUuTien);
          
          this.pageType = 'edit';
          this.khuVucUuTienForm = this.createKhuVucUuTienForm();

        });
    }
    this.khuVucUuTienForm = this.createKhuVucUuTienForm();
  }

ngOnInit() {
}

createKhuVucUuTienForm(): FormGroup {
  return this._formBuilder.group({
    Id: [this.khuVucUuTien.Id],
    Ten: [this.khuVucUuTien.Ten],
    DiemCong: [this.khuVucUuTien.DiemCong],
    MaKhuVucUuTien:[this.khuVucUuTien.MaKhuVucUuTien]
    // NgayTao: [this.khuVucUuTien.NgayTao],
    // NgaySua: [this.khuVucUuTien.NgaySua],
    // NguoiTao: [this.khuVucUuTien.NguoiTao],
    // NguoiSua: [this.khuVucUuTien.NguoiSua]
  });
}
saveKhuVucUuTien(): void {
  const data = new KhuVucUuTien(this.khuVucUuTienForm.getRawValue());
  console.log(data);
  this._khuVucUuTienService.update(data)
    .subscribe(() => {
      // Show the success message
      this._matSnackBar.open('Đã cập nhật khu vực', 'OK', {
        verticalPosition: 'top', horizontalPosition:'right',
        duration: 3000, panelClass:'SuccessClass'
      });
    }),
    error => {
      this._matSnackBar.open('Cập nhật khu vực không thành công !!!', 'OK', {
          verticalPosition: 'top',horizontalPosition:'right',
          duration: 4000, panelClass:'SuccessClass'
      });
  };
}
/**
 * thêm đợt xét tuyển
 */
addKhuVucUuTien(): void {
  const data = new KhuVucUuTien(this.khuVucUuTienForm.getRawValue());
  console.log(data);
  this._khuVucUuTienService.create(data)
    .subscribe((data) => {

      // Show the success message
      this._matSnackBar.open('Thêm khu vực thành công!!!', 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 2000, panelClass: 'SuccessSnackbar'
      });

      // Change the location with new one
      this._location.go('admission/khu-vuc-uu-tien/' + data.Id);
      this.khuVucUuTienForm.controls['Id'].setValue(data.Id);
      this.pageType='edit';
      this.ngOnInit();
    }),
    error => {
      this._matSnackBar.open('Thêm khu vực không thành công !!!', 'OK', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 5000, panelClass: 'ErrorSnackbar'
      });
    }
    console.log(data);
}
GoBack(): void {
  window.history.back();
}
}
