
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    MatPaginator, MatSort,
    MatDialog,
    MatDialogRef,
    MatSnackBar
} from '@angular/material';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { HoSoXetTuyenService, HoSoXetTuyenThiSinhService } from 'app/main/apps/admission/ho-so-xet-tuyen/ho-so-xet-tuyen.service';
import { ActivatedRoute } from '@angular/router';
import { FilesDataSource } from 'app/main/apps/admission/resource.class';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { HinhThucXetTuyenService } from '../../hinh-thuc-xet-tuyen/hinh-thuc-xet-tuyen.service';
import { XemThongBaoComponent } from '../../dot-tuyen-sinh/xem-thong-bao/xem-thong-bao.component';
import { HoSoXetTuyen } from '../../Models/HoSoXetTuyen.model';


@Component({
    selector: 'app-base-danh-sach-ho-so-xet-tuyen',
    template: '',
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class BaseDanhSachHoSoXetTuyenComponent implements OnInit {
    _listItemSelected: any = new HoSoXetTuyen();
    public dataSource: FilesDataSource<HoSoXetTuyenService> | null;
    displayedColumns: string[] = ['id', 'ten', 'kichHoat', 'ngayTao', 'xoa'];
    filter: string;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('textSearch')
    textSearch: ElementRef;
    animal: string;
    name: string;

    confirmDialogRef: MatDialogRef<DialogComponent>;

    selectItemMenu(item){
        this._listItemSelected = item;
    }
    btnXoaClicked(id: number): void {
        //comf = new FuseConfirmDialogComponent();
        this.confirmDialogRef = this._matDialog.open(DialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.message = 'Có chắc chắn muốn xóa?';
        this.confirmDialogRef.componentInstance.title = 'Xóa hồ sơ xét tuyển';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._hoSoXetTuyenService.delete(id).subscribe(
                    success => {
                        this.ngOnInit();
                        console.log('xóa thành công ' + id);
                    },
                    error => {
                        console.log("không xóa được " + id);
                    }
                );
            }
            this.confirmDialogRef = null;
        });
    }

    // Private


    constructor(public _hoSoXetTuyenService: HoSoXetTuyenService, public _matDialog: MatDialog) {
    }

    /**
     * On init
     */
    ngOnInit(): void {
        //custom pinator
        this.paginator._intl.itemsPerPageLabel = 'Số dòng';

        this.dataSource = new FilesDataSource(this._hoSoXetTuyenService);

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
            '', this.geColumnSort(),
            this.paginator.pageIndex, this.paginator.pageSize);
    }
}


