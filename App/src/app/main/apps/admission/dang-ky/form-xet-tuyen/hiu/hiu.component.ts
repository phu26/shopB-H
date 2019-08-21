import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFormXetTuyenComponent, ConfirmDangKyComponent, RequireMatch } from '../form-xet-tuyen.component';
import { fuseAnimations } from '@fuse/animations';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../date.adapter';
import { HoSoXetTuyen } from '../../../Models/HoSoXetTuyen.model';
import { NguyenVong } from '../../../Models/NguyenVong.model';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { QuanHuyen } from '../../../Models/QuanHuyen.model';
import { TruongTHPT } from '../../../Models/TruongTHPT.model';
import { switchMap, filter, startWith, exhaustMap, tap, takeWhile, scan, debounceTime } from 'rxjs/operators';
import { NganhDaoTao } from '../../../Models/NganhDaoTao.model';


/* #region  Kỳ thi SAT */
@Component({

  selector: 'app-hiu',
  templateUrl: `./hiu.component.html`,
  styleUrls: [`./hiu.component.scss`],
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
export class HiuComponent extends BaseFormXetTuyenComponent {

  displayedColumns = ['Ten', 'Diem'];//this.columns.map(c => c.columnDef);
  displayedColumnBangDiemNangLucs: string[] = ['Ten', 'Loai', 'LoaiHinhThuc', 'Diem'];

  formDangKy: FormGroup;

  txtQuanHuyen = new FormControl();
  txtPhuongXa = new FormControl();



  quanHuyens$: Observable<QuanHuyen[]>;
  phuongXas$: Observable<QuanHuyen[]>;


  // autoCompleteNextPage$ = new Subject();
  // _autoCompleteOnDestroy = new Subject();
  autoCompleteNextPage$ = new Subject<number>();
  _autoCompleteOnDestroy = new Subject();


  txtTinhThanhNoiSinh = new FormControl();
  tinhThanhNoiSinhs$: Observable<QuanHuyen[]>;
  tinhThanhNoiSinhNextPage$ = new Subject();


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
    this.formDangKy = new FormGroup(
      {
        txtTinhThanhNoiSinh: new FormControl('', [Validators.required, RequireMatch]),

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


      }
    );


    this.tinhThanhThuongTrus$ = this.autoCompleteTinhThanh(this.tinhThanhThuongTruNextPage$, this.txtTinhThanhThuongTru, "tinhthanhpho", null);

    this.tinhThanhNoiSinhs$ = this.autoCompleteTinhThanh(this.tinhThanhNoiSinhNextPage$, this.txtTinhThanhNoiSinh, "tinhthanhpho", null);

     this.tinhThanhTamTrus$ = this.autoCompleteTinhThanh(this.tinhThanhTamTruNextPage$, this.txtTinhThanhTamTru, "tinhthanhpho", null);

    //  this.tinhThanhHocLop10s$ = this.autoCompleteTinhThanh(this.tinhThanhHocLop10NextPage$, this.txtTinhThanhHocLop10, "tinhthanhpho", null);

    //  this.tinhThanhHocLop11s$ = this.autoCompleteTinhThanh(this.tinhThanhHocLop11NextPage$, this.txtTinhThanhHocLop11, "tinhthanhpho", null);

    //   this.tinhThanhHocLop12s$ = this.autoCompleteTinhThanh(this.tinhThanhHocLop12NextPage$, this.txtTinhThanhHocLop12, "tinhthanhpho", null);

    this.truongHocLop10s$ = this.autoCompleteTruong(this.truongHocLop10NextPage$, this.txtTruongHocLop10, "THPT", null, null);

    this.truongHocLop11s$ = this.autoCompleteTruong(this.truongHocLop11NextPage$, this.txtTruongHocLop11, "THPT", null, null);


    this.truongHocLop12s$ = this.autoCompleteTruong(this.truongHocLop12NextPage$, this.txtTruongHocLop12, "THPT", null, null);

    // lấy chuyên nggành
    //this.filterNganhDaoTao = 'NhomChaId is not null';
    await this.loadData(true);

    this.taoDanhSachCotDiem();



    // khi edit thì set 
    //Khi sửa
    if (this.IsEdit) // nếu khác null && undefine thì là trường hợp edit
    {
      if(this.model.ThiSinh.TinhThanhThuongTru==null){
        await this._quanHuyenService.singleAsync(this.model.ThiSinh.TinhThanhId).then(x=>{
          this.model.ThiSinh.TinhThanhThuongTru = x;
        });
      }
      

      if(this.model.ThiSinh.QuanHuyenThuongTru==null){
        await this._quanHuyenService.singleAsync(this.model.ThiSinh.QuanHuyenId).then(x=>{
          this.model.ThiSinh.QuanHuyenThuongTru = x;
        });
      }
      

      if(this.model.ThiSinh.PhuongXaThuongTru==null){
        await this._quanHuyenService.singleAsync(this.model.ThiSinh.PhuongXaId).then(x=>{
          this.model.ThiSinh.PhuongXaThuongTru = x;
        });
      }
      

      if(this.model.ThiSinh.TinhThanhTamTru==null){
        await this._quanHuyenService.singleAsync(this.model.ThiSinh.TinhThanhTamTruId).then(x=>{
          this.model.ThiSinh.TinhThanhTamTru = x;
        });
      }
      

      if(this.model.ThiSinh.QuanHuyenTamTru==null)
      {
        await this._quanHuyenService.singleAsync(this.model.ThiSinh.QuanHuyenTamTruId).then(x=>{
          this.model.ThiSinh.QuanHuyenTamTru = x;
        });
      }

      if(this.model.ThiSinh.PhuongXaTamTru==null){
        await this._quanHuyenService.singleAsync(this.model.ThiSinh.PhuongXaTamTruId).then(x=>{
          this.model.ThiSinh.PhuongXaTamTru = x;
        });
      }

      if(this.model.ThiSinh.TruongTHPT12==null){
        await this._truongThptService.singleAsync(this.model.ThiSinh.TruongTHPT12Id).then(x=>{
          this.model.ThiSinh.TruongTHPT12 = x;
        });
      }
      

      this.onSetValueFormControl();


      for (let index = 0; index < this.model.NguyenVongs.length; index++) {
        // this.model.NguyenVongs[index].ChuyenNganhDaoTaos.push( this.model.NguyenVongs[index].ChuyenNganhDaoTao)
        this.onChangeNguyenVongEdit(index, this.model.NguyenVongs[index].NganhDaoTao);
      }

    }
    else // khi thêm mới
    {
      this.model.ThiSinh.KhuVucUuTienId = 5; //KV3
      this.model.ThiSinh.DoiTuongUuTienId = 29; // Không thuộc đối tượng ưu tiên
    }

    // if (!this.IsGiaoDienTrongAdmin)
    // this.btnSaveDisable = true; // nếu không phải giao diện admin thì khóa lại


    // this.model.ThiSinh.ChungChi = { Ma: 'SAT', Ten: "IELTS", DonViCap: '', NgayCap: '', DaThi: true, Diem: 0, MaSoBang: '', SoHieuBang: '' }
    //this.chungChi= { Ma: 'SAT', Ten: "IELTS", DonViCap: '', NgayCap: '', DaThi: true, Diem: 0, MaSoBang: '', SoHieuBang: '' };


    //this.loadTruongCDDH();
    this.url = '/tuyen-sinh';
  }


  onSetValueFormControl() {
    var thiSinh = this.model.ThiSinh;

    this.txtTinhThanhNoiSinh.setValue(thiSinh.NoiSinhObject);

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

  goBack() {
    this._location.back();
  }

  onChangeDiaChiTamTru(event) {
    if (event.checked == true) {
      this.txtTinhThanhTamTru.setValue(this.txtTinhThanhThuongTru.value);
      this.txtQuanHuyenTamTru.setValue(this.txtQuanHuyenThuongTru.value);
      this.txtPhuongXaTamTru.setValue(this.txtPhuongXaThuongTru.value);
      this.model.ThiSinh.DiaChiLienLacTamTru = this.model.ThiSinh.DiaChiLienLac;
    }
  }


  onGetValueFormControl() {

    this.model.ThiSinh.NoiSinhObject = this.txtTinhThanhNoiSinh.value;
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
  displayWithTHPT(thpt: TruongTHPT) {

    if (thpt && typeof thpt.Ten !== "undefined" && thpt.Ten != null) {

      return thpt.Ten + ' - ' + thpt.DiaChi
    }
    else {
      return "";
    }
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

  onOptionSelected_THPT12(lop12: TruongTHPT) {
    // console.log('lop12', lop12);
    this.model.ThiSinh.TruongTHPT12MaTruong = lop12.MaTruong;
    this.model.ThiSinh.TruongTHPT12MaTinh = lop12.MaTinh;

  }

  onOptionSelected_THPT11(lop11: TruongTHPT) {
    // console.log('lop12', lop12);
    this.model.ThiSinh.TruongTHPT11MaTruong = lop11.MaTruong;
    this.model.ThiSinh.TruongTHPT11MaTinh = lop11.MaTinh;

  }

  onOptionSelected_THPT10(lop10: TruongTHPT) {
    // console.log('lop12', lop12);
    this.model.ThiSinh.TruongTHPT10MaTruong = lop10.MaTruong;
    this.model.ThiSinh.TruongTHPT10MaTinh = lop10.MaTinh;

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


    if(nganh == null)
    {
      nganh = new NganhDaoTao();
      nganh.Id = this.model.NguyenVongs[i].NganhDaoTaoId;
      this.model.NguyenVongs[i].NganhDaoTao = nganh;
    }
    /* #region  Load chuyên ngành */
    if (nganh.NganhId != null || nganh.NganhId != null) {
      // Hiển thị combobox chọn ngành
      this.model.NguyenVongs[i].ChoPhepChonChuyenNganh = true;

      //Load chuyên ngành
      this._nganhDaoTaoService.allAsync(null, null, "NhomChaId=" + nganh.Id, "Ten DESC").then(result =>
        {this.model.NguyenVongs[i].ChuyenNganhDaoTaos = result}
      );
      
    }
    else

      this.model.NguyenVongs[i].ChoPhepChonChuyenNganh = false;

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

    debugger;

    /* #region  Load chuyên ngành */
    // if (nganh.NganhId != null) {
    //   // Hiển thị combobox chọn ngành
    //   this.model.NguyenVongs[i].ChoPhepChonChuyenNganh = true;

    //   //Load chuyên ngành
    //   this._nganhDaoTaoService.allAsync(null, null, "NhomChaId=" + nganh.Id, "Ten DESC").then(result =>
    //     this.model.NguyenVongs[i].ChuyenNganhDaoTaos = result

    //   )
    // }
    // else

    //   this.model.NguyenVongs[i].ChoPhepChonChuyenNganh = false;
    // /* #endregion */

    /* #region  Load Tổ hợp */
    this._nganhDaoTaoService.getToHopCotDiemByNganhDaoTaoID(nganh.Id, this._dotTuyenSinhIdRouter).subscribe(
      toHopCotDiems => {

        debugger;
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
        //this.onChange();
        console.log(this.model.NguyenVongs);

        CotDiems.forEach(cotdiem => {
          if (cotdiem.LoaiHinhThuc === null) {
            if (cotdiem.Loai === "monchinh")
              cotdiem.LoaiHinhThuc = "duthi";
            else
              cotdiem.LoaiHinhThuc = "xettuyen";
          }

        });
        // this.model.NguyenVongs[i].ThuTuNguyenVong = i;
        this.model.NguyenVongs[i].CotDiems = CotDiems;

        this.taoDanhSachCotDiem();
      }
      , error => {
        this.openSnackBar('Không lấy được Cột điểm', 1);
      }
    )
  }

  isValidData(): any {
    let valid: boolean = true;


    if ((this.model.ThiSinh.HoLot == null || this.model.ThiSinh.HoLot.trim() == '')) {
      this.openSnackBar('Vui lòng nhập Họ lót', 1);
      valid = false;
      return;
    }

    if ((this.model.ThiSinh.Ten == null || this.model.ThiSinh.Ten.trim() == '')) {
      this.openSnackBar('Vui lòng nhập Tên', 1);
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

    // if (this.model.ThiSinh.DiaChiThuongTru == null || this.model.ThiSinh.DiaChiThuongTru.trim() == '') {

    //   this.openSnackBar('Vui lòng nhập Địa chỉ thường trú', 1);
    //   valid= false;
    //   return;
    // }

    // if (this.model.ThiSinh.TinhThanhThuongTru == null) {

    //   this.openSnackBar('Vui lòng nhập chọn Tỉnh thành thường trú', 1);
    //   valid= false;
    //   return;
    // }

  

    if (!this.isObject(this.model.ThiSinh.TinhThanhThuongTru) || this.isObjectEmpty(this.model.ThiSinh.TinhThanhThuongTru) || this.model.ThiSinh.TinhThanhThuongTru.Ten.trim() == '') {

      this.openSnackBar('Vui lòng tìm và chọn tỉnh thành thường trú', 1);
      valid = false;
      return;
    }

  
    
    if (!this.isObject(this.model.ThiSinh.QuanHuyenThuongTru) || this.isObjectEmpty(this.model.ThiSinh.QuanHuyenThuongTru) || this.model.ThiSinh.QuanHuyenThuongTru.Ten.trim() == '') {

      this.openSnackBar('Vui lòng tìm và chọn quận huyện thường trú', 1);
      valid = false;
      return;
    }

    if (!this.isObject(this.model.ThiSinh.PhuongXaThuongTru) || this.isObjectEmpty(this.model.ThiSinh.PhuongXaThuongTru) || this.model.ThiSinh.PhuongXaThuongTru.Ten.trim() == '') {

      this.openSnackBar('Vui lòng tìm và chọn phường xã thường trú', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.DiaChiLienLac == null || this.model.ThiSinh.DiaChiLienLac.trim() == '') {

      this.openSnackBar('Vui lòng nhập Địa chỉ liên lạc', 1);
      valid = false;
      return;
    }


    if (!this.isObject(this.model.ThiSinh.TinhThanhTamTru) || this.isObjectEmpty(this.model.ThiSinh.TinhThanhTamTru) || this.model.ThiSinh.TinhThanhTamTru.Ten.trim() == '') {

      this.openSnackBar('Vui lòng tìm và chọn tỉnh thành tạm trú', 1);
      valid = false;
      return;
    }

  
    
    if (!this.isObject(this.model.ThiSinh.QuanHuyenTamTru) || this.isObjectEmpty(this.model.ThiSinh.QuanHuyenTamTru) || this.model.ThiSinh.QuanHuyenTamTru.Ten.trim() == '') {

      this.openSnackBar('Vui lòng tìm và chọn quận huyện tạm trú', 1);
      valid = false;
      return;
    }

    if (!this.isObject(this.model.ThiSinh.PhuongXaTamTru) || this.isObjectEmpty(this.model.ThiSinh.PhuongXaTamTru) || this.model.ThiSinh.PhuongXaTamTru.Ten.trim() == '') {

      this.openSnackBar('Vui lòng tìm và chọn phường xã tạm trú', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.DiaChiLienLacTamTru == null || this.model.ThiSinh.DiaChiLienLacTamTru.trim() == '') {

      this.openSnackBar('Vui lòng nhập Địa chỉ liên lạc tạm trú', 1);
      valid = false;
      return;
    }




    if (!this.isObject(this.model.ThiSinh.TruongTHPT12) || this.isObjectEmpty(this.model.ThiSinh.TruongTHPT12) || this.model.ThiSinh.TruongTHPT12.Ten.trim() == '') {

      this.openSnackBar('Vui lòng nhập trường THPT', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.TruongTHPT12MaTinh == null || this.model.ThiSinh.TruongTHPT12MaTinh.trim() == '') {

      this.openSnackBar('Vui lòng nhập mã tỉnh lớp 12', 1);
      valid = false;
      return;
    }

    if (this.model.ThiSinh.TruongTHPT12MaTruong == null || this.model.ThiSinh.TruongTHPT12MaTruong.trim() == '') {

      this.openSnackBar('Vui lòng nhập mã trường lớp 12', 1);
      valid = false;
      return;
    }





    // if (this.model.ThiSinh.MaVachThiTHPTQG == null || this.model.ThiSinh.MaVachThiTHPTQG.trim() == '') {

    //   this.openSnackBar('Vui lòng nhập mã vạch', 1);
    //   valid= false;
    //   return;
    // }
    // if (this.model.ThiSinh.SoBaoDanhThiTHPTQG == null || this.model.ThiSinh.SoBaoDanhThiTHPTQG.trim() == '') {

    //   this.openSnackBar('Vui lòng nhập số báo danh thi THPTQG', 1);
    //   valid= false;
    //   return;
    // }


    for (let i = 0; i < this.model.NguyenVongs.length; i++) {
      const e = this.model.NguyenVongs[i];
      if (!this.isObject(e.NganhDaoTao) || this.isObjectEmpty(e.NganhDaoTao) || e.NganhDaoTao == null) {
        this.openSnackBar('Vui lòng chọn nguyện vọng', 1);
        valid = false;
        return;
      }


     if( this._dotTuyenSinh.HinhThucXetTuyenId == 14 && e.CotDiems.filter(t=>t.LoaiHinhThuc=="duthi").length<2)
     {
         this.openSnackBar('#307 Nguyện vọng '+e.NganhDaoTao.Ten+' bắt buộc phải có ít nhất 2 môn dự thi', 1);
         valid = false;
         return;
     }
    }

    if (this.model.KhaoSatId == null) {

      this.openSnackBar('Vui lòng chọn khảo sát', 1);
      valid = false;
      return;
    }


    return valid;


  }


  onRegisterClick() {


    this.onGetValueFormControl();

     // Set lại bảng điểm cho các trường hợp nhập bảng điểm trên giao diện gộp lại không theo từng nguyện vọng
     if (this._dotTuyenSinh.HinhThucXetTuyenId != 14) // 14: thi năng lực
     this.setBanDiem();

    if (!this.isValidData()) return false;

    debugger;
    if (this._dotTuyenSinh.ChoPhepUploadHoSo) {
      if (!this.IsUpload()) return false;
    }


    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = this._dotTuyenSinh.HinhThucXetTuyen.Loai;
    this.model.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId; //ktra lai





    if (this.CMNDDaCo(this.model.ThiSinh.CMND)) { this.openSnackBar('CMND này đã được đăng ký. Vui lòng đăng nhập để đăng ký!', 1); return; }


    if (!this.CheckThuTuNguyenVongHopLe(this.model.NguyenVongs)) return;


   




    //Khóa nút save để người dùng không bấm nút này thêm, sau khi đã bấm
    this.btnSaveDisable = true;



    /* #region  Gán giá trị để tạo biên nhận, xem code c# chỗ tạo biên nhận để biết tạo mẫu nào */
    // if (this._dotTuyenSinh.HinhThucXetTuyenId == 12) //12Năng lực
    //   this.model.LoaiBienNhan = "xettuyen_ketquanangluc";
    // else {
    //   //   11: học bạ
    //   //  ,19 :  học bạ cả năm 12
    //   //  ,21 : THPTQG
    // }
    /* #endregion */

    if (this._dotTuyenSinh.HinhThucXetTuyenId == 14)
    this.model.LoaiBienNhan ="phieudiem_tuyensinh";

    
   // this.btnSaveDisable = true;
    this._hoSoXetTuyenService.create(this.model).subscribe(
      success => {
        debugger;

        console.log("su", success.UrlBienNhan);
        let LinkInBienNhan = success.UrlBienNhan;// `${this.serviceUrl}/reports/ExportPDF?hosoxettuyenid=${success.Id}`;
        this.model = success;
        var item = { TenDangNhap: success.ThiSinh.TenDangNhap, MatKhau: success.ThiSinh.MatKhau, NoiDungThongBao: this._dotTuyenSinh.NoiDungThongBao, LinkInBienNhan: LinkInBienNhan };
        if (!this.IsGiaoDienTrongAdmin) // không phải là trong giao diện admin
          this.openDialog(item);
        console.log(success);
        this.openSnackBar('Đã đăng ký xét tuyển thành công', 2);
       // this.router.navigateByUrl(this.url + success.Id + '/' + this._dotTuyenSinhIdRouter);
        this.btnSaveDisable = false;
      }, error => {
        this.btnSaveDisable = false;
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
      });

  }

  onSaveClick() {

    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = "nhapdiem";
    this.model.Id = Number.parseInt(this._hoSoXetTuyenIdRouter);



    this.onGetValueFormControl();

      // Set lại bảng điểm cho các trường hợp nhập bảng điểm trên giao diện gộp lại không theo từng nguyện vọng
      if (this._dotTuyenSinh.HinhThucXetTuyenId != 14) // 14: thi năng lực
      this.setBanDiem();


    if (!this.isValidData()) return false;

    if (this._dotTuyenSinh.ChoPhepUploadHoSo) {
      if (!this.IsUpload()) return false;
    }

    if (!this.CheckThuTuNguyenVongHopLe(this.model.NguyenVongs)) return;


  




    //Khóa nút save để người dùng không bấm nút này thêm, sau khi đã bấm
    this.btnSaveDisable = true;



    this._hoSoXetTuyenService.update(this.model).subscribe(
      () => {
        this.openSnackBar('Đã cập nhật xét tuyển thành công', 2);
        this.btnSaveDisable = false;
      }, error => {
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
        this.btnSaveDisable = false;
      });
  }


}

/* #endregion */




