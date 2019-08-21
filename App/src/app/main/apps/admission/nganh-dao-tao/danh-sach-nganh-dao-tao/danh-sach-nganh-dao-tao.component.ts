
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, HostBinding, Inject, Optional, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { fromEvent, merge, } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, filter } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { NganhDaoTaoService } from 'app/main/apps/admission/nganh-dao-tao/nganh-dao-tao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilesDataSource } from 'app/main/apps/admission/resource.class';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { NganhDaoTao } from '../../Models/NganhDaoTao.model';
import { ToHopCotDiem } from '../../Models/ToHopCotDiem.model';
import { DotTuyenSinh } from '../../Models/DotTuyenSinh.model';
import { FuseConfigService } from '@fuse/services/config.service';


@Component({
    selector: 'app-danh-sach-nganh-dao-tao',
    templateUrl: './danh-sach-nganh-dao-tao.component.html',
    styleUrls: ['./danh-sach-nganh-dao-tao.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachNganhDaoTaoComponent implements OnInit {

    dataSource: FilesDataSource<NganhDaoTaoService> | null;
    displayedColumns: string[] = ['ten', 'ghiChu', 'nganhUisId', 'KichHoat', 'nhomChaId', 'xoa'];

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

    // xoa
    btnXoaClicked(id: number): void {
        //alert(id);
        this.confirmDialogRef = this._matDialog.open(DialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.message = `Xác nhận xóa ngành đào tạo này?`;
        this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
        this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
        this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._nganhDaoTaoService.delete(id).subscribe(
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



    constructor(public _nganhDaoTaoService: NganhDaoTaoService,
        public _activeR: ActivatedRoute,
        public _router: Router,
        public _matDialog: MatDialog,
        public _matSnackBar: MatSnackBar
    ) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        //custom pinator
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';

        this.dataSource = new FilesDataSource(this._nganhDaoTaoService);

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
@Component({
    selector: 'app-danh-sach-nganh-dao-tao-modal',
    templateUrl: './danh-sach-nganh-dao-tao-modal.component.html',
    styleUrls: ['./danh-sach-nganh-dao-tao.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachNganhDaoTaoModalComponent extends DanhSachNganhDaoTaoComponent {
    displayedColumns: string[] = ['select', 'ten', 'ghiChu', 'nganhUisId', 'kichHoat', 'nhomChaId'];
    filterNhomChaId = '';
    selection = new SelectionModel<any>(true, []);
    nganhDaoTaos: NganhDaoTao[] = [];
    pageSize: number = 5;

    constructor(public _nganhDaoTaoService: NganhDaoTaoService,
        public _activeR: ActivatedRoute,
        public _router: Router,
        public _matDialog: MatDialog,
        public _matSnackBar: MatSnackBar,
        public _dialogRef: MatDialogRef<DanhSachNganhDaoTaoModalComponent>
    ) {
        super(_nganhDaoTaoService, _activeR, _router, _matDialog, _matSnackBar);
    }

    ngOnInit(): void {
        //custom pinator
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';

        this.dataSource = new FilesDataSource(this._nganhDaoTaoService);

        let params = this._activeR.snapshot.queryParams;
        if (params["pageIndex"] != undefined) {
            this.pageIndex = (params["pageIndex"] - 1);
            this.pageSize = params["pageSize"];
            this.filter.nativeElement.value = params["textSearch"];
            this.dataSource.loadLessons(this.filterNhomChaId, this.filter.nativeElement.value, 'Id', (this.pageIndex), this.pageSize);
        }
        else {
            this.dataSource.loadLessons(this.filterNhomChaId, undefined, undefined, undefined, 5);
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

    loadLessonsPage() {

        this.dataSource.loadLessons(this.filterNhomChaId,
            this.filter.nativeElement.value, this.geColumnSort(),
            this.paginator.pageIndex, this.paginator.pageSize);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.lessonsSubject.value.forEach(row => this.selection.select(row));
    }

    onCloseClick(): void {

        this._dialogRef.close(this.nganhDaoTaos = this.selection.selected);
    }

}


@Component({
    selector: 'app-danh-sach-nganh-dao-tao-list',
    templateUrl: './danh-sach-nganh-dao-tao-list.component.html',
    styleUrls: ['./danh-sach-nganh-dao-tao.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachNganhDaoTaoListComponent implements OnInit {

    @Input() dotTuyenSinh: DotTuyenSinh;
    @Input() dotTuyenSinhId: number = -1;
    @Input() nganhDaoTaos: NganhDaoTao[] = [];

    toHopCotDiems: any[] = [];
    toHopCotDiem: ToHopCotDiem = new ToHopCotDiem();
    nganhDaoTaoSelected: NganhDaoTao = new NganhDaoTao();

    @Output() toHopMonEmit = new EventEmitter<any>();
    @Output() onEmitChangeDanhSachNganhDaoTao = new EventEmitter<DotTuyenSinh>();

    filterEmit = new EventEmitter<null>();
    filterNganhDaoTao: string = "";



    constructor(public _nganhDaoTaoService: NganhDaoTaoService,
        public _activeR: ActivatedRoute,
        public _router: Router,
        public _matDialog: MatDialog,
        public _matSnackBar: MatSnackBar

    ) {

    }

    ngOnInit() {
        this.filterEmit.subscribe(x => {
            this.nganhDaoTaos = this.dotTuyenSinh.DanhSachNganhDaoTao
                .filter(x => this.cleanAccents(x.Ten.toLocaleLowerCase())
                    .match(this.cleanAccents(this.filterNganhDaoTao.toLocaleLowerCase() || '')) != null);
        });
    }

    @HostBinding('style.align-content') alignContent = 'right';
    openDialog(): void {
        const dialogRef = this._matDialog.open(DanhSachNganhDaoTaoModalComponent, {
            width: '1000px',
            // height: '550px',
            data: null
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result != null)
                result.forEach(element => {
                    if (this.dotTuyenSinh.DanhSachNganhDaoTao.findIndex(x => x.Id === element.Id) < 0)

                        this.dotTuyenSinh.DanhSachNganhDaoTao.push(element);

                });

            this.onfilter();

            this.onChangeDanhSachNganhDaoTao();

        });
    }

    onRemoveNganhDaoTao(nganhDaoTao: any): void {
        if(this.dotTuyenSinh.Id!=null)
        {
            let confirmDialogRef = this._matDialog.open(DialogComponent, {
                disableClose: false
            });
    
            confirmDialogRef.componentInstance.message = `Xóa Ngành đào tạo khỏi đợt tuyển sinh sẽ xóa thông tin các thí sinh đã đăng ký ngành này và không thể phục hồi. Xác nhận xóa?`;
            confirmDialogRef.componentInstance.title = 'Xác nhận xóa ngành đào tạo này khỏi Đợt tuyển sinh?';
            confirmDialogRef.componentInstance.btnOK = 'Xóa';
            confirmDialogRef.componentInstance.btnCancel = 'Hủy';
    
            confirmDialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.dotTuyenSinh.DanhSachNganhDaoTao.splice(this.dotTuyenSinh.DanhSachNganhDaoTao.findIndex(x => x.Id === nganhDaoTao.Id), 1);
                    this.onfilter();
                    this.onChangeDanhSachNganhDaoTao();
                    this.toHopMonEmit.emit(new NganhDaoTao());
                }
            });
        }
        else
        {
            this.dotTuyenSinh.DanhSachNganhDaoTao.splice(this.dotTuyenSinh.DanhSachNganhDaoTao.findIndex(x => x.Id === nganhDaoTao.Id), 1);
                    this.onfilter();
                    this.onChangeDanhSachNganhDaoTao();
                    this.toHopMonEmit.emit(new NganhDaoTao());
        }

    }

    onChangeDanhSachNganhDaoTao() {
        this.onEmitChangeDanhSachNganhDaoTao.emit(this.dotTuyenSinh);

    }

    onfilter() {

        this.filterEmit.emit();
    }
    cleanAccents(str: string): string {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Combining Diacritical Marks
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)
        return str;
    }

    onClickNganhDaoTao(nganhDaoTao: NganhDaoTao): void {

        this.nganhDaoTaoSelected = nganhDaoTao;

        //Nếu chưa xuống csdl lấy giá trị
        if (!this.nganhDaoTaoSelected.IsLoadData) {
            this._nganhDaoTaoService.getToHopCotDiemByNganhDaoTaoID(nganhDaoTao.Id, this.dotTuyenSinhId).subscribe(success => {
                // success.forEach(cotDiem => {

                //     this.nganhDaoTaoSelected.DanhSachToHopCotDiem.push(<ToHopCotDiem>cotDiem);
                // });
                this.nganhDaoTaoSelected.DanhSachToHopCotDiem = success;
                this.nganhDaoTaoSelected.IsLoadData = true;

            })
        }

        if (!this.nganhDaoTaoSelected.DanhSachToHopCotDiem)

            this.nganhDaoTaoSelected.DanhSachToHopCotDiem = new Array<ToHopCotDiem>();

        this.toHopMonEmit.emit(this.nganhDaoTaoSelected);


    }
}


