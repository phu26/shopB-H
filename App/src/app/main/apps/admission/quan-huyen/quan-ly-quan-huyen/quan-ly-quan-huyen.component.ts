import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Injectable, Inject, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { MatTreeNestedDataSource, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MatOptionSelectionChange, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { BehaviorSubject, Observable, observable, from } from 'rxjs';
import { QuanHuyenService } from '../quan-huyen.service';
import { QuanHuyen } from '../../Models/QuanHuyen.model';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-quan-ly-quan-huyen',
  templateUrl: './quan-ly-quan-huyen.component.html',
  styleUrls: ['./quan-ly-quan-huyen.component.scss']
})
export class QuanLyQuanHuyenComponent {
  confirmDialogRef: MatDialogRef<DialogComponent>;
  nodess = null;

  options: ITreeOptions = {
    idField: 'Id',
    displayField: 'Ten',
    childrenField: 'DanhSachQuanHuyen',
    actionMapping: {
      mouse: {
        click: (tree, node, $event) => {
          if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        }
      }
    },
    allowDrag: (node) => {
      return true;
    },
    allowDrop: (node) => {
      return true;
    },
    allowDragoverStyling: true,
    levelPadding: 10,
    //useVirtualScroll: true,
    animateExpand: true,
    scrollOnActivate: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
  };


  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node, $event) => // Open a modal with node content,
      {
        alert('123');
      }
    }
  }

  async initialize() {
    const dataObject = [await this.quanHuyenService.getTreeQuanHuyen()];
    this.nodess = dataObject;
    console.log("this.nodess", this.nodess);

  }

  constructor(private quanHuyenService: QuanHuyenService, public dialog: MatDialog, private _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar) {

    this.initialize();

  }

  openDialog(id) {
    let dialogRef = this.dialog.open(QuanLyQuanHuyenComponentDialog, {
      height: '600px',
      width: '800px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initialize();
    });
  }

  // xoa
  btnXoa(id): void {

    this.confirmDialogRef = this._matDialog.open(DialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.message = `Bạn có muốn xóa đơn vị hành chính này?`;
    this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
    this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
    this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quanHuyenService.delete(id).subscribe(
          success => {
            this.initialize();
            this._matSnackBar.open('Xóa thành công', 'OK', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 2000
            });
          },
          error => {
            //console.log("không xóa được " + id);
            this._matSnackBar.open('Không xóa được', 'OK', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 2000
            });
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }


}

@Component({
  selector: 'app-quan-ly-quan-huyen',
  templateUrl: './quan-ly-quan-huyen-dialog.html',
  styles: [`
  . {   }
`]
})

export class QuanLyQuanHuyenComponentDialog implements OnInit {
  quanHuyen: QuanHuyen = new QuanHuyen();
  quanHuyenForm: FormGroup;
  DSTinhThanhPho: Array<QuanHuyen> = [];
  DSQuanHuyenPhuongXa: Array<QuanHuyen> = [];
  public CapTiepNhan = [
    { "Id": 'tinhthanhpho', "Ten": "Tỉnh thành phố" },
    { "Id": 'quanhuyen', "Ten": "Quận huyện" },
    { "Id": 'phuongxa', "Ten": "Phường xã" }
  ]

