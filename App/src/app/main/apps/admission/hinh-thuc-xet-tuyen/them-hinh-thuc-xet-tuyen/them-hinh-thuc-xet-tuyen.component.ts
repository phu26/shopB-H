import { Component, OnInit, HostBinding, ViewEncapsulation, Inject } from '@angular/core';
import { HinhThucXetTuyen } from '../../Models/HinhThucXetTuyen.model';
import { LoaiDiem } from '../../Models/LoaiDiem.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HinhThucXetTuyenService } from '../hinh-thuc-xet-tuyen.service';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-them-hinh-thuc-xet-tuyen',
  templateUrl: './them-hinh-thuc-xet-tuyen.component.html',
  styleUrls: ['./them-hinh-thuc-xet-tuyen.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ThemHinhThucXetTuyenComponent implements OnInit {
  @HostBinding('style.width') width = '100%';

  hinhThucXetTuyen: HinhThucXetTuyen = new HinhThucXetTuyen();
  pageType: string = 'new';
  hinhThucXetTuyenForm: FormGroup;
  _idRouter: string;

  // loaixettuyen = [
  //   {
  //     text: 'Nhập điểm',
  //     value: 'nhapdiem'
  //   },    
  //   {
  //     text: 'Chọn môn thi',
  //     value: 'chonmonthi'
  //   }
  // ];
  loaixettuyenSelected = 'nhapdiem';

  constructor(
    private _hinhThucXetTuyenService: HinhThucXetTuyenService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private _dialog: MatDialog) {

    this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
    debugger;
    // if (this._idRouter == 'them') {
    //   this.hinhThucXetTuyen = new HinhThucXetTuyen();
    //   this.hinhThucXetTuyen.Loai = 'nhapdiem';
    //   this.hinhThucXetTuyen.LoaiDiems = [];
    //   this.pageType = 'new';
    // }
    // else 
    {
      this._hinhThucXetTuyenService.single(Number(this._idRouter)).pipe()
        .subscribe(hinhThucXetTuyen => {

          debugger;

          this.hinhThucXetTuyen = new HinhThucXetTuyen(hinhThucXetTuyen);

          this._hinhThucXetTuyenService.getLoaiDiems(hinhThucXetTuyen.Id).subscribe(
            (res: any) => {        
              this.hinhThucXetTuyen.LoaiDiems = JSON.parse(res);
            },
            err => {
              console.log(err.message);
            }
          );

          // this.hinhThucXetTuyen.LoaiDiems = [
          //   {
          //     Id: 1,
          //     Ten: 'Loại điểm 1',
          //     KichHoat: true,
          //     NgayTao: null,
          //     NgaySua: null,
          //     NguoiTao: "",
          //     NguoiSua: "",
          //     Ma: "Diem1"
          //   },
          //   {
          //     Id: 2,
          //     Ten: 'Loại điểm 2',
          //     KichHoat: true,
          //     NgayTao: null,
          //     NgaySua: null,
          //     NguoiTao: "",
          //     NguoiSua: "",
          //     Ma: "Diem2"
          //   }
          // ];

          this.loaixettuyenSelected = (this.hinhThucXetTuyen.Loai!=null && this.hinhThucXetTuyen.Loai!='')?(this.hinhThucXetTuyen.Loai):('nhapdiem');
          this.pageType = 'edit';
          this.hinhThucXetTuyenForm = this.createHinhThucXetTuyenForm();
        });
    }
    this.hinhThucXetTuyenForm = this.createHinhThucXetTuyenForm();
  }

  ngOnInit() {
  }
  createHinhThucXetTuyenForm(): FormGroup {
    return this._formBuilder.group({
      Id: [this.hinhThucXetTuyen.Id],
      Ten: [this.hinhThucXetTuyen.Ten],
      KichHoat: [this.hinhThucXetTuyen.KichHoat],
      Loai: [this.hinhThucXetTuyen.Loai],
      MaTruong:[this.hinhThucXetTuyen.MaTruong]
    });
  }
  saveHinhThucXetTuyen(): void {
    const data = new HinhThucXetTuyen(this.hinhThucXetTuyenForm.getRawValue());
    data.LoaiDiems = this.hinhThucXetTuyen.LoaiDiems;
    console.log(data);

    this._hinhThucXetTuyenService.update(data)
      .subscribe(() => {
        // Show the success message
        this._matSnackBar.open('Đã cập nhật hình thức xét tuyển', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right', 
          duration: 2000, panelClass: 'SuccessSnackbar'
        });
      }), error => {
        this._matSnackBar.open('Không lưu được hình thức xét tuyển !!!', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
      };
  }
  /**
   * thêm hình thức xét tuyển
   */
  // addHinhThucXetTuyen(): void {
  //   const data = new HinhThucXetTuyen(this.hinhThucXetTuyenForm.getRawValue());
  //   data.LoaiDiems = this.hinhThucXetTuyen.LoaiDiems;
  //   console.log(data);

  //   this._hinhThucXetTuyenService.create(data)
  //     .subscribe((data) => {

  //       // Show the success message
  //       this._matSnackBar.open('Thêm hình thức xét tuyển thành công!!!', 'OK', {
  //         verticalPosition: 'top', horizontalPosition: 'right', 
  //         duration: 2000, panelClass: 'SuccessSnackbar'
  //       });

  //       // Change the location with new one
  //       this._location.go('admission/hinh-thuc-xet-tuyen/' + data.Id);
  //       this.hinhThucXetTuyenForm.controls['Id'].setValue(data.Id);
  //       this.pageType='edit';
  //       this.ngOnInit();
  //     }), error => {
  //       this._matSnackBar.open('Không thêm được hình thức xét tuyển !!!', 'OK', {
  //         verticalPosition: 'top', horizontalPosition:'right',
  //         duration: 2000, panelClass: 'ErrorSnackbar'
  //       });
  //     };
  // }
  
  GoBack(): void {
    window.history.back();
  }

  openLoaiDiemDialog(loaidiem, type) {
    debugger;
    const dialogRef = this._dialog.open(LoaiDiemDialog, {
      width: '250px',
      data: JSON.parse(JSON.stringify(loaidiem))
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if(result!=null && result.Ten!=null && result.Ten!='') {
        if(type == 'add') {
          this.hinhThucXetTuyen.LoaiDiems.push(result);
        } else {
          var idx = this.hinhThucXetTuyen.LoaiDiems.findIndex(t => t.Id == result.Id)
          this.hinhThucXetTuyen.LoaiDiems[idx] = result;
        }
      }
    });
  }

  onClickThemLoaiDiem() {
    debugger;
    var newLoaiDiem = new LoaiDiem();
    var newId = (this.hinhThucXetTuyen.LoaiDiems.length!=0)?(Math.max.apply(Math, this.hinhThucXetTuyen.LoaiDiems.map(function(o) { return o.Id; })) + 1):0;
    newLoaiDiem.Id = newId;
    this.openLoaiDiemDialog(newLoaiDiem, 'add');
  }

  onClickUpdateLoaiDiem(loaidiem) {
    this.openLoaiDiemDialog(loaidiem, 'edit');
  }

  onClickDeleteLoaiDiem(loaidiem) {
    var idx = this.hinhThucXetTuyen.LoaiDiems.findIndex(t => t.Id == loaidiem.Id);
    if (idx != -1) {
      this.hinhThucXetTuyen.LoaiDiems.splice(idx, 1);
    }
  }
}

@Component({
  selector: 'loai-diem-dialog',
  templateUrl: 'loai-diem-dialog.html',
})
export class LoaiDiemDialog {
  constructor(
    public dialogRef: MatDialogRef<LoaiDiemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LoaiDiem) {}

    onClickCancelEditLoaiDiem(): void {
      this.dialogRef.close();
    }
}