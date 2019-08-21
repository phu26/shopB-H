import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostBinding } from '@angular/core';
import { FilesDataSource } from '../../resource.class';
import { HinhThucXetTuyenService } from '../hinh-thuc-xet-tuyen.service';
import { MatDialogRef, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'danh-sach-hinh-thuc-xet-tuyen',
  templateUrl: './danh-sach-hinh-thuc-xet-tuyen.component.html',
  styleUrls: ['./danh-sach-hinh-thuc-xet-tuyen.component.scss'],
  animations:fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DanhSachHinhThucXetTuyenComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  displayedColumns = [ 'ten', 'kichHoat'];
  dataSource: FilesDataSource<HinhThucXetTuyenService> | null;
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
  
  constructor(
    private _hinhThucXetTuyenService: HinhThucXetTuyenService,
    private _activeR: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar
  ) { }
  
  btnXoaClicked(id: number): void {
    this.confirmDialogRef = this._matDialog.open(DialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.message = `Xác nhận xóa khu vực ưu tiên này?`;
    this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
    this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
    this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._hinhThucXetTuyenService.delete(id).subscribe(
          success => {
            this.ngOnInit();
            this._matSnackBar.open('Xóa thành công', 'OK', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 2000
            });
          },
          error => {
            
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
    //custom pinator
    this.paginator._intl.itemsPerPageLabel = 'Số dòng';

    this.dataSource = new FilesDataSource(this._hinhThucXetTuyenService);
    //this.dataSource.loadLessons();
    let params = this._activeR.snapshot.queryParams;
    if (params["pageIndex"] != undefined) {
      this.pageIndex = (params["pageIndex"] - 1);
      this.pageSize = params["pageSize"];
      this.filter.nativeElement.value = params["textSearch"];
      this.dataSource.loadLessons('', this.filter.nativeElement.value, 'Id', (this.pageIndex), this.pageSize);
    }
    else {
      this.dataSource.loadLessons();
    }

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
    this._router.navigate(['.'],
    {relativeTo:this._activeR,queryParams:{pageIndex:this.paginator.pageIndex+1,pageSize:this.paginator.pageSize,textSearch:this.filter.nativeElement.value}});
    this.dataSource.loadLessons('',
        this.filter.nativeElement.value, this.geColumnSort(),
        this.paginator.pageIndex, this.paginator.pageSize);
  }

}
