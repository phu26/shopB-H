import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { QuanHuyenService } from '../quan-huyen.service';
import { fuseAnimations } from '@fuse/animations';
import { FilesDataSource } from '../../resource.class';
import { MatPaginator, MatSort, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge, } from 'rxjs';
import { QuanLyQuanHuyenComponentDialog } from '../quan-ly-quan-huyen/quan-ly-quan-huyen.component';


@Component({
  selector: 'app-quan-ly-dsdon-vi-hanh-chinh',
  templateUrl: './quan-ly-dsdon-vi-hanh-chinh.component.html',
  styleUrls: ['./quan-ly-dsdon-vi-hanh-chinh.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class QuanLyDSDonViHanhChinhComponent implements OnInit {

  dataSource: FilesDataSource<QuanHuyenService> | null;
  displayedColumns: string[] = ['maQuanLy','ten', 'tenCapCha', 'cap', 'xoa'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;
  filterNhomChaId = '';

  pageIndex: number = 0;
  pageSize: number = 10;
  confirmDialogRef: MatDialogRef<DialogComponent>;

  openDialog(id) {
    let dialogRef = this.dialog.open(QuanLyQuanHuyenComponentDialog, {
      height: '600px',
      width: '800px',
      data: id
    });
    dialogRef.componentInstance.quanHuyen.Id = id;
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  // xoa
  btnXoaClicked(id: number): void {
    //alert(id);
    this.confirmDialogRef = this._matDialog.open(DialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.message = `Xác nhận xóa đơn vị hành chính này?`;
    this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
    this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
    this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._quanHuyenService.delete(id).subscribe(
          success => {

            this.ngOnInit();
            this._matSnackBar.open('Xóa thành công', 'OK', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 2000, panelClass: 'SuccessSnackbar'
            });
          },
          error => {

            this._matSnackBar.open('Xóa không thành công ' + error.error.Message, 'OK', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 2000, panelClass: 'ErrorSnackbar'
            });
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }



  constructor(public _quanHuyenService: QuanHuyenService,
    public _activeR: ActivatedRoute,
    public _router: Router,
    public _matDialog: MatDialog,
    public _matSnackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  /**
   * On init
   */
  ngOnInit(): void {
    //custom pinator
    this.paginator._intl.itemsPerPageLabel = 'Số dòng';

    this.dataSource = new FilesDataSource(this._quanHuyenService);

    let params = this._activeR.snapshot.queryParams;
    if (params["pageIndex"] != undefined) {
      this.pageIndex = (params["pageIndex"] - 1);
      this.pageSize = params["pageSize"];
      this.filter.nativeElement.value = params["textSearch"];
      this.dataSource.loadLessons(this.filterNhomChaId, this.filter.nativeElement.value, 'Id', (this.pageIndex), this.pageSize);
    }
    else {
      this.dataSource.loadLessons(this.filterNhomChaId);
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
      { relativeTo: this._activeR, queryParams: { pageIndex: this.paginator.pageIndex + 1, pageSize: this.paginator.pageSize, textSearch: this.filter.nativeElement.value } });
    this.dataSource.loadLessons(this.filterNhomChaId,
      this.filter.nativeElement.value, this.geColumnSort(),
      this.paginator.pageIndex, this.paginator.pageSize);
  }

}