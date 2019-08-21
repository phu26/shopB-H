import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatRadioChange } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../date.adapter';
import { DataSource } from '@angular/cdk/table';
import { Observable, of, Subject } from 'rxjs';
import { BaseFormXetTuyenComponent, RequireMatch, ConfirmDangKyComponent } from '../form-xet-tuyen.component';
import { ChungChi } from '../../../Models/ChungChi.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuanHuyen } from '../../../Models/QuanHuyen.model';
import { TruongTHPT } from '../../../Models/TruongTHPT.model';
import { startWith, debounceTime, filter, switchMap, exhaustMap, tap, takeWhile, scan } from 'rxjs/operators';
import { HoSoXetTuyen } from '../../../Models/HoSoXetTuyen.model';
import { NguyenVong } from '../../../Models/NguyenVong.model';
import { NganhDaoTao } from '../../../Models/NganhDaoTao.model';


/* #region LAW Xét tuyển đại học chính quy ========================= */



const ELEMENT_DATA: any[] = [
  // {Diem: 1,   Ten: 'Toán HK1 10', Loai: 'Toan_HK1_10', symbol: 'H'},
  // {Diem: 2,   Ten: 'Toán HK2 10', Loai: 'Toan_HK2_10', symbol: 'He'},
  // {Diem: 3,   Ten: 'Toán HK1 11', Loai: 'Toan_HK1_11', symbol: 'Li'},
  // {Diem: 4,   Ten: 'Toán HK2 11', Loai: 'Toan_HK2_11', symbol: 'Be'},
  // {Diem: 5,   Ten: 'Toán HK1 12', Loai: 'Toan_HK1_12', symbol: 'B'},
  // {Diem: 6,   Ten: 'Toán HK2 12', Loai: 'Toan_HK2_12', symbol: 'C'},
  // {Diem: 7,   Ten: 'Toán THPTQG', Loai: 'Toan_THPTQG', symbol: 'N'}

  { Ten: 'Lý', HK1_10: 'Ly_HK1_10', HK2_10: 'Ly_HK2_10', HK1_11: 'Ly_HK2_10', HK2_11: 'Ly_HK2_10', HK1_12: 'Ly_HK2_10', HK2_12: 'Ly_HK2_10', THPTQG: 'Ly_HK2_10' },
  { Ten: 'Toán', HK1_10: 'Toan_HK1_10', HK2_10: 1, HK1_11: 1, HK2_11: 1, HK1_12: 1, HK2_12: 1, THPTQG: 1 },
  { Ten: 'Hóa', HK1_10: 'Hoa_HK1_10', HK2_10: 3, HK1_11: 3, HK2_11: 3, HK1_12: 3, HK2_12: 3, THPTQG: 3 },

  // {Diem: 4,   Ten: 'Toán HK2 11', Loai: 'Toan_HK2_11', symbol: 'Be'},
  // {Diem: 5,   Ten: 'Toán HK1 12', Loai: 'Toan_HK1_12', symbol: 'B'},
  // {Diem: 6,   Ten: 'Toán HK2 12', Loai: 'Toan_HK2_12', symbol: 'C'},
  // {Diem: 7,   Ten: 'Toán THPTQG', Loai: 'Toan_THPTQG', symbol: 'N'}

  // {Toan_HK1_10: 7, Toan_HK2_10:2, Toan_HK1_11:12, Toan_HK2_11:12, Toan_HK1_12:12,  Toan_HK2_12:12,Toan_THPTQG:12,  Ten: 'Toán'},
  // {Ly_HK1_10: 7, Ly_HK2_10:2, Ly_HK1_11:12, Ly_HK2_11:12, Ly_HK1_12:12,  Ly_HK2_12:12,Ly_THPTQG:12,  Ten: 'Lý'},
  // {Hóa_HK1_10: 7, Hóa_HK2_10:2, Hóa_HK1_11:12, Hóa_HK2_11:12, Hóa_HK1_12:12,  Hóa_HK2_12:12,Hóa_THPTQG:12,  Ten: 'Hóa'},

];

export interface PassengerDetails {
  Gender: string;
  Name: string;
  Age: string;
  SeatNo: string;
}


export class ExampleDataSource extends DataSource<any> {

  connect(): Observable<Element[]> {
    return of(ELEMENT_DATA);
  }

  disconnect() { }
}

