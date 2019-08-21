import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FilesDataSource } from '../../resource.class';
import { NguyenVongService } from '../nguyen-vong.service';
import { MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { debounceTime, distinctUntilChanged, tap, delay } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { SelectionModel } from '@angular/cdk/collections';
import { HoSoXetTuyen } from '../../Models/HoSoXetTuyen.model';
import { DongBoUISDialogComponent } from './dong-bo-uisdialog/dong-bo-uisdialog.component';



@Component({
  selector: 'danh-sach-nguyen-vong',
  templateUrl: './danh-sach-nguyen-vong.component.html',
  styleUrls: ['./danh-sach-nguyen-vong.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DanhSachNguyenVongComponent implements OnInit {
  dataSource: FilesDataSource<NguyenVongService> | null;
  displayedColumns: string[] = ['select', 'MaHoSo', 'ThiSinh', 'NguyenVong', 'Diem', 'UISDongBo', 'InHoSo', 'xoa'];
  filtershow: string = '';
  DongBoQuery: string = undefined;
  serviceUrl: string = environment.urlApi;
  selection = new SelectionModel<any>(true, []);
  i = 0;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;

  pageIndex: number = 0;
  pageSize: number = 10;
  checkNganhDaoTao: boolean = null;
  checkDoiTuongUuTien: boolean = null;
  checkKhuVucUuTien: boolean = null;
  dongBoUISLoading: boolean = false;
  confirmDialogRef: MatDialogRef<DialogComponent>;
  dongBoUISDialogRef: MatDialogRef<DongBoUISDialogComponent>;

  constructor(public _danhSachNguyenVongService: NguyenVongService,
    public _matDialog: MatDialog,
    public _matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataSource = new FilesDataSource(this._danhSachNguyenVongService);
    this.dataSource.loadLessons(this.filtershow);

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
    this.dataSource.loadLessons(
      this.filtershow + ((this.filtershow != '' && this.DongBoQuery != undefined ? ' and ' : '')) + ((this.DongBoQuery != undefined) ? 'UISDongBo ' + (this.DongBoQuery != 'null' ? ' = ' : ' is ') + this.DongBoQuery : '')
      , this.filter.nativeElement.value, this.geColumnSort()
      , this.paginator.pageIndex, this.paginator.pageSize);
  }
  /**
   * Return undefined or <colunmName> asc|desc
   */
  geColumnSort(): string {
    let sort = undefined; // if sort is undefined , It will set defaut parameter.
    if (this.sort.active && this.sort.direction)
      sort = `${this.sort.active} ${this.sort.direction}`;
    return sort;
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
  // parsetoString(diems:string):string{
  //   var s:string = "";
  //   var aa = JsonPipe.fromJson(diems);
  //   console.log(aa);
  //   .forEach(element => {
  //     s+=element.Ten;
  //   });
  //   return s;
  // }

  btnXoaClicked(id: number): void {
    //alert(id);
    this.confirmDialogRef = this._matDialog.open(DialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.message = `Xác nhận xóa nguyện vọng này?`;
    this.confirmDialogRef.componentInstance.title = 'Xác nhận xóa';
    this.confirmDialogRef.componentInstance.btnOK = 'Xóa';
    this.confirmDialogRef.componentInstance.btnCancel = 'Hủy';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._danhSachNguyenVongService.delete(id).subscribe(
          success => {
            this.ngOnInit();
            this._matSnackBar.open('Xóa thành công', 'OK', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 2000, panelClass: 'SuccessSnackbar'
            });
          },
          error => {
            //console.log("không xóa được " + id);
            this._matSnackBar.open('Không xóa được', 'OK', {
              verticalPosition: 'top', horizontalPosition: 'right',
              duration: 2000, panelClass: 'ErrorSnackbar'
            });
          }
        );
      }
      this.confirmDialogRef = null;
    });
  }

  convertObject(jsonstring: string) {
    //console.log((this.i++)+'a: '+jsonstring);
    var diems = '';
    var objectDiem = JSON.parse(jsonstring);
    //console.log(jsonstring);
    objectDiem.forEach(element => {
      // diems+= element.Ten  +' : ' + element.Diem + ' ' + (element.GhiChu || 'không') + ' ( '+ (element.Loai || 'không') +' ) ' + '<br>';
      diems += `${element.Ten} : ${element.Diem} - ${element.GhiChu || ''} (${element.Loai || 'không'}) - (${element.LoaiHinhThuc == 'duthi' ? 'Dự thi' : 'Xét tuyển'}) ${'<br>'}`; // element.Ten  +' : ' + element.Diem + ' ' + (element.GhiChu || 'không') + ' ( '+ (element.Loai || 'không') +' ) ' + '<br>';
    });
    //console.log(diems);
    return diems;
  }
  DongBoQuerySelectedChange(event: any) {
    //alert(this.DongBoQuery);
    // alert(this.DongBoQuery != null? ' = ':' is ');
    this.loadLessonsPage();
  }

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
  UISDongBoClicked() {
    if (this.dongBoUISLoading == false) {
      // chưa đồng bộ
      if (this.selection.selected.length == 0) {
        this._matSnackBar.open('Chọn nguyện vọng để đồng bộ', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
        return;
      }
      let queryPage: string = this.filtershow + ((this.filtershow != '' && this.DongBoQuery != undefined ? ' and ' : '')) + ((this.DongBoQuery != undefined) ? 'UISDongBo ' + (this.DongBoQuery != 'null' ? ' = ' : ' is ') + this.DongBoQuery : '');
      //alert(queryPage);
      let selectedIdArr: number[] = [];
      this.selection.selected.forEach(
        element => {
          selectedIdArr.push(element.NguyenVongId);
        }
      )

      this.UISDialogOpen();

      this.dongBoUISLoading = true;
      ////begin  dong bo
      this.CheckDongBoUISProcess(queryPage, selectedIdArr);
      //end  dong bo

      // gán trạng thái là đang đồng bộ


    }
    else {
      this.UISDialogOpen();
    }

  }
  async CheckDongBoUISProcess(queryPage, NguyenVongIdList) {
    let res = await Promise.all(
      [this.CheckNganhDaoTao()
        , this.CheckDoiTuongUuTien()
        , this.CheckKhuVucUuTien()
      ]);
    await this.DongBoUIS();
  }
  CheckNganhDaoTao() {
    // kiểm xong thì gán giá trị cho biến CheckNganhDaoTao ở component và dialog
  }
  CheckDoiTuongUuTien() {
    // kiểm xong thì gán giá trị cho biến checkDoiTuongUuTien ở component và dialog
  }
  CheckKhuVucUuTien() {
    // kiểm xong thì gán giá trị cho biến checkKhuVucUuTien ở component và dialog
  }
  DongBoUIS() {

    // đòng bộ xong reset giá trị về ban đầu

    this.dongBoUISLoading = false;
    this.dongBoUISDialogRef.afterClosed().subscribe(x => {
      if (this.dongBoUISLoading == false) // nếu đồng bộ chạy xong thì reset sau khi đóng dialog
      {
        this.dongBoUISDialogRef = null;
        this.checkDoiTuongUuTien = null;
        this.checkKhuVucUuTien = null;
        this.CheckNganhDaoTao = null;
        alert('đã reset');
      }
    });

  }
  UISDialogOpen() {
    this.dongBoUISDialogRef = this._matDialog.open(DongBoUISDialogComponent, {
      disableClose: false
    });

    this.dongBoUISDialogRef.componentInstance.checkNganhDaoTao = this.checkNganhDaoTao;
    this.dongBoUISDialogRef.componentInstance.checkKhuVucUuTien = this.checkKhuVucUuTien;
    this.dongBoUISDialogRef.componentInstance.checkDoiTuongUuTien = this.checkKhuVucUuTien;


  }
  UISDongBoAllClicked() {
    let queryPage: string = this.filtershow + ((this.filtershow != '' && this.DongBoQuery != undefined ? ' and ' : '')) + ((this.DongBoQuery != undefined) ? 'UISDongBo ' + (this.DongBoQuery != 'null' ? ' = ' : ' is ') + this.DongBoQuery : '');
    alert(queryPage);
    console.log(new Array());

  }
  PanigatorChange() {
    this.selection.clear();
  }
}


@Component({
  selector: 'danh-sach-nguyen-vong-theo-dot',
  templateUrl: './danh-sach-nguyen-vong.component.html',
  styleUrls: ['./danh-sach-nguyen-vong.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DanhSachNguyenVongTheoDotComponent extends DanhSachNguyenVongComponent {
  //filtershow: string = '';ISDongBo
  _dotTuyenSinhIdRouter: any;
  constructor(public _danhSachNguyenVongService: NguyenVongService,
    public _matDialog: MatDialog,
    public _matSnackBar: MatSnackBar, public activatedRoute: ActivatedRoute) {
    super(_danhSachNguyenVongService, _matDialog, _matSnackBar);
    this._dotTuyenSinhIdRouter = this.activatedRoute.snapshot.paramMap.get('dottuyensinhid');
    this.filtershow = 'DotTuyenSinhId = ' + this._dotTuyenSinhIdRouter;
    console.log(this._dotTuyenSinhIdRouter);
  }

}