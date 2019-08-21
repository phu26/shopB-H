import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { fuseAnimations } from '@fuse/animations';
import { ThongBaoNgoaiService } from './thong-bao-ngoai.service';
import { ThongBao } from '../Models/ThongBao.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-thong-bao-ngoai',
  templateUrl: './thong-bao-ngoai.component.html',
  styleUrls: ['./thong-bao-ngoai.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ThongBaoNgoaiComponent implements OnInit {
  htmlContent:string;
  thongBao = new ThongBao();
  constructor(private _ThongBaoNgoaiService: ThongBaoNgoaiService,private _matSnackBar: MatSnackBar) {
    debugger;
    this._ThongBaoNgoaiService.single(1).pipe().subscribe(item=>{
      this.thongBao = new ThongBao(item);
      this.htmlContent = this.thongBao.NoiDung;
    });
   }

  ngOnInit() {
  }

  SaveNotification(){
    console.log(this.htmlContent);
    this.thongBao.NoiDung = this.htmlContent;
    this._ThongBaoNgoaiService.update(this.thongBao)
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
  config: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '500px',
      minHeight: '450',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
};
}

