import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { FilesDataSource } from 'app/main/apps/admission/resource.class';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { ToHopCotDiemService } from '../to-hop-cot-diem.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NganhDaoTao } from '../../Models/NganhDaoTao.model';
import { ToHopCotDiem } from '../../Models/ToHopCotDiem.model';
import { DotTuyenSinh } from '../../Models/DotTuyenSinh.model';
import { ChiTietToHopCotDiemModalComponent } from '../chi-tiet-to-hop-cot-diem/chi-tiet-to-hop-cot-diem.component';
import { CotDiem_ToHopCotDiem } from '../../Models/CotDiem_ToHopCotDiem.model';
import { HinhThucXetTuyen } from '../../Models/HinhThucXetTuyen.model';
import { HinhThucXetTuyenService } from '../../hinh-thuc-xet-tuyen/hinh-thuc-xet-tuyen.service';

@Component({
    selector: 'app-danh-sach-to-hop-cot-diem',
    templateUrl: './danh-sach-to-hop-cot-diem.component.html',
    styleUrls: ['./danh-sach-to-hop-cot-diem.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachToHopCotDiemComponent implements OnInit {

    dataSource: FilesDataSource<ToHopCotDiemService> | null;
    displayedColumns: string[] = [ 'ten','ma','toHopCotDiem', 'kichHoat', 'xoa'];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    pageIndex: number = 0;
    pageSize: number = 10;
    hinhThucXetTuyens: HinhThucXetTuyen[]=[];
    hinhThucXetTuyenId: number = null;
    filterDetail: string = "";
    confirmDialogRef: MatDialogRef<DialogComponent>;
    getCotDiems(cotDiem_ToHopCotDiem: CotDiem_ToHopCotDiem[]){
        var result ='';
        cotDiem_ToHopCotDiem.forEach(element => {
            result+=`<b>${element.CotDiem.Ten}</b> - ${element.Loai}<br>`;
        });
        //console.log(result);
        return result;
    }
    // xoa
    btnXoaClicked(id: number): void {
        //alert(id);
        this.confirmDialogRef = this._matDialog.open(DialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.message = `Xác nhận xóa tổ hợp môn này?`;
        this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
        this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
        this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._toHopCotDiemService.delete(id).subscribe(
                    success => {
                        this.ngOnInit();
                        this._matSnackBar.open('Xóa thành công', 'OK', {
                            verticalPosition: 'top', horizontalPosition: 'right',
                            duration: 3000, panelClass: 'SuccessSnackbar'
                        });
                    },
                    error => {
                        //console.log("không xóa được " + id);
                        console.log(error);
                        this._matSnackBar.open('Xóa không thành công '+ error.error.Message, 'OK', {
                            verticalPosition: 'top', horizontalPosition: 'right',
                            duration: 3000, panelClass: 'ErrorSnackbar'
                        });
                    }
                );
            }
            this.confirmDialogRef = null;
        });
    }



    constructor(public _toHopCotDiemService: ToHopCotDiemService,
        public _hinhThucXetTuyenService: HinhThucXetTuyenService,
        public _activeR: ActivatedRoute,
        public _router: Router,
        public _matDialog: MatDialog,
        public _matSnackBar: MatSnackBar) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        //custom pinator
        this._hinhThucXetTuyenService.all().subscribe(data=>this.hinhThucXetTuyens=data);
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';

        this.dataSource = new FilesDataSource(this._toHopCotDiemService);

        let params = this._activeR.snapshot.queryParams;
        if (params["pageIndex"] != undefined) {
            this.pageIndex = (params["pageIndex"] - 1);
            this.pageSize = params["pageSize"];
            this.filter.nativeElement.value = params["textSearch"];
            this.dataSource.loadLessons(((this.hinhThucXetTuyenId==null)?'':`HinhThucXetTuyenId = ${this.hinhThucXetTuyenId}`), this.filter.nativeElement.value, 'Id', (this.pageIndex), this.pageSize);
        }
        else {
            this.dataSource.loadLessons(((this.hinhThucXetTuyenId==null)?'':`HinhThucXetTuyenId = ${this.hinhThucXetTuyenId}`),undefined,undefined,undefined,undefined);
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
        this.dataSource.loadLessons(((this.hinhThucXetTuyenId==null)?'':`HinhThucXetTuyenId = ${this.hinhThucXetTuyenId}`),
            this.filter.nativeElement.value, this.geColumnSort(),
            this.paginator.pageIndex, this.paginator.pageSize);
    }
    filterByHinhThucXetTuyen(){
        this.loadLessonsPage();
    }
}