  _TinhThanhPhoDuocChon: number;
  _QuanHuyenDuocChon: number;
  captn: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuanLyQuanHuyenComponentDialog>,
    private _quanHuyenService: QuanHuyenService,
    private _matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data) {

    // this.getSingle(data);
    // this.quanHuyenForm = this.createQuanHuyenForm();
  }
  // viết hàm getSingle
  // getSingle(id) {
  //   if (id === null || id === '') {
  //     this.quanHuyen = new QuanHuyen();
  //     this.quanHuyenForm = this.createQuanHuyenForm();
  //   }
  //   else {
  //     //alert(id+1);
  //     this._quanHuyenService.single(id)
  //       .subscribe(quanHuyen => {
  //         //console.log("quanHuyen:", quanHuyen);

  //         // tỉnh thành phố
  //         this.captn = 'tinhthanhpho';
  //         this.quanHuyen = new QuanHuyen(quanHuyen);
  //         this.quanHuyenForm = this.createQuanHuyenForm();
  //         // quận huyện
  //         if (this.quanHuyen.Cap == 'quanhuyen') {
  //           this.captn = 'quanhuyen';
  //           this._quanHuyenService.GetDSTheoCap('tinhthanhpho', 0).pipe()
  //             .subscribe(quanhuyenss => {
  //               this.DSTinhThanhPho = <Array<QuanHuyen>>quanhuyenss;
  //               this._TinhThanhPhoDuocChon = this.quanHuyen.ChaId;
  //             });
  //         }
  //         // phường xã
  //         else if (this.quanHuyen.Cap == 'phuongxa') {
  //           this.captn = 'phuongxa';
  //           this._quanHuyenService.single(Number(this.quanHuyen.ChaId)).pipe()
  //             .subscribe(capquanHuyen => {
  //               //load ds tinhthanhpho;
  //               this._quanHuyenService.GetDSTheoCap('tinhthanhpho', 0).pipe()
  //                 .subscribe(quanhuyenss => {
  //                   this.DSTinhThanhPho = <Array<QuanHuyen>>quanhuyenss;
  //                   this._TinhThanhPhoDuocChon = capquanHuyen.ChaId;
  //                   this._quanHuyenService.GetDSTheoCap('quanhuyen', this._TinhThanhPhoDuocChon).pipe()
  //                     .subscribe(quanhuyenss => {
  //                       this.DSQuanHuyenPhuongXa = <Array<QuanHuyen>>quanhuyenss;
  //                       this._QuanHuyenDuocChon = this.quanHuyen.ChaId;
  //                     });

  //                 });

  //               //load ds quanhuyen

  //             });
  //         }
  //         //this.quanHuyenForm = this.createQuanHuyenForm();
  //       });
  //   }
  // }
  getSingle2(id) {
    if (id === null || id === '') {
      this.quanHuyen = new QuanHuyen();
      this.quanHuyenForm = this.createQuanHuyenForm();
    }
    else {
      //alert(id+1);
      this._quanHuyenService.single(id)
        .subscribe(quanHuyen => {
          //console.log("quanHuyen:", quanHuyen);

          // tỉnh thành phố
          this.captn = 'tinhthanhpho';
          this.quanHuyen = new QuanHuyen(quanHuyen);
          this.quanHuyenForm = this.createQuanHuyenForm();
          // quận huyện
          if (this.quanHuyen.Cap == 'quanhuyen') {
            this.captn = 'quanhuyen';
            this._quanHuyenService.all(undefined,undefined,` Cap='tinhthanhpho' and ChaId=${1}`,'Ten').pipe()
              .subscribe(quanhuyenss => {
                this.DSTinhThanhPho = <Array<QuanHuyen>>quanhuyenss;
                this._TinhThanhPhoDuocChon = this.quanHuyen.ChaId;
              });
          }
          // phường xã
          else if (this.quanHuyen.Cap == 'phuongxa') {
            this.captn = 'phuongxa';
            this._quanHuyenService.single(Number(this.quanHuyen.ChaId))
              .subscribe(capquanHuyen => {
                this._quanHuyenService.all(undefined,undefined,` Cap='tinhthanhpho' and ChaId=${1}`,'Ten').pipe()
                .subscribe(quanhuyenss => {
                  this.DSTinhThanhPho = <Array<QuanHuyen>>quanhuyenss;
                  this._TinhThanhPhoDuocChon = capquanHuyen.ChaId;
                });
                 this._TinhThanhPhoDuocChon = capquanHuyen.ChaId;
                 this.changeTinhThanhPho();
                 this._QuanHuyenDuocChon = this.quanHuyen.ChaId;          

              });
            // this._quanHuyenService.single(Number(this.quanHuyen.ChaId))
            //   .subscribe(capquanHuyen => {
            //     //load ds tinhthanhpho;
            //     this._quanHuyenService.all(undefined,undefined,` Cap='tinhthanhpho' and ChaId=${1}`,'Ten').pipe()
            //       .subscribe(quanhuyenss => {
            //         this.DSTinhThanhPho = <Array<QuanHuyen>>quanhuyenss;
            //         this._TinhThanhPhoDuocChon = capquanHuyen.ChaId;
            //         console.log(this.DSQuanHuyenPhuongXa);
            //         this._quanHuyenService.all(undefined,undefined,` Cap='quanhuyen' and ChaId=${capquanHuyen.ChaId}`,'Ten').pipe()
            //           .subscribe(quanhuyenss => {
            //             this.DSQuanHuyenPhuongXa = <Array<QuanHuyen>>quanhuyenss;
            //             console.log(this.DSQuanHuyenPhuongXa);
            //             this._QuanHuyenDuocChon = this.quanHuyen.ChaId;
            //           });

            //       });

            //     //load ds quanhuyen

            //   });
          }
          //this.quanHuyenForm = this.createQuanHuyenForm();
        });
    }
  }

  ngOnInit() {
    this.getSingle2(this.quanHuyen.Id);
    this.quanHuyenForm = this.createQuanHuyenForm();
  }
  createQuanHuyenForm(): FormGroup {
    return this.fb.group({
      Id: [this.quanHuyen.Id],
      Ten: [this.quanHuyen.Ten],
      ChaId: [this.quanHuyen.ChaId],
      Cap: [this.quanHuyen.Cap],
      ThuTu: [this.quanHuyen.ThuTu],
      MaQuanLy: [this.quanHuyen.MaQuanLy]
    });
  }

  changeCapTiepNhan($event) {

    if ($event.value === "quanhuyen") {
      this.captn = 'quanhuyen';
      this._quanHuyenService.GetDSTheoCap('tinhthanhpho', 0).pipe()
        .subscribe(quanhuyenss => {
          this.DSTinhThanhPho = <Array<QuanHuyen>>quanhuyenss;
        });

    }
    else if ($event.value === "phuongxa") {
      this.captn = 'phuongxa';
      this._quanHuyenService.GetDSTheoCap('tinhthanhpho', 0).pipe()
        .subscribe(quanhuyenss => {
          this.DSTinhThanhPho = <Array<QuanHuyen>>quanhuyenss;
        });
    }
    else if ($event.value === "tinhthanhpho") {
      this.captn = 'tinhthanhpho';
      this.DSTinhThanhPho = []
    }
  }

  changeTinhThanhPho() {

    this._quanHuyenService.all(undefined,undefined,` Cap='quanhuyen' and ChaId=${this._TinhThanhPhoDuocChon}`,'Ten').pipe()
      .subscribe(quanhuyenss => {
        this.DSQuanHuyenPhuongXa = <Array<QuanHuyen>>quanhuyenss;
      });
  }
  changeQuanHuyen() {

    // this._quanHuyenService.GetDSTheoCap('quanhuyen', this._TinhThanhPhoDuocChon).pipe()
    //   .subscribe(quanhuyenss => {
    //     this.DSQuanHuyenPhuongXa = <Array<QuanHuyen>>quanhuyenss;
    //   });
  }

  save() {
    const data = new QuanHuyen(this.quanHuyenForm.getRawValue());
    if (data.Cap == 'tinhthanhpho')
      data.ChaId = null;
    else if (data.Cap == 'quanhuyen')
      data.ChaId = this._TinhThanhPhoDuocChon;
    else if (data.Cap == 'phuongxa')
      data.ChaId = this._QuanHuyenDuocChon;

    if (data.Id == null)
      this.addQuanHuyen(data);
    else
      this.updateQuanHuyen(data);

  }
  addQuanHuyen(data) {
    this._quanHuyenService.create(data)
      .subscribe((data) => {

        // Show the success message
        this._matSnackBar.open('Thêm đơn vị hành chính thành công', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one        
        this.dialogRef.close(this.quanHuyenForm.value);
      });
  }
  updateQuanHuyen(data) {
    this._quanHuyenService.update(data)
      .subscribe((data) => {

        // Show the success message
        this._matSnackBar.open('Cập nhật đơn vị hành chính thành công', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        //this._location.go('apps/admission/quan-huyen/' + data.Id);
        this.dialogRef.close(this.quanHuyenForm.value);
      });
  }

  close() {
    this.dialogRef.close();
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */



interface QuanHuyenNode {
  expandable: boolean;
  Id: number;
  Ten: string;
  ChaId: number;
  Cap: string;
  ThuTu: number;
  MaQuanLy: string;
  NgayTao: Date;
  NgaySua: Date;
  NguoiTao: string;
  NguoiSua: string;
  children?: QuanHuyen[];
  level: number;
}