import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { DoiTuongUuTienService } from '../doi-tuong-uu-tien.service';
import { MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { merge, Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { FilesDataSource } from '../../resource.class';
import { fuseAnimations } from '@fuse/animations';
import { Location } from '@angular/common';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-danh-sach-doi-tuong-uu-tien',
  templateUrl: './danh-sach-doi-tuong-uu-tien.component.html',
  styleUrls: ['./danh-sach-doi-tuong-uu-tien.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DanhSachDoiTuongUuTienComponent implements OnInit {
  dataSource: FilesDataSource<DoiTuongUuTienService> | null;

  // Cấu hình trường hiển thị
  // displayedColumns = ['id', 'ten', 'name', 'category', 'price', 'quantity', 'active'];
  displayedColumns: string[] = ['ten','maDoiTuong', 'diemCong', 'xoa'];


  // https://kipalog.com/posts/Angular2-comunication--Component-interaction----Tuong-giac-giua-cac-components-trong-Angular2
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;
  pageIndex: number = 0;
  pageSize: number = 10;
  confirmDialogRef: MatDialogRef<DialogComponent>;

  // Private

  /**
   * constructor
   * 
   * @param {DoiTuongUuTienService} _doiTuongUuTiensService 
   * @param {Location} _location 
   * @param {MatSnackBar} _matSnackBar 
   * @param {MatDialog} _matDialog
   * @param {ActivatedRoute} _activeRoute
   * @param {Router} _router
   */
  constructor(
    private _doiTuongUuTiensService: DoiTuongUuTienService,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Số dòng';
    
    this.dataSource = new FilesDataSource(this._doiTuongUuTiensService);
    //this.dataSource.loadLessons();
    let params = this._activeRoute.snapshot.queryParams;
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
  ngAfterViewInit(): void {

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
  getColumnSort() {
    let sort = undefined; // if sort is undefined , It will set defaut parameter.
    if (this.sort.active && this.sort.direction) {
      sort = `${this.sort.active} ${this.sort.direction}`;
    }

    return sort;
  }

  loadLessonsPage(): void {
    this._router.navigate(['.'],
      { relativeTo: this._activeRoute, queryParams: { pageIndex: this.paginator.pageIndex + 1, pageSize: this.paginator.pageSize, textSearch: this.filter.nativeElement.value } });
    this.dataSource.loadLessons('',
      this.filter.nativeElement.value, this.getColumnSort(),
      this.paginator.pageIndex, this.paginator.pageSize);
  }

  /**
   * Xóa khỏi danh sách
   * @param id 
   */
  ngDeleteColumn(id: number): void {
    this.confirmDialogRef = this._matDialog.open(DialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.message = `Xác nhận xóa đối tượng này?`;
    this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
    this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
    this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._doiTuongUuTiensService.delete(id).subscribe(
          success => {
            this.ngOnInit();
            this._matSnackBar.open('Xóa thành công', 'OK', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 2000
            });
          },
          error => {
            this._matSnackBar.open('Xóa không thành công', 'OK', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 2000
            });
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  /**
   * Cập nhật dữ liệu 
   * @param id
   */
  ngUpdateColumn(id: number): void {
    // Go to them-doi-tuong-uu-tien-component
    this._location.go('admission/doi-tuong-uu-tien/' + id);
  }

  /**
   * Xem chi tiết
   * @param id 
   */
  ngViewColumnDetails(id: number): void {

  }

}
