// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-danh-muc-upload',
//   templateUrl: './danh-muc-upload.component.html',
//   styleUrls: ['./danh-muc-upload.component.scss']
// })
// export class DanhMucUploadComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FilesDataSource } from '../../resource.class';
import { MatDialogRef, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { DanhMucUploadService } from '../danh-muc-upload.service';
import { DanhMucUpload } from '../../Models/DanhMucUpload.model';

@Component({
  selector: 'app-danh-muc-upload',
  templateUrl: './danh-muc-upload.component.html',
  styleUrls: ['./danh-muc-upload.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DanhMucUploadComponent implements OnInit {
  //Cấu hình trường hiển thị
  displayedColumns = ['ten', 'edit'];
  dataSource: FilesDataSource<DanhMucUploadService> | null;
  confirmDialogRef: MatDialogRef<DialogComponent>;
  pageIndex: number = 0;
  pageSize: number = 10;

  //View child
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  constructor(private _danhMucUploadService: DanhMucUploadService,
    private _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DanhMucUploadComponent>) { }

  btnXoaClicked(id: number): void {
    this.confirmDialogRef = this._matDialog.open(DialogComponent, {
      disableClose: false,width:'500px'
    });
    this.confirmDialogRef.componentInstance.message = `Xác nhận xóa danh mục upload này?  Khi xóa sẽ mất dữ liệu không thể phục hồi lại được`;
    this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
    this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
    this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._danhMucUploadService.delete(id).subscribe(
          success => {
            this.ngOnInit();
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

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Số dòng';
    this.dataSource = new FilesDataSource(this._danhMucUploadService);
    //this.dataSource.loadLessons();

      this.dataSource.loadLessons();

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLessonsPage();
        })
      )
      .subscribe();

  }
  ngAfterViewInit() {

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }
  add() {

    var test = [new DanhMucUpload()];
    this.dataSource.lessonsSubject.value.forEach(element => {
      debugger;
      test.push(element);
    });
    this.dataSource.lessonsSubject.next(test);
  }
  /**
   * Return undefined or <colunmName> asc|desc
   */
  geColumnSort(): string {
    let sort = undefined; //if sort is undefined , It will set defaut parameter.
    if (this.sort.active && this.sort.direction)
      sort = `${this.sort.active} ${this.sort.direction}`;
    return sort;
  }

  loadLessonsPage() {
    this.dataSource.loadLessons('',
      this.filter.nativeElement.value, this.geColumnSort(),
      this.paginator.pageIndex, this.paginator.pageSize);
  }

  saveRow(row: any) {
    
    if(row.Id==null){
      this._danhMucUploadService.create(row)
      .subscribe((data) => {
        // Show the success message
        this._matSnackBar.open('Đã thêm thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });
        row.editing = false;
        //row.Id=data.Id;
        this.loadLessonsPage();
      }, error => {
        this._matSnackBar.open('Thêm không thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
      });
    }else{
    this._danhMucUploadService.update(row)
      .subscribe(() => {
        // Show the success message
        this._matSnackBar.open('Đã cập nhật thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });
        row.editing = false;
      }, error => {
        this._matSnackBar.open('Cập nhật không thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
      });
    }
  }

  cancelRow(row: any) {
    if(row.Id==null){
      this.loadLessonsPage();
    }
    row.editing = false;
    
  }
  chosenRow(row:any) {
    if(row.editing || row.Id==null)
    {

    }
    else
    {
      this.dialogRef.close(row.Id);
    }
    
  }

}

