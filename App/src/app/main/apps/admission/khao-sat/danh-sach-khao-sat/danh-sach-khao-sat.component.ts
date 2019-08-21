
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { KhaoSatService } from 'app/main/apps/admission/khao-sat/khao-sat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilesDataSource } from 'app/main/apps/admission/resource.class';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';

@Component({
    selector: 'app-danh-sach-khao-sat',
    templateUrl: './danh-sach-khao-sat.component.html',
    styleUrls: ['./danh-sach-khao-sat.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachKhaoSatComponent implements OnInit {
    // Id: number;
    // Ten: string;
    // KichHoat: boolean;    
    // NgayTao: Date;
    // NgaySua: Date;
    // NguoiTao: string;
    // NguoiSua: string;
    dataSource: FilesDataSource<KhaoSatService> | null;
    displayedColumns: string[] = [ 'ten', 'kichHoat', 'xoa'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;
    confirmDialogRef: MatDialogRef<DialogComponent>;


    // xoa
    btnXoaClicked(id: number): void {
        //alert(id);
        this.confirmDialogRef = this._matDialog.open(DialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.message = `Xác nhận xóa khảo sát này?`;
        this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
        this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
        this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._khaosatService.delete(id).subscribe(
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

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(private _khaosatService: KhaoSatService, private _activeR: ActivatedRoute, private _router: Router, private _matDialog: MatDialog, private _matSnackBar: MatSnackBar) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        //custom pinator
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';

        this.dataSource = new FilesDataSource(this._khaosatService);
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
}