@Component({
  selector: 'app-law',
  templateUrl: './law.component.html',
  styleUrls: ['../form-xet-tuyen.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [
    //{provide: ValidatorService, useClass: PersonValidatorService },
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    { provide: MAT_DATE_LOCALE, useValue: 'vi' },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})

export class LawComponent extends BaseFormXetTuyenComponent {

  // favoriteSeason: string='Winter'
  // seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  chungChis: ChungChi[] = [
    { Ma: 'IELTS', Ten: "IELTS", DonViCap: '', NgayCap: '', DaThi: true, Diem: 0, MaSoBang: '', SoHieuBang: '', LoaiChungChi: '' }
    , { Ma: 'TOEFLiBT', Ten: "TOEFL iBT", DonViCap: '', NgayCap: '', DaThi: true, Diem: 0, MaSoBang: '', SoHieuBang: '', LoaiChungChi: '' }
    , { Ma: 'SAT', Ten: "isCheckSAT", DonViCap: '', NgayCap: '', DaThi: false, Diem: 0, MaSoBang: '', SoHieuBang: '', LoaiChungChi: '' }
    , { Ma: 'TCF', Ten: "TCF", DonViCap: '', NgayCap: '', DaThi: false, Diem: 0, MaSoBang: '', SoHieuBang: '', LoaiChungChi: '' }
    , { Ma: 'DELF', Ten: "DELF", DonViCap: '', NgayCap: '', DaThi: false, Diem: 0, MaSoBang: '', SoHieuBang: '', LoaiChungChi: '' }
    , { Ma: 'JLPT', Ten: "JLPT", DonViCap: '', NgayCap: '', DaThi: false, Diem: 0, MaSoBang: '', SoHieuBang: '', LoaiChungChi: '' }
    , { Ma: 'KHONGCO', Ten: "KHÔNG CÓ", DonViCap: '', NgayCap: '', DaThi: false, Diem: 0, MaSoBang: '', SoHieuBang: '', LoaiChungChi: '' }];

  chungChi: 'IELTS';


  displayedColumns = ['Ten', 'HK1_10', 'HK2_10', 'HK1_11', 'HK2_11', 'HK1_12', 'HK2_12', 'THPTQG'];//this.columns.map(c => c.columnDef);

  chungChiSelected: string = null;
  chungChiIsNhapDiem: boolean;

  formDangKy: FormGroup;


  txtQuanHuyen = new FormControl();
  txtPhuongXa = new FormControl();



  quanHuyens$: Observable<QuanHuyen[]>;
  phuongXas$: Observable<QuanHuyen[]>;




  // autoCompleteNextPage$ = new Subject();
  // _autoCompleteOnDestroy = new Subject();
  autoCompleteNextPage$ = new Subject<number>();
  _autoCompleteOnDestroy = new Subject();



  txtTinhThanhThuongTru = new FormControl();
  tinhThanhThuongTrus$: Observable<QuanHuyen[]>;
  tinhThanhThuongTruNextPage$ = new Subject();

  txtTinhThanhTamTru = new FormControl(); //{ Id: 2, Ten: 'ana' }
  tinhThanhTamTrus$: Observable<QuanHuyen[]>;
  tinhThanhTamTruNextPage$ = new Subject();

  txtTinhThanhHocLop10 = new FormControl();
  tinhThanhHocLop10s$: Observable<QuanHuyen[]>;
  tinhThanhOnHocLop10OnDestroy = new Subject();
  tinhThanhHocLop10NextPage$ = new Subject<QuanHuyen>();


  txtTinhThanhHocLop11 = new FormControl();
  tinhThanhHocLop11s$: Observable<QuanHuyen[]>;
  tinhThanhHocLop11NextPage$ = new Subject<QuanHuyen>();


  txtTinhThanhHocLop12 = new FormControl();
  tinhThanhHocLop12s$: Observable<QuanHuyen[]>;
  tinhThanhHocLop12NextPage$ = new Subject<QuanHuyen>();


  txtQuanHuyenThuongTru = new FormControl(); //{ Id: 2, Ten: 'ana' }
  quanHuyenThuongTrus$: Observable<QuanHuyen[]>;
  quanHuyenThuongTruNextPage$ = new Subject();

  txtQuanHuyenTamTru = new FormControl(); //{ Id: 2, Ten: 'ana' }
  quanHuyenTamTrus$: Observable<QuanHuyen[]>;
  quanHuyenTamTruNextPage$ = new Subject();


  txtPhuongXaThuongTru = new FormControl(); //{ Id: 2, Ten: 'ana' }
  phuongXaThuongTrus$: Observable<QuanHuyen[]>;
  phuongXaThuongTruNextPage$ = new Subject();

  txtPhuongXaTamTru = new FormControl(); //{ Id: 2, Ten: 'ana' }
  phuongXaTamTrus$: Observable<QuanHuyen[]>;
  phuongXaTamTruNextPage$ = new Subject();


  txtQuanHuyenHocLop10 = new FormControl();
  quanHuyenHocLop10s$: Observable<QuanHuyen[]>;
  quanHuyenHocLop10NextPage$ = new Subject<QuanHuyen>();


  txtQuanHuyenHocLop11 = new FormControl();
  quanHuyenHocLop11s$: Observable<QuanHuyen[]>;
  quanHuyenHocLop11NextPage$ = new Subject<QuanHuyen>();


  txtQuanHuyenHocLop12 = new FormControl();
  quanHuyenHocLop12s$: Observable<QuanHuyen[]>;
  quanHuyenHocLop12NextPage$ = new Subject<QuanHuyen>();




  tinhThanhHocLop10Subject$ = new Subject<QuanHuyen>();


  truongHocLop10NextPage$ = new Subject();
  txtTruongHocLop10 = new FormControl();
  truongHocLop10s$: Observable<TruongTHPT[]>;

  truongHocLop11NextPage$ = new Subject();
  txtTruongHocLop11 = new FormControl();
  truongHocLop11s$: Observable<TruongTHPT[]>;


  truongHocLop12NextPage$ = new Subject();
  txtTruongHocLop12 = new FormControl();
  truongHocLop12s$: Observable<TruongTHPT[]>;




  //private nextPage$ = new Subject();
  private _onDestroy = new Subject();





  async ngOnInit() {


    debugger;
    this.formDangKy = new FormGroup(
      {
        txtTinhThanhThuongTru: new FormControl('', [Validators.required, RequireMatch]),
        txtQuanHuyenThuongTru: new FormControl('', [Validators.required, RequireMatch]),
        txtPhuongXaThuongTru: new FormControl('', [Validators.required, RequireMatch]),

        txtTinhThanhTamTru: new FormControl('', [Validators.required, RequireMatch]),
        txtQuanHuyenTamTru: new FormControl('', [Validators.required, RequireMatch]),
        txtPhuongXaTamTru: new FormControl('', [Validators.required, RequireMatch]),

        txtTinhThanhHocLop10: new FormControl('', [Validators.required, RequireMatch]),
        txtQuanHuyenHocLop10: new FormControl('', [Validators.required, RequireMatch]),
        txtTruongHocLop10: new FormControl('', [Validators.required, RequireMatch]),

        txtTinhThanhHocLop11: new FormControl('', [Validators.required, RequireMatch]),
        txtQuanHuyenHocLop11: new FormControl('', [Validators.required, RequireMatch]),
        txtTruongHocLop11: new FormControl('', [Validators.required, RequireMatch]),

        txtTinhThanhHocLop12: new FormControl('', [Validators.required, RequireMatch]),
        txtQuanHuyenHocLop12: new FormControl('', [Validators.required, RequireMatch]),
        txtTruongHocLop12: new FormControl('', [Validators.required, RequireMatch]),

        //  serviceInfos: this._formBuilder.array(ELEMENT_DATA),


      }
    );

    // this.formDangKy = this._formBuilder.group({
    //   txtTinhThanhThuongTru: ['',Validators.required],
    //   txtQuanHuyenThuongTru: new FormControl('', [Validators.required, RequireMatch]),
    //   txtPhuongXaThuongTru: new FormControl('', [Validators.required, RequireMatch]),

    //   txtTinhThanhTamTru: new FormControl('', [Validators.required, RequireMatch]),
    //   txtQuanHuyenTamTru: new FormControl('', [Validators.required, RequireMatch]),
    //   txtPhuongXaTamTru: new FormControl('', [Validators.required, RequireMatch]),

    //   txtTinhThanhHocLop10: new FormControl('', [Validators.required, RequireMatch]),
    //   txtQuanHuyenHocLop10: new FormControl('', [Validators.required, RequireMatch]),
    //   txtTruongHocLop10: new FormControl('', [Validators.required, RequireMatch]),

    //   txtTinhThanhHocLop11: new FormControl('', [Validators.required, RequireMatch]),
    //   txtQuanHuyenHocLop11: new FormControl('', [Validators.required, RequireMatch]),
    //   txtTruongHocLop11: new FormControl('', [Validators.required, RequireMatch]),

    //   txtTinhThanhHocLop12: new FormControl('', [Validators.required, RequireMatch]),
    //   txtQuanHuyenHocLop12: new FormControl('', [Validators.required, RequireMatch]),
    //   txtTruongHocLop12: new FormControl('', [Validators.required, RequireMatch]),
    // })

    this.tinhThanhThuongTrus$ = this.autoCompleteTinhThanh(this.tinhThanhThuongTruNextPage$, this.txtTinhThanhThuongTru, "tinhthanhpho", null);

    this.tinhThanhTamTrus$ = this.autoCompleteTinhThanh(this.tinhThanhTamTruNextPage$, this.txtTinhThanhTamTru, "tinhthanhpho", null);

    this.tinhThanhHocLop10s$ = this.autoCompleteTinhThanh(this.tinhThanhHocLop10NextPage$, this.txtTinhThanhHocLop10, "tinhthanhpho", null);

    this.tinhThanhHocLop11s$ = this.autoCompleteTinhThanh(this.tinhThanhHocLop11NextPage$, this.txtTinhThanhHocLop11, "tinhthanhpho", null);

    this.tinhThanhHocLop12s$ = this.autoCompleteTinhThanh(this.tinhThanhHocLop12NextPage$, this.txtTinhThanhHocLop12, "tinhthanhpho", null);

    await this.loadData(true);

    this.model.ThiSinh.HoLotVaTen = this.model.ThiSinh.Ten;
    this.taoDanhSachCotDiem();



    // khi edit thì set 
    //Khi sửa
    if (this.IsEdit) // nếu khác null && undefine thì là trường hợp edit
    {
      this.onSetValueFormControl();

      this.chungChiSelected = this.model.ThiSinh.ChungChi.Ma;
      this.radioChangeChungChi(new MatRadioChange(null, { value: this.model.ThiSinh.ChungChi.Ma }));

      // let temp = new NguyenVong();
      // this.model.NguyenVongs.forEach(item => temp = item);
      
      // if (temp.NganhDaoTao.Id != 71) {
      //   const nguyenVong = new NguyenVong();

      //   nguyenVong.ThuTuNguyenVong = this.tinhSoThuTuNguyenVongKhiBamNutThemNguyenVong();
      //   this.model.NguyenVongs.push(nguyenVong);
      //   nguyenVong.NganhDaoTao.Id = 71;
      // }

      for (let index = 0; index < this.model.NguyenVongs.length; index++) {
        // this.model.NguyenVongs[index].ChuyenNganhDaoTaos.push( this.model.NguyenVongs[index].ChuyenNganhDaoTao)
        this.onChangeNguyenVongEdit(index, this.model.NguyenVongs[index].NganhDaoTao);
      }

    }
    else // khi thêm mới
    {
      debugger;
      this.model.ThiSinh.KhuVucUuTienId = 5; //KV3
      this.model.ThiSinh.DoiTuongUuTienId = 29; // Không thuộc đối tượng ưu tiên

      this.chungChiSelected = "KHONGCO";
    }



    if (!this.IsGiaoDienTrongAdmin)
      this.btnSaveDisable = true; // nếu không phải giao diện admin thì khóa lại


    // this.model.ThiSinh.ChungChi = { Ma: 'SAT', Ten: "IELTS", DonViCap: '', NgayCap: '', DaThi: true, Diem: 0, MaSoBang: '', SoHieuBang: '' }
    //this.chungChi= { Ma: 'SAT', Ten: "IELTS", DonViCap: '', NgayCap: '', DaThi: true, Diem: 0, MaSoBang: '', SoHieuBang: '' };


    if (this.model.ThiSinh.ChungChi.Ma == "DELF" || this.model.ThiSinh.ChungChi.Ma == "JLPT")
      this.chungChiIsNhapDiem = false;

    //this.loadTruongCDDH();
    this.url = '/tuyen-sinh';
  }




  radioChangeChungChi($event: MatRadioChange) {
    debugger;
    if ($event.value == "DELF" || $event.value == "JLPT") {
      this.chungChiIsNhapDiem = false;

    }
    else {
      this.chungChiIsNhapDiem = true;

    }

    this.chungChis.forEach(element => {
      if (element.Ma == $event.value)
        this.model.ThiSinh.ChungChi = element;
      if ($event.value == "KHONGCO")
        this.model.ThiSinh.ChungChi = new ChungChi();

    });


  }
  onSetValueFormControl() {
    var thiSinh = this.model.ThiSinh;

    this.txtTinhThanhThuongTru.setValue(thiSinh.TinhThanhThuongTru);
    this.txtQuanHuyenThuongTru.setValue(thiSinh.QuanHuyenThuongTru);
    this.txtPhuongXaThuongTru.setValue(thiSinh.PhuongXaThuongTru);

    this.txtTinhThanhTamTru.setValue(thiSinh.TinhThanhTamTru);
    this.txtQuanHuyenTamTru.setValue(thiSinh.QuanHuyenTamTru);
    this.txtPhuongXaTamTru.setValue(thiSinh.PhuongXaTamTru);

    this.txtTinhThanhHocLop10.setValue(thiSinh.TinhThanhTHPT10);
    this.txtQuanHuyenHocLop10.setValue(thiSinh.QuanHuyenTHPT10);
    this.txtTruongHocLop10.setValue(thiSinh.TruongTHPT10);

    this.txtTinhThanhHocLop11.setValue(thiSinh.TinhThanhTHPT11);
    this.txtQuanHuyenHocLop11.setValue(thiSinh.QuanHuyenTHPT11);
    this.txtTruongHocLop11.setValue(thiSinh.TruongTHPT11);

    this.txtTinhThanhHocLop12.setValue(thiSinh.TinhThanhTHPT12);
    this.txtQuanHuyenHocLop12.setValue(thiSinh.QuanHuyenTHPT12);
    this.txtTruongHocLop12.setValue(thiSinh.TruongTHPT12);

  }


  onGetValueFormControl() {


    this.model.ThiSinh.TinhThanhThuongTru = this.txtTinhThanhThuongTru.value;
    this.model.ThiSinh.QuanHuyenThuongTru = this.txtQuanHuyenThuongTru.value;
    this.model.ThiSinh.PhuongXaThuongTru = this.txtPhuongXaThuongTru.value;
    this.model.ThiSinh.TinhThanhTamTru = this.txtTinhThanhTamTru.value;
    this.model.ThiSinh.QuanHuyenTamTru = this.txtQuanHuyenTamTru.value;
    this.model.ThiSinh.PhuongXaTamTru = this.txtPhuongXaTamTru.value;
    this.model.ThiSinh.TinhThanhTHPT10 = this.txtTinhThanhHocLop10.value;
    this.model.ThiSinh.QuanHuyenTHPT10 = this.txtQuanHuyenHocLop10.value;
    this.model.ThiSinh.TruongTHPT10 = this.txtTruongHocLop10.value;
    this.model.ThiSinh.TinhThanhTHPT11 = this.txtTinhThanhHocLop11.value;
    this.model.ThiSinh.QuanHuyenTHPT11 = this.txtQuanHuyenHocLop11.value;
    this.model.ThiSinh.TruongTHPT11 = this.txtTruongHocLop11.value;
    this.model.ThiSinh.TinhThanhTHPT12 = this.txtTinhThanhHocLop12.value;
    this.model.ThiSinh.QuanHuyenTHPT12 = this.txtQuanHuyenHocLop12.value;
    this.model.ThiSinh.TruongTHPT12 = this.txtTruongHocLop12.value;

  }


  checkBoxChangeCamDoanLoaiKhai($event) {

    if ($event.checked)
      this.btnSaveDisable = false;
    else
      this.btnSaveDisable = true;
  }

  /* #region  autocomplte */


  onTinhThanhLop10SelectionChange(tinhThanh) {

    this.quanHuyenHocLop10s$ = this.autoCompleteTinhThanh(this.quanHuyenHocLop10NextPage$, this.txtQuanHuyenHocLop10, "quanhuyen", tinhThanh.Id);

  }
  onTinhThanhLop11SelectionChange(tinhThanh) {
    this.quanHuyenHocLop11s$ = this.autoCompleteTinhThanh(this.quanHuyenHocLop11NextPage$, this.txtQuanHuyenHocLop11, "quanhuyen", tinhThanh.Id);

  }
  onTinhThanhLop12SelectionChange(tinhThanh) {

    this.quanHuyenHocLop12s$ = this.autoCompleteTinhThanh(this.quanHuyenHocLop12NextPage$, this.txtQuanHuyenHocLop12, "quanhuyen", tinhThanh.Id);

  }
  onTinhThanhThuongTruSelectionChange(tinhThanh) {

    this.quanHuyenThuongTrus$ = this.autoCompleteTinhThanh(this.quanHuyenThuongTruNextPage$, this.txtQuanHuyenThuongTru, "quanhuyen", tinhThanh.Id);

  }
  onTinhThanhTamTruSelectionChange(tinhThanh) {

    this.quanHuyenTamTrus$ = this.autoCompleteTinhThanh(this.quanHuyenTamTruNextPage$, this.txtQuanHuyenTamTru, "quanhuyen", tinhThanh.Id);

  }
  onQuanHuyenThuongTruSelectionChange(quanHuyen: QuanHuyen) {
    this.phuongXaThuongTrus$ = this.autoCompleteTinhThanh(this.phuongXaThuongTruNextPage$, this.txtPhuongXaThuongTru, "phuongxa", quanHuyen.Id);
  }

  onQuanHuyenTamTruSelectionChange(quanHuyen: QuanHuyen) {
    this.phuongXaTamTrus$ = this.autoCompleteTinhThanh(this.phuongXaTamTruNextPage$, this.txtPhuongXaTamTru, "phuongxa", quanHuyen.Id);
  }

  onQuanHuyenLop10SelectionChange(quanHuyen: QuanHuyen) {
    this.truongHocLop10s$ = this.autoCompleteTruong(this.truongHocLop10NextPage$, this.txtTruongHocLop10, "THPT", this.txtTinhThanhHocLop10.value.MaQuanLy, quanHuyen.MaQuanLy);
  }

  onQuanHuyenLop11SelectionChange(quanHuyen: QuanHuyen) {

    this.truongHocLop11s$ = this.autoCompleteTruong(this.truongHocLop11NextPage$, this.txtTruongHocLop11, "THPT", this.txtTinhThanhHocLop11.value.MaQuanLy, quanHuyen.MaQuanLy);
  }

  onQuanHuyenLop12SelectionChange(quanHuyen: QuanHuyen) {
    this.truongHocLop12s$ = this.autoCompleteTruong(this.truongHocLop12NextPage$, this.txtTruongHocLop12, "THPT", this.txtTinhThanhHocLop12.value.MaQuanLy, quanHuyen.MaQuanLy);
  }

  onTinhThanhThuongTruScroll() {
    this.tinhThanhThuongTruNextPage$.next();

  }
  onTinhThanhTamTruScroll() {
    this.tinhThanhTamTruNextPage$.next();

  }

  onQuanHuyenThuongTruScroll() {
    this.quanHuyenThuongTruNextPage$.next();

  }
  onQuanHuyenTamTruScroll() {
    this.quanHuyenTamTruNextPage$.next();

  }

  onPhuongXaTamTruScroll() {
    this.phuongXaTamTruNextPage$.next();
  }
  onPhuongXaThuongTruScroll() {
    this.phuongXaThuongTruNextPage$.next();
  }

  onTinhThanhHocLop10Scroll() {
    this.tinhThanhHocLop10NextPage$.next();
  }
  onTinhThanhHocLop11Scroll() {
    this.tinhThanhHocLop11NextPage$.next();
  }

  onTinhThanhHocLop12Scroll() {
    this.tinhThanhHocLop12NextPage$.next();
  }

  onQuanHuyenHocLop10Scroll() {
    this.quanHuyenHocLop10NextPage$.next();

  }

  onQuanHuyenHocLop11Scroll() {
    this.quanHuyenHocLop11NextPage$.next();

  }

  onQuanHuyenHocLop12Scroll() {
    this.quanHuyenHocLop12NextPage$.next();

  }

  onTruongHocLop10Scroll() {
    this.truongHocLop10NextPage$.next();
  }

  onTruongHocLop11Scroll() {
    this.truongHocLop11NextPage$.next();
  }

  onTruongHocLop12Scroll() {
    this.truongHocLop12NextPage$.next();
  }

  autoCompleteTinhThanh(nextPage$: Subject<any>, txtSearch: FormControl, data: string, chaId: number = null) {

    // Note: listen for search text changes
    const filter$ = txtSearch.valueChanges
      // .get('searchText')
      .pipe(
        startWith(''),
        debounceTime(200),
        // Note: If the option valye is bound to object, after selecting the option
        // Note: the value will change from string to {}. We want to perform search 
        // Note: only when the type is string (no match)
        filter(q => typeof q === "string"));


    // Note: There are 2 stream here: the search text changes stream and the nextPage$ (raised by directive at 80% scroll)
    // Note: On every search text change, we issue a backend request starting the first page
    // Note: While the backend is processing our request we ignore any other NextPage emitts (exhaustMap).
    // Note: If in this time the search text changes, we don't need those results anymore (switchMap)
    return filter$.pipe(
      switchMap(filter => {
        //Note: Reset the page with every new seach text
        let currentPage = 1;
        return nextPage$.pipe(
          startWith(currentPage),
          //Note: Until the backend responds, ignore NextPage requests.
          exhaustMap(_ => this._quanHuyenService.SearchAsync(data, filter, currentPage, chaId)),
          tap(() => currentPage++),
          //Note: This is a custom operator because we also need the last emitted value.
          //Note: Stop if there are no more pages, or no results at all for the current search text.
          takeWhile(p => p.length > 0),
          scan((allTinhThanhs, newTinhThanhs) => allTinhThanhs.concat(newTinhThanhs), []),
        );
      }));//.subscribe(users =>  users);; // Note: We let asyncPipe subscribe.

    //end autocomplete
  }

  autoCompleteTruong(nextPage$: Subject<any>, txtSearch: FormControl, cap: string, maTinhThanh: String, maQuanHuyen: string) {

    // Note: listen for search text changes
    const filter$ = txtSearch.valueChanges
      // .get('searchText')
      .pipe(
        startWith(''),
        debounceTime(200),
        // Note: If the option valye is bound to object, after selecting the option
        // Note: the value will change from string to {}. We want to perform search 
        // Note: only when the type is string (no match)
        filter(q => typeof q === "string"));


    // Note: There are 2 stream here: the search text changes stream and the nextPage$ (raised by directive at 80% scroll)
    // Note: On every search text change, we issue a backend request starting the first page
    // Note: While the backend is processing our request we ignore any other NextPage emitts (exhaustMap).
    // Note: If in this time the search text changes, we don't need those results anymore (switchMap)
    return filter$.pipe(
      switchMap(filter => {
        //Note: Reset the page with every new seach text
        let currentPage = 1;
        return nextPage$.pipe(
          startWith(currentPage),
          //Note: Until the backend responds, ignore NextPage requests.
          //cap:THPT,DH,CD,TC,ĐHCL: có thể trường nhiều cấp, cách nhau bởi dấu ","
          exhaustMap(_ => this._truongThptService.SearchAsync(cap, filter, currentPage, maTinhThanh, maQuanHuyen)),
          tap(() => currentPage++),
          //Note: This is a custom operator because we also need the last emitted value.
          //Note: Stop if there are no more pages, or no results at all for the current search text.
          takeWhile(p => p.length > 0),
          scan((allTinhThanhs, newTinhThanhs) => allTinhThanhs.concat(newTinhThanhs), []),
        );
      }));//.subscribe(users =>  users);; // Note: We let asyncPipe subscribe.

    //end autocomplete
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();

  }

  displayWith(quanHuyen: QuanHuyen) {
    if (quanHuyen) { return quanHuyen.Ten; }
  }

  /* #endregion */

  onClearForm() {
    this._hoSoXetTuyenIdRouter = 'null';
    this.model = new HoSoXetTuyen();
    this.model.NguyenVongs.push(new NguyenVong());
    //this.router.navigateByUrl('tuyen-sinh/dang-ky/form-xet-tuyen/1/null/' + this._dotTuyenSinhIdRouter);
  }


  onDeleteNguyenVongClick(i: number) {
    this.model.NguyenVongs.splice(i, 1);

    //Tạo lại danh sách cột điểm.
    this.taoDanhSachCotDiem();

    //this.onChange();
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1.Id === o2.Id;
  }

  onChangeNguyenVongEdit(i, nganh: NganhDaoTao) {
    //Get danh sách chuyên ngành
    //Đối với ngành: luật và luật thương mại quốc tế
    // Mã ngành là chung cho tất cả các trường có đào tạo.
    // Luật: 7380101
    //Luật Thương Mại Quốc Tế: 7380109
    //Đối với 2 ngành này trường đại học luật bắt thí sinh phải chọn thêm chuyên ngành


    /* #region  Load chuyên ngành */
    if (nganh.NganhId == '7380101' || nganh.NganhId == '7380109') {
      // Hiển thị combobox chọn ngành
      this.model.NguyenVongs[i].ChoPhepChonChuyenNganh = true;

      //Load chuyên ngành
      this._nganhDaoTaoService.allAsync(null, null, "NhomChaId=" + nganh.Id, "Ten DESC").then(result =>
        this.model.NguyenVongs[i].ChuyenNganhDaoTaos = result
        //nganh = result;
      );
      this._nganhDaoTaoService.singleAsync(this.model.NguyenVongs[i].NganhDaoTaoId).then(result => {
        this.model.NguyenVongs[i].NganhDaoTao = result;
        nganh = result;
      });
    }
    else

      this.model.NguyenVongs[i].ChoPhepChonChuyenNganh = false;
    /* #endregion */

    /* #region  Load Tổ hợp */
    this._nganhDaoTaoService.getToHopCotDiemByNganhDaoTaoID(nganh.Id, this._dotTuyenSinhIdRouter).subscribe(
      toHopCotDiems => {

        this.model.NguyenVongs[i].TopHopCotDiems = toHopCotDiems;

        // //nếu khác 0 thì tự động gọi tổ hợp cột điểm thứ 1
        // if (toHopCotDiems.length !== 0) {
        //   this.model.NguyenVongs[i].ToHopCotDiemId = toHopCotDiems[0].Id;
        //   this.onChangeToHopCotDiem(i, toHopCotDiems[0].Id);
        // }
        //this.onChange();
      }, () => {
        this.openSnackBar('Không lấy được tổ hợp điểm', 1);
      }
    )
    /* #endregion */

    this.taoDanhSachCotDiem();

  }


  onChangeNguyenVong(i, nganh: NganhDaoTao) {
    //Get danh sách chuyên ngành
    //Đối với ngành: luật và luật thương mại quốc tế
    // Mã ngành là chung cho tất cả các trường có đào tạo.
    // Luật: 7380101
    //Luật Thương Mại Quốc Tế: 7380109
    //Đối với 2 ngành này trường đại học luật bắt thí sinh phải chọn thêm chuyên ngành


    /* #region  Load chuyên ngành */
    if (nganh.NganhId == '7380101' || nganh.NganhId == '7380109') {
      // Hiển thị combobox chọn ngành
      this.model.NguyenVongs[i].ChoPhepChonChuyenNganh = true;

      //Load chuyên ngành
      this._nganhDaoTaoService.allAsync(null, null, "NhomChaId=" + nganh.Id, "Ten DESC").then(result =>
        this.model.NguyenVongs[i].ChuyenNganhDaoTaos = result

      )
    }
    else

      this.model.NguyenVongs[i].ChoPhepChonChuyenNganh = false;
    /* #endregion */

    /* #region  Load Tổ hợp */
    this._nganhDaoTaoService.getToHopCotDiemByNganhDaoTaoID(nganh.Id, this._dotTuyenSinhIdRouter).subscribe(
      toHopCotDiems => {

        this.model.NguyenVongs[i].TopHopCotDiems = toHopCotDiems;
        this.model.NguyenVongs[i].CotDiems = [];
        this.model.NguyenVongs[i].ToHopCotDiemId = null;

        //nếu khác 0 thì tự động gọi tổ hợp cột điểm thứ 1
        if (toHopCotDiems.length !== 0) {
          this.model.NguyenVongs[i].ToHopCotDiemId = toHopCotDiems[0].Id;
          this.onChangeToHopCotDiem(i, toHopCotDiems[0].Id);
        }
        //this.onChange();
      }, () => {
        this.openSnackBar('Không lấy được tổ hợp điểm', 1);
      }
    )
    /* #endregion */

    this.taoDanhSachCotDiem();

  }



  onChangeToHopCotDiem(i, value) {
    debugger;
    this._cotDiemService.getCotDiemByToHopCotDiemID(value).subscribe(
      CotDiems => {
        // this.model.NguyenVongs[i].ThuTuNguyenVong = i;
        this.model.NguyenVongs[i].CotDiems = CotDiems;
        // this.model.NguyenVongs[i].ThuTuNguyenVong = i;
        this.taoDanhSachCotDiem();

      }
      , error => {
        this.openSnackBar('Không lấy được Cột điểm', 1);
      }
    )
  }


  onRegisterClick() {




    this.onGetValueFormControl();

    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = this._dotTuyenSinh.HinhThucXetTuyen.Loai;
    this.model.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId; //ktra lai


    if (!this.isValidData()) return false;


    if (this.CMNDDaCo(this.model.ThiSinh.CMND)) { this.openSnackBar('CMND này đã được đăng ký. Vui lòng đăng nhập để đăng ký!', 1); return; }


    // if (!this.CheckThuTuNguyenVongHopLe(this.model.NguyenVongs)) return;
    if (!this.checkNguyenVongVaToHop(this.model.NguyenVongs)) {
      this.openSnackBar('Không được đăng ký cùng tổ hợp môn và cùng ngành trên nhiều nguyện vọng', 1);
      return;
    }

    if (!this.CheckNguyenVongHopLe(this.model.NguyenVongs)) return;

    this.setBanDiem();

    //var json = JSON.stringify(this.model);

    //console.log("json",json); 

    // let model = JSON.parse(json);

    //let ngaySinh = new Date(model.ThiSinh.NgaySinh);

    //model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
    //model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);

    //Chuyển đổi bảng điểm từ modole.bangdiems sang cột điểm cho từng nguyện vọng
    //Vì lúc chọn nhiều nguyện vọng thì chỉ có 1 bảng điểm chung cho nên phải chuyển đổi bảng điểm vào cho từng nguyện vọng



    this.model.NguyenVongs.forEach(nguyenVong => {
      nguyenVong.CotDiems.forEach(cotDiemTrongNguyenVong => {

        this.model.CotDiems.forEach(cotDiem => {

          if (cotDiem.Id == cotDiemTrongNguyenVong.Id)
            cotDiemTrongNguyenVong = cotDiem;

        });

      });
    });


    //Gán thêm tên từ json vào cột
    this.model.ThiSinh.Ten = this.model.ThiSinh.HoLotVaTen;

    this.btnSaveDisable = true;

    console.log('register', this.model);
    this._hoSoXetTuyenService.create(this.model).subscribe(
      success => {
        let LinkInBienNhan = success.UrlBienNhan;
        this.model = success;
        //  let LinkInBienNhan = `${this.serviceUrl}/reports/ExportHoSoDangKyTuyenSinh?hsdangkytuyensinhid=${success.Id}&BienNhanLaw=1`;
        var item = { TenDangNhap: success.ThiSinh.TenDangNhap, MatKhau: success.ThiSinh.MatKhau, NoiDungThongBao: this._dotTuyenSinh.NoiDungThongBao, LinkInBienNhan: LinkInBienNhan };
        if (!this.IsGiaoDienTrongAdmin) // không phải là trong giao diện admin
          this.openDialog(item);

        this.openSnackBar('Đã đăng ký xét tuyển thành công', 2);
        //this.router.navigateByUrl(this.url + success.Id + '/' + this._dotTuyenSinhIdRouter);
        this.btnSaveDisable = false;
      }, error => {
        this.btnSaveDisable = false;
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
      });


  }

  onSaveClick() {
    var url = this._location.path();
    url = url.substring(0, url.lastIndexOf('/' + this._dotTuyenSinhIdRouter));
    url = url.substring(url.lastIndexOf('/') + 1, url.length);
    // this.parseToDatetime();
    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = "nhapdiem";
    this.model.Id = Number.parseInt(this._hoSoXetTuyenIdRouter);





    this.onGetValueFormControl();

    // if(!this.CheckThuTuNguyenVongHopLe(this.model.NguyenVongs)) return;

    if (!this.isValidData()) return false;

    if (!this.checkNguyenVongVaToHop(this.model.NguyenVongs)) {
      this.openSnackBar('Không được đăng ký cùng tổ hợp môn và cùng ngành trên nhiều nguyện vọng', 1);
      return;
    }

    if (!this.CheckNguyenVongHopLe(this.model.NguyenVongs)) return;


    this.setBanDiem();
    // let model = JSON.parse(JSON.stringify(this.model));
    // let ngaySinh = new Date(model.ThiSinh.NgaySinh);
    //model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
    // model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);

    //Gán thêm tên từ json vào cột
    this.model.ThiSinh.Ten = this.model.ThiSinh.HoLotVaTen;

    this.btnSaveDisable = true;
    //alert(this.model.KetQua);
    //debugger;
    // console.log('update', this.model);
    this._hoSoXetTuyenService.update(this.model).subscribe(
      () => {
        this.openSnackBar('Đã cập nhật hồ sơ xét tuyển thành công', 2);
        this.btnSaveDisable = false;
      }, error => {
        this.btnSaveDisable = false;
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
      });
  }

  // set lại cột điểm cho từng nguyện vọng
  setBanDiem() {
    this.model.NguyenVongs.forEach(nguyenVong => {

      for (let index = 0; index < nguyenVong.CotDiems.length; index++) {
        const cotDiem = nguyenVong.CotDiems[index];

        var cotDiemTrongBanDiem = this.model.CotDiems.find(t => t.Id == cotDiem.Id)
        if (typeof (cotDiemTrongBanDiem) != 'undefined')
          nguyenVong.CotDiems[index] = cotDiemTrongBanDiem;
      }
      // nguyenVong.CotDiems.forEach(cotDiemTrongNguyenVong => {

      //   this.model.CotDiems.forEach(cotDiem => {

      //     if (cotDiem.Id == cotDiemTrongNguyenVong.Id)
      //       cotDiemTrongNguyenVong = cotDiem;

      //   });

      // });
    });
  }

  openDialog(item): void {
    const dialogRef = this._matDialog.open(ConfirmDangKyComponent, {
      //width: '1000px', height: '550px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.router.navigateByUrl("tuyen-sinh");
      if (result != null) {

      }
    });
  }

  //Thứ tự ưu tiên của nguyện vọng phải bắt đầu từ 1 và phải liên tục
  CheckThuTuNguyenVongHopLe(array: NguyenVong[]): any {
    if (array.length == 0) {
      this.openSnackBar('Không có chọn nguyện vọng!', 1); return false;
    }


    let arrayInt = array.map(item => item.ThuTuNguyenVong);// tạo mãng kiểu int từ mãng object

    let arrayIntAfterSort = arrayInt.sort((n1, n2) => n1 > n2 ? 1 : -1); // sắp xếp asc

    if (arrayIntAfterSort[0] !== 1) { // thứ tự nguyện vong phải bắt đầu từ 1
      this.openSnackBar('thứ tự nguyện vong phải bắt đầu từ 1!', 1); return false;
    }


    //let min: number = Math.min(...arrayInt);
    //console.log(min);

    //if (arrayInt[0] != min) return -3;

    let min = arrayIntAfterSort[0];

    for (let i = 1; i < arrayIntAfterSort.length; i++) {
      if (arrayIntAfterSort[i] > min + 1) {
        this.openSnackBar('thứ tự nguyện vong phải bắt đầu từ 1!', 1);
        return false;
      }

      min++;
    }
    return true;


  }


  //2 nguyện vọng không thể cùng Tổ hợp môn và cùng ngành
  //true là hợp lệ, false là không hợp lệ
  checkNguyenVongVaToHop(array: NguyenVong[]): any {
    if (array.length == 0) {
      this.openSnackBar('Không có chọn nguyện vọng!', 1); return false;
    }
    let result: boolean = true;
    for (let i = 0; i < array.length; i++) {

      for (let j = i + 1; j < array.length; j++) {

        if (array[i].NganhDaoTao.Id == array[j].NganhDaoTao.Id && array[i].ToHopCotDiemId == array[j].ToHopCotDiemId) {

          result = false;
        }
      }

    }
    return result;


  }



  //Khi bạn đăng ký xét tuyển vào các ngành của Trường Đại Học Luật TP.HCM, trong danh sách đăng ký nếu có ngành Luật và ngành Quản Trị - Luật thì bạn phải đăng ký ngành Quản Trị - Luật trước (Có thứ tự ưu tiên cao), sau đó mới đến ngành Luật.
  CheckNguyenVongHopLe(array: NguyenVong[]): any {
    if (array.length == 0) {
      this.openSnackBar('Không có chọn nguyện vọng!', 1); return false;
    }


    let luat = array.find(x => x.NganhDaoTao.NganhId === '7380101');
    let quanTriLuat = array.find(x => x.NganhDaoTao.NganhId === '7340102');
    debugger;
    if (quanTriLuat && luat) {

      //Xét thêm nếu tổ hợp môn giống nhau 
      if (luat.ToHopCotDiemId === quanTriLuat.ToHopCotDiemId) {
        if (quanTriLuat.ThuTuNguyenVong > luat.ThuTuNguyenVong) {
          this.openSnackBar('Bạn phải đăng ký ngành Quản Trị - Luật trước (Có thứ tự ưu tiên cao), sau đó mới đến ngành Luật.', 1);
          return false;
        }
      }

    }
    return true;

  }

  aClickClearSelectedChungChi() {
    this.chungChiSelected = null;
  }


  isValidData(): any {
    let valid: boolean = true;

    if (this.model.ThiSinh.HoLotVaTen == null || this.model.ThiSinh.HoLotVaTen.trim() == '') {
      this.openSnackBar('Vui lòng nhập Họ và tên', 1);
      valid = false;
      return;
    }
    if (this.model.ThiSinh.CMND == null || this.model.ThiSinh.CMND.trim() == '') {
      this.openSnackBar('Vui lòng nhập CMND', 1);
      valid = false;
      return;
    }
    if (this.model.ThiSinh.NgaySinh == null) {

      this.openSnackBar('Vui lòng nhập ngày sinh', 1);
      valid = false;
      return;
    }
    if (this.model.ThiSinh.GioiTinh == null) {
      this.openSnackBar('Vui lòng nhập giới tính', 1);
      valid = false;
      return;
    }
    if (this.model.ThiSinh.SDT == null || this.model.ThiSinh.SDT.trim() == '') {
      this.openSnackBar('Vui lòng nhập Số điện thoại di động', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.Email == null || this.model.ThiSinh.Email.trim() == '') {

      this.openSnackBar('Vui lòng nhập Email', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.DiaChiThuongTru == null || this.model.ThiSinh.DiaChiThuongTru.trim() == '') {

      this.openSnackBar('Vui lòng nhập Địa chỉ thường trú', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.TinhThanhThuongTru == null) {

      this.openSnackBar('Vui lòng nhập chọn Tỉnh thành thường trú', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.DiaChiLienLac == null || this.model.ThiSinh.DiaChiLienLac.trim() == '') {

      this.openSnackBar('Vui lòng nhập Địa chỉ liên lạc', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.DiaChiNhanBaoTin == null || this.model.ThiSinh.DiaChiNhanBaoTin.trim() == '') {

      this.openSnackBar('Vui lòng nhập Địa chỉ nhận giấy báo', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.SoBaoDanhThiTHPTQG == null || this.model.ThiSinh.SoBaoDanhThiTHPTQG.trim() == '') {

      this.openSnackBar('Vui lòng nhập số báo danh', 1);
      valid = false;
      return;
    }

    // if (this.model.ThiSinh.DongYHocQuanTriKinhDoanh == false) {

    //   this.openSnackBar('Thí sinh chưa chọn đăng ký thêm nguyện vọng vào ngành học Quản trị kinh doanh', 1);
    //   valid = false;
    //   return;
    // }


    for (let i = 0; i < this.model.NguyenVongs.length; i++) {
      const e = this.model.NguyenVongs[i];
      if (e.NganhDaoTao == null) {
        this.openSnackBar('Vui lòng chọn Ngành', 1);
        valid = false;
        return;
      }
    }

    return valid;


  }


}
/* #endregion ===================================================================*/
@Component({
  selector: 'app-law-bo-sung-thong-tin',
  templateUrl: './law-bo-sung-thong-tin.component.html',
  styleUrls: ['../form-xet-tuyen.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  providers: [
    //{provide: ValidatorService, useClass: PersonValidatorService },
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    { provide: MAT_DATE_LOCALE, useValue: 'vi' },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }]
})

export class LawBoSungThongTinComponent extends LawComponent {

  onSaveClick() {
    var url = this._location.path();
    url = url.substring(0, url.lastIndexOf('/' + this._dotTuyenSinhIdRouter));
    url = url.substring(url.lastIndexOf('/') + 1, url.length);
    // this.parseToDatetime();
    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    //this.model.HinhThucXetTuyen.Loai = "chinhsuathongtin";
    this.model.Id = Number.parseInt(this._hoSoXetTuyenIdRouter);





    this.onGetValueFormControl();

    // if(!this.CheckThuTuNguyenVongHopLe(this.model.NguyenVongs)) return;

    if (!this.isValidData()) return false;

  

    //Gán thêm tên từ json vào cột
    this.model.ThiSinh.Ten = this.model.ThiSinh.HoLotVaTen;

    this.btnSaveDisable = true;

    this._hoSoXetTuyenService.update(this.model).subscribe(
      () => {
        this.openSnackBar('Đã cập thông tin thành công', 2);
        this.btnSaveDisable = false;
      }, error => {
        this.btnSaveDisable = false;
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
      });

      
  }

  isValidData(): any {
    let valid: boolean = true;

    if (this.model.ThiSinh.HoLotVaTen == null || this.model.ThiSinh.HoLotVaTen.trim() == '') {
      this.openSnackBar('Vui lòng nhập Họ và tên', 1);
      valid = false;
      return;
    }
    if (this.model.ThiSinh.CMND == null || this.model.ThiSinh.CMND.trim() == '') {
      this.openSnackBar('Vui lòng nhập CMND', 1);
      valid = false;
      return;
    }
    if (this.model.ThiSinh.NgaySinh == null) {

      this.openSnackBar('Vui lòng nhập ngày sinh', 1);
      valid = false;
      return;
    }
    if (this.model.ThiSinh.GioiTinh == null) {
      this.openSnackBar('Vui lòng nhập giới tính', 1);
      valid = false;
      return;
    }
    if (this.model.ThiSinh.SDT == null || this.model.ThiSinh.SDT.trim() == '') {
      this.openSnackBar('Vui lòng nhập Số điện thoại di động', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.Email == null || this.model.ThiSinh.Email.trim() == '') {

      this.openSnackBar('Vui lòng nhập Email', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.DiaChiThuongTru == null || this.model.ThiSinh.DiaChiThuongTru.trim() == '') {

      this.openSnackBar('Vui lòng nhập Địa chỉ thường trú', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.TinhThanhThuongTru == null) {

      this.openSnackBar('Vui lòng nhập chọn Tỉnh thành thường trú', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.DiaChiLienLac == null || this.model.ThiSinh.DiaChiLienLac.trim() == '') {

      this.openSnackBar('Vui lòng nhập Địa chỉ liên lạc', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.DiaChiNhanBaoTin == null || this.model.ThiSinh.DiaChiNhanBaoTin.trim() == '') {

      this.openSnackBar('Vui lòng nhập Địa chỉ nhận giấy báo', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.SoBaoDanhThiTHPTQG == null || this.model.ThiSinh.SoBaoDanhThiTHPTQG.trim() == '') {

      this.openSnackBar('Vui lòng nhập số báo danh', 1);
      valid = false;
      return;
    }




    return valid;


  }
}