@Component({
    selector: 'app-danh-sach-ho-so-xet-tuyen',
    templateUrl: './danh-sach-ho-so-xet-tuyen.component.html',
    styleUrls: ['./danh-sach-ho-so-xet-tuyen.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachHoSoXetTuyenComponent extends BaseDanhSachHoSoXetTuyenComponent {

}


@Component({
    selector: 'app-danh-sach-ho-so-xet-tuyen',
    templateUrl: './danh-sach-ho-so-xet-tuyen-thi-sinh.component.html',
    styleUrls: ['./danh-sach-ho-so-xet-tuyen.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachHoSoXetTuyenThiSinhComponent extends BaseDanhSachHoSoXetTuyenComponent {
    displayedColumns: string[] = ['id', 'ten', 'kichHoat', 'ngayTao'];
    filter = "";
}


@Component({
    selector: 'app-danh-sach-ho-so-xet-tuyen-theo-dot',
    templateUrl: './danh-sach-ho-so-xet-tuyen-theo-dot.component.html',
    styleUrls: ['./danh-sach-ho-so-xet-tuyen.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachHoSoXetTuyenTheoDotComponent extends BaseDanhSachHoSoXetTuyenComponent implements OnInit {

    displayedColumns: string[] = ['hoten', 'NVJson' , 'email', 'quanli'];

    _dotTuyenSinhIdRouter: any;
    _hinhThucXetTuyenIdRouter: any;
    loadLessonsPage() {

        let search:string="";
        if(this.textSearch.nativeElement.value != '')
        {
            search = ` AND`;
            search += ` (`;
            search += `    MaHoSo like CONCAT('%','${this.textSearch.nativeElement.value}','%')`
            search += `    OR ts.Ten like CONCAT('%','${this.textSearch.nativeElement.value}','%')`
            search += `    OR ts.CMND like CONCAT('%','${this.textSearch.nativeElement.value}','%')`
            search += `    OR ts.Email like CONCAT('%','${this.textSearch.nativeElement.value}','%')`
            search += `    OR ts.SDT like CONCAT('%','${this.textSearch.nativeElement.value}','%')`
            search += ` )`;
        }
        // else
        // {
            
        // }
        //  debugger;

        this.dataSource.loadLessons(this.filter + search,
            '', this.geColumnSort(),
            this.paginator.pageIndex, this.paginator.pageSize);
            console.log(this.dataSource.lessonsSubject.value);
    };
    constructor(public _hoSoXetTuyenService: HoSoXetTuyenService
        , public _matDialog: MatDialog
        , public activatedRoute: ActivatedRoute,
        public _matSnackBar: MatSnackBar) {
        super(_hoSoXetTuyenService, _matDialog);
        this._dotTuyenSinhIdRouter = this.activatedRoute.snapshot.paramMap.get('dottuyensinhid');
        this._hinhThucXetTuyenIdRouter = this.activatedRoute.snapshot.paramMap.get('hinhthucxettuyenid');
        this.filter = 'DotTuyenSinhId = ' + this._dotTuyenSinhIdRouter;
        console.log(this._dotTuyenSinhIdRouter);

    }

    ChangeLockHoSo(HoSoXetTuyenId: number){
       // alert(HoSoXetTuyenId);
        this._hoSoXetTuyenService.khoaHoSo(HoSoXetTuyenId).subscribe(x => {
                        
            this._matSnackBar.open(x.KichHoat == true?'Khóa hồ sơ thành công.':'Hủy khóa hồ sơ thành công', 'Thành công', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 4000, panelClass: 'SuccessSnackbar'
            });
          }, error => {
            console.log(error);
            this._matSnackBar.open(error.message, 'Lỗi', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 4000, panelClass: 'ErrorSnackbar'
            });
          })
    }
    parseNguyenVongJSon(NVJSon:string):string{
        //console.log(NVJSon);
        let DanhSachNguyenVong: any;
        let NguyenVongString = '';
        if(NVJSon != undefined && NVJSon != null)
        {
            DanhSachNguyenVong = JSON.parse(NVJSon);
            if(DanhSachNguyenVong != null)
            {
                DanhSachNguyenVong.forEach(nv => {
                    NguyenVongString+=nv.ThuTuNguyenVong+' - '+nv.NganhDaoTao.Ten +'<br>';
                    nv.CotDiems.forEach(cotDiem => {
                        NguyenVongString += '<span>' + cotDiem.Ten+": "+ cotDiem.Diem + " - </span>";
                    });
                    NguyenVongString+="<br>"
                });
            }
        }
         
        //console.log(NguyenVongString);
        
        return NguyenVongString;
    }
}
@Component({
    selector: 'app-danh-sach-ho-so-xet-tuyen-sinh-vien-show',
    templateUrl: './danh-sach-ho-so-xet-tuyen-sinh-vien-show.component.html',
    styleUrls: ['./danh-sach-ho-so-xet-tuyen.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DanhSachHoSoXetTuyenSinhVienShowComponent extends BaseDanhSachHoSoXetTuyenComponent implements OnInit {
    displayedColumns: string[] = ['hoSoId', 'hinhThucXetTuyen', 'danhSachNguyenVong', 'xemThongBao', 'sua'];

    dataSource: FilesDataSource<HoSoXetTuyenThiSinhService> | null;
    _thiSinhIdRouter: any;
    _hinhThucXetTuyenIdRouter: any;
    constructor(public _hoSoXetTuyenThiSinhService: HoSoXetTuyenThiSinhService
        , public _matDialog: MatDialog
        , public activatedRoute: ActivatedRoute
    ) {
        super(_hoSoXetTuyenThiSinhService, _matDialog);
        this._thiSinhIdRouter = this.activatedRoute.snapshot.paramMap.get('thiSinhId');
        this.filter = 'ThiSinhId = ' + this._thiSinhIdRouter;

    }

    btnXemTBClicked(dotTuyenSinhId,hoSoXetTuyen?) {
        //alert(dotTuyenSinhId);
        const XemTBDialogRef = this._matDialog.open(XemThongBaoComponent, {
            disableClose: false
        });
        XemTBDialogRef.componentInstance.dotTuyenSinh.Id = dotTuyenSinhId;
        XemTBDialogRef.componentInstance.thiSinh.Id = this._thiSinhIdRouter;
        XemTBDialogRef.componentInstance.hoSoXetTuyen = hoSoXetTuyen;
        XemTBDialogRef.afterClosed().subscribe(result => {
        });
    }
    convertObject(nguyenvongs: any) {
        //console.log((this.i++)+'a: '+jsonstring);
        var diems = '';
        //var objectDiem = JSON.parse(jsonstring);
        nguyenvongs.forEach(element => {
            var objectDiem = JSON.parse(element.Diem);
            diems += `<b>Nguyện Vọng ${element.ThuTuNguyenVong}:</b>&nbsp&nbsp&nbsp${element.NganhDaoTao.MaTen}`;
            //diems += `<b>Nguyện Vọng ${element.ThuTuNguyenVong}:</b> `;
            // objectDiem.forEach(element => {
            //     // diems+= element.Ten  +' : ' + element.Diem + ' ' + (element.GhiChu || 'không') + ' ( '+ (element.Loai || 'không') +' ) ' + '<br>';
            //     diems += `&nbsp-&nbsp&nbsp<b>[${element.NganhDaoTao} (${element.LoaiHinhThuc == 'duthi' ? 'Dự thi' : 'Xét tuyển'}) : ${element.Diem}<b>]</b>     `; // element.Ten  +' : ' + element.Diem + ' ' + (element.GhiChu || 'không') + ' ( '+ (element.Loai || 'không') +' ) ' + '<br>';
            // });
            diems += '<br>';
        });
        //console.log(jsonstring);

        //console.log(diems);
        return diems;
    }
}