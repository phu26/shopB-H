import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {
    MatPaginator, MatSort, MatTableDataSource, MatSnackBar
} from '@angular/material';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { FilesDataSource } from 'app/main/apps/admission/resource.class';
import { XetTuyenService } from '../xet-tuyen.service';
import { eraseStyles } from '@angular/animations/browser/src/util';

@Component({
    selector: 'app-danh-sach-xet-tuyen-theo-dot-tuyen-sinh',
    templateUrl: './danh-sach-xet-tuyen-theo-dot-tuyen-sinh.component.html',
    styleUrls: ['./danh-sach-xet-tuyen-theo-dot-tuyen-sinh.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachXetTuyenTheoDotTuyenSinhComponent implements OnInit {


    dataSource: FilesDataSource<XetTuyenService> | null;
    displayedColumns: string[] = ['nganhDaoTaoId', 'nganhUisId', 'DanhSachToHopMon', 'chiTieu', 'chiTieuVuot', 'chiTieuThapNhat', 'diemSan', 'diemChuan', 'edit'];
    filter: string;
    tenDotTuyenSinh: string = '';

    @Output() nganhDaoTaoId = new EventEmitter();

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('textSearch')
    textSearch: ElementRef;


    // Private

    _idRouter: any;
    constructor(public _xetTuyenService: XetTuyenService, public activatedRoute: ActivatedRoute, public _matSnackBar: MatSnackBar) {
        this._idRouter = this.activatedRoute.snapshot.paramMap.get('dotTuyenSinhId');
        this.tenDotTuyenSinh = this.activatedRoute.snapshot.paramMap.get('tenDotTuyenSinh');

        this.filter = 'DotTuyenSinhId = ' + this._idRouter;
        console.log(this._idRouter);
    }


    /**
     * On init
     */
    ngOnInit(): void {
        //custom pinator
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';

        this.dataSource = new FilesDataSource(this._xetTuyenService);

        this.loadLessonsPage();


        fromEvent(this.textSearch.nativeElement, 'keyup')
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

        this.dataSource.loadLessons(this.filter,
            this.textSearch.nativeElement.value, this.geColumnSort(),
            this.paginator.pageIndex, this.paginator.pageSize);
    }
    saveRow(row: any) {
        row.editing = false;
        this._xetTuyenService.update(row)
            .subscribe(() => {
                // Show the success message
                this._matSnackBar.open('Đã cập nhật thành công', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'SuccessSnackbar'
                });
            }, error => {
                this._matSnackBar.open('Cập nhật không thành công', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'ErrorSnackbar'
                });
            });
        console.log(row);
    }
    cancelRow(row: any) {
        row.editing = false;
      }
    getNganhDaoTao(nganhDaoTao: any) {
        console.log(nganhDaoTao);
    }
}
