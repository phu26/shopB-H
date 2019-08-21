import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DanhSachNguyenVongComponent } from '../nguyen-vong/danh-sach-nguyen-vong/danh-sach-nguyen-vong.component';
import { FilesDataSource } from '../resource.class';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tra-cuu',
  templateUrl: './tra-cuu.component.html',
  styleUrls: ['./tra-cuu.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class TraCuuComponent extends DanhSachNguyenVongComponent {

  displayedColumns: string[] = ['MaHoSo','PhuongThucXetTuyen' , 'Diem', 'TrungTuyen'];

  ngOnInit(): void {
    this.dataSource = new FilesDataSource(this._danhSachNguyenVongService);
    //this.dataSource.loadLessons(this.filtershow);

    //this.filtershow = 'nv.TrungTuyen is not null';

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

  loadLessonsPage() {
    if (this.filter.nativeElement.value == null || this.filter.nativeElement.value == '') {
      //bấccs#!@#@!#@$%#! là chuỗi search không thấy được
      this.dataSource.loadLessons(
        this.filtershow
        , 'bấccs#!@#@!#@$%#!', this.geColumnSort()
        , this.paginator.pageIndex, this.paginator.pageSize
        ,'sinhvientracuu');
    }
    else {
      this.dataSource.loadLessons(
        this.filtershow
        , this.filter.nativeElement.value, this.geColumnSort()
        , this.paginator.pageIndex, this.paginator.pageSize
        ,'sinhvientracuu');
    }

  }

}
