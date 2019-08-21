import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import {
    MatPaginator, MatSort,
    MatDialog,
    MatDialogRef,
    MatSnackBar
} from '@angular/material';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';
import { FilesDataSource } from 'app/main/apps/admission/resource.class';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { DotTuyenSinhService } from '../dot-tuyen-sinh.service';
import { Location } from '@angular/common';
import { DotTuyenSinh } from '../../Models/DotTuyenSinh.model';
import { HttpClient } from '@aspnet/signalr';
import { LoadingProcessesService } from 'app/layout/components/toolbar/loading-processes.service';
import { LoadingProcessObj } from 'app/layout/components/toolbar/loading-processes/loading-processes.component';

@Component({
    selector: 'app-base-danh-sach-dot-tuyen-sinh',
    template: '',
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class BaseDanhSachDotTuyenSinhComponent implements OnInit {
    _listItemSelected: any = new DotTuyenSinh();
    enviroment:string=environment.urlApi;
    dataSource: FilesDataSource<DotTuyenSinhService> | null;
    displayedColumns: string[] = ['ten', 'heDaoTaoId', 'hinhThucXetTuyenId', 'bacDaoTaoId', 'soLuongNguyenVong', 'hanDangKy', 'kichHoatDK','quanly'];
    filtershow: string ='';

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    confirmDialogRef: MatDialogRef<DialogComponent>;


    selectItemMenu(item){
        this._listItemSelected = item;
    }
    // xoa
    btnXoaClicked(id: number): void {
        //comf = new FuseConfirmDialogComponent();
        this.confirmDialogRef = this._matDialog.open(DialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.message = 'Có chắc chắn muốn xóa, xóa không thể phục hồi?';
        this.confirmDialogRef.componentInstance.title = 'Xóa đợt tuyển sinh';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._dotTuyenSinhService.delete(id).subscribe(
                    success => {
                        this.ngOnInit(); 
                        this._matSnackBar.open('Xóa thành công', 'OK', {
                            verticalPosition: 'top', horizontalPosition: 'right',
                            duration: 2000, panelClass: 'SuccessSnackbar'
                        });
                        console.log('xóa thành công ' + id);
                    },
                    error => {
                        this._matSnackBar.open('Không xóa được', 'OK', {
                            verticalPosition: 'top', horizontalPosition: 'right',
                            duration: 2000, panelClass: 'ErrorSnackbar'
                        });
                        console.log("không xóa được " + id);
                    }
                );
            }
            this.confirmDialogRef = null;
        });
    }

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(public _dotTuyenSinhService: DotTuyenSinhService, 
        public _loadprocessService: LoadingProcessesService,
        private _matDialog: MatDialog,
        public _matSnackBar: MatSnackBar,
        private _location: Location) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        //custom pinator
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';
        this.dataSource = new FilesDataSource(this._dotTuyenSinhService);
        this.dataSource.loadLessons(this.filtershow,undefined,'Id desc');


        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 10;
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
    getColumnSort(): string {
        let sort = 'Id desc'; //if sort is undefined , It will set defaut parameter.
        if (this.sort.active && this.sort.direction)
            sort = `${this.sort.active} ${this.sort.direction}`;
        return sort;
    }

    loadLessonsPage() {
        this.dataSource.loadLessons(this.filtershow,
            this.filter.nativeElement.value, this.getColumnSort(),
            this.paginator.pageIndex, this.paginator.pageSize);
    }
}

