import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FilesDataSource } from 'app/main/apps/admission/resource.class';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { CotDiemService } from '../cot-diem.service';

import { CotDiem } from '../../Models/CotDiem.model';
import { ChiTietCotDiemComponent } from '../chi-tiet-cot-diem/chi-tiet-cot-diem.component';


@Component({
    selector: 'app-danh-sach-cot-diem',
    templateUrl: './danh-sach-cot-diem.component.html',
    styleUrls: ['./danh-sach-cot-diem.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachCotDiemComponent implements OnInit {

    dataSource: FilesDataSource<CotDiemService> | null;
    displayedColumns: string[] = ['ten', 'ma', 'ghiChu', 'quyDinhId', 'edit', 'xoa'];

    @Output() cotDiemEmit = new EventEmitter<CotDiem>();

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    pageIndex: number = 0;
    pageSize: number = 5;
    confirmDialogRef: MatDialogRef<DialogComponent>;

    rowCotDiemClicked(cotDiem: CotDiem) {
        //console.log(cotDiem);
        this.cotDiemEmit.emit(cotDiem);
    }
    // Sua
    btnSuaClicked(id: number): void {
        const dialogRef = this._matDialog.open(ChiTietCotDiemComponent, {
            width: '600px', data: {
                _idRouter: id.toString()
            }
        });
        dialogRef.componentInstance._idRouter = id.toString();

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.ngOnInit();
        });
    }
    // xoa
    btnXoaClicked(id: number): void {
        //alert(id);
        this.confirmDialogRef = this._matDialog.open(DialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.message = `Xác nhận xóa cột điểm này?`;
        this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
        this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
        this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._cotDiemotDiemService.delete(id).subscribe(
                    success => {
                        this.ngOnInit();
                        this._matSnackBar.open('Xóa thành công', 'OK', {
                            verticalPosition: 'top', horizontalPosition: 'right',
                            duration: 2000, panelClass: 'SuccessSnackbar'
                        });
                    },
                    error => {
                        //console.log("không xóa được " + id);
                        this._matSnackBar.open('Xóa không thành công', 'OK', {
                            verticalPosition: 'top', horizontalPosition: 'right',
                            duration: 2000, panelClass: 'ErrorSnackbar'
                        });
                    }
                );
            }
            this.confirmDialogRef = null;
        });
    }



    constructor(private _cotDiemotDiemService: CotDiemService,
        private _matDialog: MatDialog,
        private _matSnackBar: MatSnackBar) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';

        this.dataSource = new FilesDataSource(this._cotDiemotDiemService);


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
    addCotDiemClicked() {

        const dialogRef = this._matDialog.open(ChiTietCotDiemComponent, {
            width: '600px'
        });
        dialogRef.componentInstance._idRouter = 'them';

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.ngOnInit();
        });
    }
}