@Component({
    selector: 'app-danh-sach-to-hop-cot-diem-list',
    templateUrl: './danh-sach-to-hop-cot-diem-list.component.html',
    styleUrls: ['./danh-sach-to-hop-cot-diem.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachToHopCotDiemListComponent implements OnInit {
    hinhThucXetTuyens:HinhThucXetTuyen[]=[];
    @Input() hinhThucXetTuyenId: number = null;
    displayedColumns: string[] = ['id', 'ten'];
    @Input() toHopCotDiems: any[] = [];
    @Input() nganhDaoTaoSelected: NganhDaoTao = new NganhDaoTao();
    @HostBinding('style.align-content') alignContent = 'left';
    danhSachCotDiem: any[] = [];
    @Output() onEmitChangeToHopCotDiem: EventEmitter<DotTuyenSinh> = new EventEmitter<DotTuyenSinh>();
    @Input() dotTuyenSinh: DotTuyenSinh;
    constructor(public _toHopCotDiemService: ToHopCotDiemService,
        public _hinhThucXetTuyenService: HinhThucXetTuyenService,
        public _matDialog: MatDialog
    ) { }
    
    ngOnInit(){
        debugger;
        this._hinhThucXetTuyenService.all().subscribe(data=>this.hinhThucXetTuyens=data);
    }

    openDialog() {
        const dialogRef = this._matDialog.open(DanhSachToHopCotDiemModalComponent, {
            width: '1000px',
            data: null
        });
        dialogRef.componentInstance.hinhThucXetTuyenId = this.hinhThucXetTuyenId;

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result != null)
                result.forEach(element => {
                    if (this.nganhDaoTaoSelected.DanhSachToHopCotDiem.findIndex(x => x.Id === element.Id) < 0)
                        this.nganhDaoTaoSelected.DanhSachToHopCotDiem.push(element);

                });

            this.onSelectNganhDaoTao();

            this.onChangeToHopCotDiem();
        });
    }

    onSelectNganhDaoTao() {
        this.dotTuyenSinh.DanhSachNganhDaoTao.forEach(nganhDaoTao => {
            if (nganhDaoTao.Id == this.nganhDaoTaoSelected.Id) {
                nganhDaoTao.DanhSachToHopCotDiem = this.nganhDaoTaoSelected.DanhSachToHopCotDiem;
            }
        })
    }


    onClickRemoveToHopCotDiem(toHopCotDiem: ToHopCotDiem) {

        this.nganhDaoTaoSelected.DanhSachToHopCotDiem.splice(this.nganhDaoTaoSelected.DanhSachToHopCotDiem.findIndex(x => x.Id === toHopCotDiem.Id), 1);

        this.onSelectNganhDaoTao();

        this.onChangeToHopCotDiem();
    }

    onChangeToHopCotDiem() {

        this.onEmitChangeToHopCotDiem.emit(this.dotTuyenSinh);

    }

    onClickToHopMon(toHopCotDiem: ToHopCotDiem){
        console.log(toHopCotDiem);
    }

}


@Component({
    selector: 'app-danh-sach-to-hop-cot-diem-modal',
    templateUrl: './danh-sach-to-hop-cot-diem-modal.component.html',
    styleUrls: ['./danh-sach-to-hop-cot-diem.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachToHopCotDiemModalComponent extends DanhSachToHopCotDiemComponent {
    displayedColumns: string[] = ['select', 'ten','toHopCotDiem', 'kichHoat', 'xoa'];
    selection = new SelectionModel<any>(true, []);
    pageSize=5;
    hinhThucXetTuyenId = null;
    
    constructor(public _toHopCotDiemService: ToHopCotDiemService,
        public _hinhThucXetTuyenService: HinhThucXetTuyenService,
        public _activeR: ActivatedRoute,
        public _router: Router,
        public _matDialog: MatDialog,
        public _matSnackBar: MatSnackBar,
        public _dialogRef: MatDialogRef<DanhSachToHopCotDiemModalComponent>

    ) {
        super(_toHopCotDiemService,_hinhThucXetTuyenService, _activeR, _router, _matDialog, _matSnackBar);
    }

    getCotDiems(cotDiem_ToHopCotDiem: CotDiem_ToHopCotDiem[]){
        var result ='';
        cotDiem_ToHopCotDiem.forEach(element => {
            result+=`<b>${element.CotDiem.Ten}</b> - ${element.Loai}<br>`;
        });
        //console.log(result);
        return result;
    }

    ngOnInit(): void {
        //custom pinator
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';

        this.dataSource = new FilesDataSource(this._toHopCotDiemService);

        let params = this._activeR.snapshot.queryParams;
        if (params["pageIndex"] != undefined) {
            this.pageIndex = (params["pageIndex"] - 1);
            this.pageSize = params["pageSize"];
            this.filter.nativeElement.value = params["textSearch"];
            this.dataSource.loadLessons(((this.hinhThucXetTuyenId==null)?'':`HinhThucXetTuyenId = ${this.hinhThucXetTuyenId}`), this.filter.nativeElement.value, 'Id', (this.pageIndex), this.pageSize);
        }
        else {
            this.dataSource.loadLessons(((this.hinhThucXetTuyenId==null)?'':`HinhThucXetTuyenId = ${this.hinhThucXetTuyenId}`),undefined,undefined,undefined,5);
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

    isAllSelected() {

        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.length;
        return numSelected === numRows;
    }


    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.lessonsSubject.value.forEach(row => this.selection.select(row));
    }


    onCloseClick() {

        this._dialogRef.close(this.selection.selected);

    }

    onOpenAddModal() {
        const dialogRef = this._matDialog.open(ChiTietToHopCotDiemModalComponent, {
            width: '1000px',
            data: null
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.ngOnInit();
        });
    }

    //search không bị nhảy param cho các modal
    loadLessonsPage() {
        this.dataSource.loadLessons(((this.hinhThucXetTuyenId==null)?'':`HinhThucXetTuyenId = ${this.hinhThucXetTuyenId}`),
            this.filter.nativeElement.value, this.geColumnSort(),
            this.paginator.pageIndex, this.paginator.pageSize);
    }
}