@Component({
    selector: 'app-danh-sach-dot-tuyen-sinh',
    templateUrl: './danh-sach-dot-tuyen-sinh.component.html',
    styleUrls: ['./danh-sach-dot-tuyen-sinh.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachDotTuyenSinhComponent extends BaseDanhSachDotTuyenSinhComponent {

    btnCapNhatDanhSachDau(DotTuyenSinhId: number){
        //alert(DotTuyenSinhId);
       this._dotTuyenSinhService.RefreshAdmissionResult(DotTuyenSinhId).subscribe(
           result=>
           {
                //thông báo thành công
                if(result)
                {
                    this._matSnackBar.open('Cập nhật kết quả xét tuyển thành công', 'OK', {
                        verticalPosition: 'top', horizontalPosition: 'right', panelClass: 'SuccessSnackbar',
                        duration: 2000
                    });
                    
                }
                else
                {
                    this._matSnackBar.open('Cập nhật kết quả xét tuyển không thành công', 'OK', {
                        verticalPosition: 'top', horizontalPosition: 'right', panelClass: 'ErrorSnackbar',
                        duration: 2000
                    });
                }
            },
            error => {
                this._matSnackBar.open(error.error.Message, 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right', panelClass: 'ErrorSnackbar',
                    duration: 2000
                });
            }
       );
    }
}

@Component({
    selector: 'app-danh-sach-dot-tuyen-sinh-show',
    templateUrl: './danh-sach-dot-tuyen-sinh-show.component.html',
    styleUrls: ['./danh-sach-dot-tuyen-sinh.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachDotTuyenSinhShowComponent extends BaseDanhSachDotTuyenSinhComponent implements OnInit {
    displayedColumns: string[] = ['ten', 'ngayBatDau', 'ngayKetThuc', 'dangKy'];
    filtershow = "KichHoatDK=1";

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    ngOnInit(): void {
        //custom pinator
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';
        this.dataSource = new FilesDataSource(this._dotTuyenSinhService);
        this.dataSource.loadLessons(this.filtershow,undefined,'ThuTuHienThi asc');

        if(this.filter != undefined)
        {
            fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 10;
                    this.loadLessonsPage();
                })
            )
            .subscribe();
        }
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
    ComparseCurrentDate(date:Date)
    {
        console.log(date);
        if(date <= new Date())
        return true;
        else
        return false;
    }
}

@Component({
    selector: 'app-danh-sach-dot-tuyen-sinh-quan-ly',
    templateUrl: './danh-sach-dot-tuyen-sinh-quan-ly.component.html',
    styleUrls: ['./danh-sach-dot-tuyen-sinh.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachDotTuyenSinhQuanLyComponent extends DanhSachDotTuyenSinhComponent {
    
    displayedColumns: string[] = ['ten', 'heDaoTaoId', 'hinhThucXetTuyenId', 'hanDangKy', 'quanli'];
    filtershow:string = "KichHoatDK = 'true'";
    btnCapNhatDanhSachDau(DotTuyenSinhId: number){
        //alert(DotTuyenSinhId);
       this._dotTuyenSinhService.RefreshAdmissionResult(DotTuyenSinhId).subscribe(
           result=>
           {
                //thông báo thành công
                if(result)
                {
                    this._matSnackBar.open('Cập nhật kết quả xét tuyển thành công', 'OK', {
                        verticalPosition: 'top', horizontalPosition: 'right', panelClass: 'SuccessSnackbar',
                        duration: 2000
                    });
                    
                }
                else
                {
                    this._matSnackBar.open('Cập nhật kết quả xét tuyển không thành công', 'OK', {
                        verticalPosition: 'top', horizontalPosition: 'right', panelClass: 'ErrorSnackbar',
                        duration: 2000
                    });
                }
            },
            error => {
                this._matSnackBar.open(error.error.Message, 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right', panelClass: 'ErrorSnackbar',
                    duration: 2000
                });
            }
       );
    }
    xuatnguyenvong (DotTuyenSinhId: number){
        //href="{{enviroment}}/hosoxettuyens/exportexceltheonguyenvong/{{_listItemSelected.Id}}"
        

        this._loadprocessService.addProcess(new LoadingProcessObj({processId: 0,processName: "down"+DotTuyenSinhId,completedValue: 11,DotTuyenSinhId: DotTuyenSinhId}));

    }
}

