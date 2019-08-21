import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DotTuyenSinhService } from '../dot-tuyen-sinh.service'
import { DotTuyenSinh } from '../../Models/DotTuyenSinh.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-noi-dung-thong-bao-email',
  templateUrl: './noi-dung-thong-bao-email.component.html',
  styleUrls: ['./noi-dung-thong-bao-email.component.scss']
})
export class NoiDungThongBaoEmailComponent implements OnInit {

  item = new DotTuyenSinh();
  _idRouter: string;
  _loaiNhapId: string;
  _loaiNhap: string;
  htmlContent: string;
  pageType:string = null;

  constructor(private _DotTuyenSinhService: DotTuyenSinhService, 
    private activatedRoute: ActivatedRoute, private _matSnackBar: MatSnackBar) { 
      
    this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
    this._loaiNhapId = this.activatedRoute.snapshot.paramMap.get('loai');
    if(this._loaiNhapId == 'thongbao') {
      this._loaiNhap = 'thông báo';
    } else {
      this._loaiNhap = 'email';
    }
    
    this._DotTuyenSinhService.single(Number(this._idRouter)).pipe()
        .subscribe(item => {
          debugger;
          this.item = new DotTuyenSinh(item);
          if(this._loaiNhapId == 'thongbao') {
            this.htmlContent = this.item.NoiDungThongBao;
          } else {
            this.htmlContent = this.item.NoiDungEmail;
          }  
        });
  }

  onClinckSave() {
    debugger;
    if(this._loaiNhapId == 'thongbao') {
      this.item.NoiDungThongBao = this.htmlContent;
    } else {
      this.item.NoiDungEmail = this.htmlContent;
    }  
    this._DotTuyenSinhService.update(this.item)
      .subscribe(() => {
        // Show the success message
        this._matSnackBar.open('Đã cập nhật thông báo thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });
      }, error=>{
        this._matSnackBar.open('Cập nhật thông báo không thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
      });
  }

  ngOnInit() {
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
}
