import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatDialogModule, MatDialog, MatDialogRef, MatStepper, MatVerticalStepper } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UploadFilesService } from './upload-files.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DanhMucUploadService } from './danh-muc-upload.service';
import { FilesDataSource } from '../resource.class';
import { DanhMucUploadComponent } from './danh-muc-upload/danh-muc-upload.component';
import { DataExcelService } from './data-excel-upload.service';


import * as signalR from "@aspnet/signalr";
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { DongBoDanhMucComponent } from './dong-bo-danh-muc/dong-bo-danh-muc.component';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput: ElementRef;

  percentDone: number;
  uploadSuccess: boolean;

  filePath: any;
  fileExtension: any;

  displayedColumns: string[] = ['select', 'ho', 'ten', 'ngaysinh', 'noisinh', 'cmnd', 'gioitinh', 'diachilienlac', 'madoituonguutien', 'makhuvucuutien', 'matinhthanh', 'maquanhuyen', 'sdt', 'matruonglop12', 'namtn', 'email', 'sobaodanh', 'manganhdaotao', 'matohopmon', 'diemmon1', 'diemmon2', 'diemmon3'];
  dataSource: FilesDataSource<DataExcelService> = new FilesDataSource<DataExcelService>(this._dataExcelService);
  selection = new SelectionModel<any>(true, []);
  isUpload = false;
  loadSpinner = false;
  danhmucid: number = null;
  isLoadData: boolean = false;
  dottuyensinhid = this.activatedRoute.snapshot.paramMap.get('id');

  @ViewChild('paginatorup') paginatorup: MatPaginator;

  danhMucs: any[] = [];
  isOpenHD: boolean = false;
  isImportData:boolean=false;
  hubConnection: signalR.HubConnection;

  checkNganhDaoTao: boolean = null;
  checkDoiTuongUuTien: boolean = null;
  checkKhuVucUuTien: boolean = null;
  checkTinhThanh:boolean=null;
  checkQuanHuyen:boolean=null;
  checkDanhMucLoading: boolean = false;
  checkImportDuLieu:boolean=null;
  confirmDialogRef: MatDialogRef<DialogComponent>;
  dongBoDanhMucRef: MatDialogRef<DongBoDanhMucComponent>;
  @ViewChild('checksteper')  matstep: MatVerticalStepper;


  constructor(private _uploadService: UploadFilesService, private _matSnackBar: MatSnackBar
    , private activatedRoute: ActivatedRoute, private _matDialog: MatDialog, private _danhMucUploadService: DanhMucUploadService,
    private _dataExcelService: DataExcelService) {
    //this.paginatorup._intl.itemsPerPageLabel = 'Số dòng';

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:61186/jobprogress")
      .configureLogging(signalR.LogLevel.Information)
      .build();

  }

  ngOnInit() {
    this.paginatorup._intl.itemsPerPageLabel = 'Số dòng';
    this.loadDanhMucs();

  }

  loadDanhMucs() {
    this._danhMucUploadService.all().subscribe(data => {
      this.danhMucs = data;
      console.log(data);
    });
  }

  loadSinhVien(event: any) {
    this.dataSource = new FilesDataSource(this._dataExcelService);
    this.dataSource.loadLessons('DanhMucId=' + this.danhmucid + " and DotTuyenSinhId=" + this.dottuyensinhid);
    this.isLoadData = true;
    //this.paginator._intl.itemsPerPageLabel = 'Số dòng';
    console.log(this.dataSource);
    //this.dataSource.
  }

  upload(files: FileList) {
    // files = this.fileInput.nativeElement.files;
    //this.uploadAndProgress(files.item(0));
  }
  openHuongDan() {
    if (this.isOpenHD)
      this.isOpenHD = false;
    else
      this.isOpenHD = true;
  }
  uploadAndProgress(files: File) {
    this._uploadService.upload(files).subscribe(obj => {
      debugger;
      this.filePath = obj.filePath;
      this.fileExtension = obj.fileExtension;

    }, (err: HttpErrorResponse) => {
    }, () => {
      console.info("completed!");
    });
    debugger;


  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.lessonsSubject.value.length;
    return numSelected === numRows;
  }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.lessonsSubject.value.forEach(row => this.selection.select(row));
  }
  addCategory() {
    const dialogRef = this._matDialog.open(DanhMucUploadComponent, {
      width: '1000px',
      // height: '550px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadDanhMucs();
      if (result != null) {
        this.danhmucid = result;
        this.loadSinhVien(null);
      }
    });
  }
  insertSQL() {

    if (this.filePath == "") {
      this._matSnackBar.open('Vui lòng chọn file để upload', 'OK', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 2000, panelClass: 'SuccessSnackbar'
      });
    } else {
      this.loadSpinner = true;
      let files = this.fileInput.nativeElement.files;

      this._uploadService.importExcel(files.item(0), this.danhmucid, this.dottuyensinhid).subscribe(data => {
        this._matSnackBar.open('Upload thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });
        this.isUpload = true;
        this.loadSinhVien(null);
        this.loadSpinner = false;
      }, error => {
        debugger;
        this._matSnackBar.open(error.error.error, 'ERROR', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
        this.loadSpinner = false;
      });
    }
  }

  DongBoKetQua(){
    this.isImportData=true;
    this.checkImportDuLieu=null;
    this._dataExcelService.importExcel(null,this.danhmucid,this.dottuyensinhid).subscribe(x=>{
      this.checkImportDuLieu=true;
      this.dongBoDanhMucRef.componentInstance.checkImportDuLieu=true;
      this._matSnackBar.open("Đã import xong", 'Success', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 2000, panelClass: 'SuccessSnackbar'});
        this.loadSinhVien(null);
      }
    );
   //this.StartProgress();
  }

    importData() {
      if (this.checkDanhMucLoading == false) {
        // chưa đồng bộ
        // if (this.selection.selected.length == 0) {
        //   this._matSnackBar.open('Chọn nguyện vọng để đồng bộ', 'OK', {
        //     verticalPosition: 'top', horizontalPosition: 'right',
        //     duration: 2000, panelClass: 'ErrorSnackbar'
        //   });
        //   return;
        // }

        if (this.dataSource.length == 0) {
          this._matSnackBar.open('Vui lòng upload dữ liệu trước khi import dữ liệu', 'OK', {
            verticalPosition: 'top', horizontalPosition: 'right',
            duration: 2000, panelClass: 'ErrorSnackbar'
          });
          return;
        }

        this.checkDanhMucOpen();
  
        this.checkDanhMucLoading = true;
        ////begin  dong bo
        this.checkDongBoDuLieuProcess();
        //end  dong bo
  
        // gán trạng thái là đang đồng bộ
  
  
      }
      else {
        this.checkDanhMucOpen();
      }
  
    }
  checkDanhMucOpen() {
    this.dongBoDanhMucRef = this._matDialog.open(DongBoDanhMucComponent, {
      disableClose: false
    });

    this.dongBoDanhMucRef.componentInstance.checkNganhDaoTao = this.checkNganhDaoTao;
    this.dongBoDanhMucRef.componentInstance.checkKhuVucUuTien = this.checkKhuVucUuTien;
    this.dongBoDanhMucRef.componentInstance.checkDoiTuongUuTien = this.checkKhuVucUuTien;
    this.dongBoDanhMucRef.componentInstance.checkQuanHuyen = this.checkQuanHuyen;
    this.dongBoDanhMucRef.componentInstance.checkTinhThanh=this.checkTinhThanh;

  }
  async checkDongBoDuLieuProcess() {
    //alert(this.dongBoDanhMucRef.componentInstance.selectedindex);
    let res = await Promise.all(
      [ this.checkDanhMucNganhDaoTao()
        , this.checkDanhMucDoiTuongUuTien()
        , this.checkDanhMucKhuVucUuTien()
        //,this.checkDanhMucTinhThanh()
        //,this.checkDanhMucQuanHuyen()
        //,this.execImportData()
      ]);
    
  }
  execImportData(){
    debugger;
    if(this.checkDoiTuongUuTien==true&&this.checkKhuVucUuTien==true&&this.checkNganhDaoTao==true){
      this.checkDanhMucOpen();
      this.dongBoDanhMucRef.componentInstance.selectedindex = 1;
      this.DongBoKetQua();
    }else{
      this._matSnackBar.open('Vui lòng kiểm tra lại danh mục dữ liệu trước khi import dữ liệu', 'OK', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 2000, panelClass: 'ErrorSnackbar'
      });
      return;
    }
  }
  checkDanhMucNganhDaoTao() {
    // kiểm xong thì gán giá trị cho biến CheckNganhDaoTao ở component và dialog
    this._dataExcelService.checkDMNganhDaoTao(this.dottuyensinhid,this.danhmucid,null).subscribe(
      x=>{
        if(x.body!=null&&((x.body) as any[]).length==0)
        {
          this.checkNganhDaoTao =true ;
          this.dongBoDanhMucRef.componentInstance.checkNganhDaoTao =true ;
        }else{
          this.checkNganhDaoTao =false ;
          this.dongBoDanhMucRef.componentInstance.checkNganhDaoTao =false ;
        }
      }
    );

  }
  checkDanhMucDoiTuongUuTien() {
    // kiểm xong thì gán giá trị cho biến checkDoiTuongUuTien ở component và dialog
    this._dataExcelService.checkDMDoiTuongUuTien(this.dottuyensinhid,this.danhmucid,null).subscribe(
      x=>{
        if(x.body!=null&&((x.body) as any[]).length==0)
        {
          this.checkDoiTuongUuTien =true ;
          this.dongBoDanhMucRef.componentInstance.checkDoiTuongUuTien =true ;
        }else{
          this.checkDoiTuongUuTien =false ;
          this.dongBoDanhMucRef.componentInstance.checkDoiTuongUuTien =false ;
        }
      }
    );
  }
  checkDanhMucKhuVucUuTien() {
    // kiểm xong thì gán giá trị cho biến checkKhuVucUuTien ở component và dialog
    this._dataExcelService.checkDMKhuVucUuTien(this.dottuyensinhid,this.danhmucid,null).subscribe(
      x=>{
        if(x.body!=null&&((x.body) as any[]).length==0)
        {
          this.checkKhuVucUuTien =true ;
          this.dongBoDanhMucRef.componentInstance.checkKhuVucUuTien =true ;
        }else{
          this.checkKhuVucUuTien =false ;
          this.dongBoDanhMucRef.componentInstance.checkKhuVucUuTien =false ;
        }
      }
    );
  }
  checkDanhMucTinhThanh(){

  }

  checkDanhMucQuanHuyen(){

  }



  public startConnection = (jobids) => {

    this.hubConnection.on("progressimport",

      (car) => {
        if(car.IsSucces!=null)
        console.log(car);
        // if (car.i === 100) {
        //   document.getElementById(car.jobId).innerText = "Finished!";
        // } else {
        //   document.getElementById(car.jobId).innerText = `${car.i}%`;
        // }
      });

    this.hubConnection.start().then(() => {

        console.log('Connection started');

        jobids.forEach(element => {
          this.hubConnection.invoke("AssociateJob", element)
        });

      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  StartProgress() {
   // this.httpClient.post('http://localhost:61186/api/v1.0/Signalrs/StartProgress', null).subscribe
    this._dataExcelService.StartImport(null,this.danhmucid,this.dottuyensinhid).subscribe
         (data => {
        //render danh sach jobids
        //this.Jobs = data as any[string];
        this.startConnection(data);
      }, err => {
        console.error(err)
      }
      );
  }

}
