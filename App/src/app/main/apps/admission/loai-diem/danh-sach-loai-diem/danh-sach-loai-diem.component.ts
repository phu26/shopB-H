import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { fromEvent, merge, } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FilesDataSource } from 'app/main/apps/admission/resource.class';


import { CotDiem } from '../../Models/CotDiem.model';

import { LoaiDiemService } from '../loai-diem.service';

@Component({
  selector: 'app-danh-sach-loai-diem',
  templateUrl: './danh-sach-loai-diem.component.html',
  styleUrls: ['./danh-sach-loai-diem.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DanhSachLoaiDiemComponent implements OnInit {

  dataSource: FilesDataSource<LoaiDiemService> | null;
  displayedColumns: string[] = ['ten', 'ma'];

  @Input() dotTuyenSinhId = null;
  @Output() cotDiemEmit = new EventEmitter<CotDiem>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  pageIndex: number = 0;
  pageSize: number = 5;

  rowCotDiemClicked(cotDiem: CotDiem) {
    //console.log(cotDiem);
    this.cotDiemEmit.emit(cotDiem);
  }

  constructor(private _loaiDiemService: LoaiDiemService) {
    this._loaiDiemService.dotTuyenSinhId = this.dotTuyenSinhId;
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Số dòng';
    this._loaiDiemService.dotTuyenSinhId = this.dotTuyenSinhId;
    this.dataSource = new FilesDataSource(this._loaiDiemService);

    this.dataSource.loadLessons(undefined, undefined, undefined, undefined, 5);

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
    this.dataSource.loadLessons('',
      this.filter.nativeElement.value, this.geColumnSort(),
      this.paginator.pageIndex, this.paginator.pageSize);
  }
  addCotDiemClicked(){
    
  }
}

