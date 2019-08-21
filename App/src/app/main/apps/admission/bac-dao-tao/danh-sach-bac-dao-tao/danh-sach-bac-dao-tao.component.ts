import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { BacDaoTaoService } from 'app/main/apps/admission/bac-dao-tao/bac-dao-tao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilesDataSource } from 'app/main/apps/admission/resource.class';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';

@Component({
    selector: 'app-danh-sach-bac-dao-tao',
    templateUrl: './danh-sach-bac-dao-tao.component.html',
    styleUrls: ['./danh-sach-bac-dao-tao.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachBacDaoTaoComponent implements OnInit {

    dataSource: FilesDataSource<BacDaoTaoService> | null;
    displayedColumns: string[] = ['ten', 'xoa'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;
    confirmDialogRef: MatDialogRef<DialogComponent>;




    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(private _bacdaotaoService: BacDaoTaoService, private _activeR: ActivatedRoute, private _router: Router, private _matDialog: MatDialog, private _matSnackBar: MatSnackBar) {
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Số dòng';

        this.dataSource = new FilesDataSource(this._bacdaotaoService);

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

    // xoa
    btnXoaClicked(id: number): void {
        //alert(id);
        this.confirmDialogRef = this._matDialog.open(DialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.message = `Xác nhận xóa bậc đào tạo này?`;
        this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
        this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
        this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._bacdaotaoService.delete(id).subscribe(
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
