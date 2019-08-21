import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FilesDataSource } from '../../resource.class';
import { ThiSinhService } from '../thi-sinh.service';
import { MatPaginator, MatSort, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'danh-sach-thi-sinh',
  templateUrl: './danh-sach-thi-sinh.component.html',
  styleUrls: ['./danh-sach-thi-sinh.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DanhSachThiSinhComponent implements OnInit {
  dataSource: FilesDataSource<ThiSinhService> | null;
  displayedColumns: string[] = ['id', 'ten', 'kichHoat', 'xoa'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  pageIndex: number = 0;
  pageSize: number = 10;
  confirmDialogRef: MatDialogRef<DialogComponent>;
  constructor(private _thiSinhsService: ThiSinhService,
    private _activeR: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog,
    private _matSnackBar: MatSnackBar) { }

  ngOnInit() {
    //custom pinator
    this.paginator._intl.itemsPerPageLabel = 'Số dòng';

    this.dataSource = new FilesDataSource(this._thiSinhsService);

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
      { relativeTo: this._activeR, queryParams: { pageIndex: this.paginator.pageIndex + 1, pageSize: this.paginator.pageSize, textSearch: this.filter.nativeElement.value } });
    this.dataSource.loadLessons('',
      this.filter.nativeElement.value, this.geColumnSort(),
      this.paginator.pageIndex, this.paginator.pageSize);
  }
}
