import { Component, OnInit, ViewEncapsulation, ElementRef, HostBinding, Inject, ViewChild, Pipe, PipeTransform, Directive, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef, AfterContentInit, Host, Self, Renderer2 } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, FormControl, AbstractControl, Validators, FormArray, FormControlName, NgControl } from '@angular/forms';
import { KhuVucUuTien } from '../../Models/KhuVucUuTien.model';
import { FormXetTuyenService } from './form-xet-tuyen.service';
import { DoiTuongUuTien } from '../../Models/DoiTuongUuTien.model';
import { NganhDaoTao } from '../../Models/NganhDaoTao.model';
import { NganhDaoTaoService } from '../../nganh-dao-tao/nganh-dao-tao.service';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar, MatRadioModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MatAutocomplete, MatPaginator, MatAutocompleteTrigger, MatAutocompleteSelectedEvent, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRadioChange } from '@angular/material';
import { CotDiemService } from '../../cot-diem/cot-diem.service';
import { KhaoSat } from '../../Models/KhaoSat.model';
import { KhaoSatService } from '../../khao-sat/khao-sat.service';
import { HoSoXetTuyenService } from '../../ho-so-xet-tuyen/ho-so-xet-tuyen.service';
import { QuanHuyenService } from '../../quan-huyen/quan-huyen.service';
import { QuanHuyen } from '../../Models/QuanHuyen.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DotTuyenSinhService } from '../../dot-tuyen-sinh/dot-tuyen-sinh.service';
import { DotTuyenSinh } from '../../Models/DotTuyenSinh.model';
import { Location } from '@angular/common';
import { HoSoXetTuyen } from '../../Models/HoSoXetTuyen.model';
import { NguyenVong } from '../../Models/NguyenVong.model';
import { ThiSinh } from '../../Models/ThiSinh.model';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { CotDiem } from '../../Models/CotDiem.model';
import { RegExpClass } from 'app/core/validation';
import { TruongThptService } from '../../truong-thpt/truong-thpt.service';
import { TruongTHPT } from '../../Models/TruongTHPT.model';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../date.adapter';

import { MomentDateAdapter, MOMENT_DATE_FORMATS } from 'app/MomentDateAdapter';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ThiSinhService } from '../../thi-sinh/thi-sinh.service';
import { GiayTo } from '../../Models/GiayTo.model';
import { UploadFilesService } from '../../upload-files/upload-files.service';
import { saveAs } from 'file-saver'
import { DomSanitizer } from '@angular/platform-browser'
import { HeDaoTaoService } from '../../he-dao-tao/he-dao-tao.service';
import { HeDaoTao } from '../../Models/HeDaoTao.model';
//import { saveAs } from 'file-saver'
import { environment } from 'environments/environment';
import { TinhThanh } from '../../Models/TinhThanh.model';
import { DanToc } from '../../Models/DanToc.model';
import { debounceTime, tap, switchMap, finalize, startWith, exhaustMap, scan, takeWhile, takeUntil, filter, map } from 'rxjs/operators';
import { Subject, Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { ChungChi } from '../../Models/ChungChi.model';
import { DanTocService } from '../../dan-toc/dan-toc.service';
import { DoiTuong3tService } from '../../doi-tuong3t/doi-tuong3t.service';
import { DoiTuong3T } from '../../Models/DoiTuong3T.model';



/* #region  Class Base */

@Component({
  selector: 'app-form-xet-tuyen',
  templateUrl: './form-xet-tuyen.component.html',
  styleUrls: ['./form-xet-tuyen.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  // providers: [
  //   {
  //     provide: DateAdapter, useClass: AppDateAdapter
  //   },
  //   { provide: MAT_DATE_LOCALE, useValue: MOMENT_DATE_FORMATS },
  //   {
  //     provide: MAT_DATE_FORMATS, useValue: { useUtc: true }
  //   }]

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi' }, { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS }, { provide: DateAdapter, useClass: MomentDateAdapter }]
}
)
export class BaseFormXetTuyenComponent implements OnInit {
  signupForm: FormGroup;
  genders = ['Nam', 'Nữ'];
  khuVucUuTiens: KhuVucUuTien[] = [];
  doiTuongUuTiens: DoiTuongUuTien[] = [];
  nganhDaoTaos: Array<NganhDaoTao> = new Array<NganhDaoTao>();
  chuyenNganhDaoTaos: Array<NganhDaoTao> = new Array<NganhDaoTao>();
  serviceUrl: string = environment.urlApi;
  tinhThanhPhos: Array<QuanHuyen> = [];
  quanHuyens: Array<QuanHuyen> = [];
  quanHuyenTamTrus: Array<QuanHuyen> = [];
  phuongXas: Array<QuanHuyen> = [];
  phuongXaTamTrus: Array<QuanHuyen> = [];
  danTocs: Array<DanToc> = [];
  khaoSats: Array<KhaoSat> = [];
  giaytoyeucauid = null;
  heDaoTaos: Array<HeDaoTao> = [];
  doiTuong3Ts: Array<DoiTuong3T> = [];

  btnSaveDisable: boolean = false;
  filterNganhDaoTao: string = null;
  bienTam = {
    _choPhepChonChuyenNganh: false
  }

  fileModel: any = null;


  IsGiaoDienTrongAdmin: boolean = false;

  IsEdit: boolean = true;

  loaiHinhThucs = [{ Id: 'xettuyen', Ten: 'Xét tuyển' }, { Id: 'duthi', Ten: 'Dự thi' }];

  XepLoais = [{ Id: 'Xuất sắc', Ten: 'Xuất sắc' }, { Id: 'Giỏi', Ten: 'Giỏi' }, { Id: 'Khá', Ten: 'Khá' }, { Id: 'Trung bình', Ten: 'Trung bình' }];

  HanhKiems = ['Tốt', 'Khá', 'Trung bình', 'Yếu'];

  HocLucs = ['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu'];


  truongTHPTs = [];
  truongCDDHs = [];
  dsNganhDaoTaos: NganhDaoTao[];
  doniLienKets = [];
  url: string = '';
  maHoSoSearch: string = '';
  @ViewChild('f')
  f: NgForm;
  @ViewChild('fileInput')
  fileInput: ElementRef;

  cotDiemService = [];

  _dotTuyenSinhIdRouter: string;
  _hoSoXetTuyenIdRouter: string;
  _dotTuyenSinh: DotTuyenSinh = new DotTuyenSinh();
  regExpClass = RegExpClass;

  mmyyyyMask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };


  ddmmyyyyMask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  model: HoSoXetTuyen = new HoSoXetTuyen();



  constructor(protected _formXetTuyenService: FormXetTuyenService
    , protected _quanHuyenService: QuanHuyenService
    , protected _khaoSatService: KhaoSatService

    , protected _truongThptService: TruongThptService

    , protected _nganhDaoTaoService: NganhDaoTaoService
    , protected _cotDiemService: CotDiemService
    , protected _hoSoXetTuyenService: HoSoXetTuyenService
    , protected _dotTuyenSinhService: DotTuyenSinhService
    , protected _thiSinhService: ThiSinhService


    , protected activatedRoute: ActivatedRoute
    , protected _matSnackBar: MatSnackBar
    , public _location: Location
    , protected router: Router
    , protected _matDialog: MatDialog
    , private _uploadService: UploadFilesService
    , private _domSanitizer: DomSanitizer
    , private _heDaoTaoService: HeDaoTaoService
    , protected _formBuilder: FormBuilder
    , protected _danTocService: DanTocService
    , protected _doiTuong3TService: DoiTuong3tService

  ) {

    this._hoSoXetTuyenIdRouter = this.activatedRoute.snapshot.params['id'];

    //xác định id hồ sở trên url để biết sửa thay thêm mới
    debugger;
    if (this._hoSoXetTuyenIdRouter == 'null' || typeof (this._hoSoXetTuyenIdRouter) == 'undefined')
      this.IsEdit = false;


    // this._dotTuyenSinhIdRouter = this.activatedRoute.snapshot.paramMap.get('dotTuyenSinhId');
    this._dotTuyenSinhIdRouter = this.activatedRoute.snapshot.params['dotTuyenSinhId'];
    // alert(this._hoSoXetTuyenIdRouter);
    this._dotTuyenSinhService.single(Number(this._dotTuyenSinhIdRouter)).pipe()
      .subscribe(result => {
        this._dotTuyenSinh = new DotTuyenSinh(result);
        console.log('dottuyensinh', result);
        let url = window.location.pathname.toLowerCase().split('/');
        let hinhThucXetTuyenIdRouter = url[url.length - 3];

        this.IsGiaoDienTrongAdmin = window.location.pathname.toLowerCase().indexOf('admin') >= 0;

        //if(window.location.pathname.toLowerCase().indexOf('/admission') < 0)
        if (this._dotTuyenSinh.HinhThucXetTuyen.Loai != hinhThucXetTuyenIdRouter) {
          if (window.location.pathname.toLowerCase().indexOf('admission') >= 0) {
            this.router.navigateByUrl('/admission/dot-tuyen-sinh/quan-ly');
          }
          else
            this.router.navigateByUrl('tuyen-sinh');
        }

      }, error => {
        debugger;
        this.openSnackBar("Không lấy được đợt tuyển sinh", 1);
      })
      ;
    //this.loadData();
  }

  ngOnInit() {



    this.loadData();
  }

  handleKeyupEnter(event) {
    console.log(event)
    if (event.code == "Enter" || event.keyCode == 13)
      return false;
  }

  onChanged(event) {
  }

  selectionChanged(event) {
    console.log(event);
  }

  //autocomplete



  // //cap:THPT,DH,CD,TC,ĐHCL: có thể trường nhiều cấp, cách nhau bởi dấu ","
  // autoCompleteTruong(txtSearch: FormControl, cap: string, tinhThanhMa:String,quanHuyenMa:string) {

  //   // Note: listen for search text changes
  //   const filter$ = txtSearch.valueChanges
  //     // .get('searchText')
  //     .pipe(
  //       startWith(''),
  //       debounceTime(200),
  //       // Note: If the option valye is bound to object, after selecting the option
  //       // Note: the value will change from string to {}. We want to perform search 
  //       // Note: only when the type is string (no match)
  //       filter(q => typeof q === "string"));


  //   // Note: There are 2 stream here: the search text changes stream and the nextPage$ (raised by directive at 80% scroll)
  //   // Note: On every search text change, we issue a backend request starting the first page
  //   // Note: While the backend is processing our request we ignore any other NextPage emitts (exhaustMap).
  //   // Note: If in this time the search text changes, we don't need those results anymore (switchMap)
  //   return filter$.pipe(
  //     switchMap(filter => {
  //       //Note: Reset the page with every new seach text
  //       let currentPage = 1;
  //       return this.autoCompleteNextPage$.pipe(
  //         startWith(currentPage),
  //         //Note: Until the backend responds, ignore NextPage requests.
  //         exhaustMap(_ => this._truongThptService.SearchAsync(cap, filter,tinhThanhMa,quanHuyenMa, currentPage)),
  //         tap(() => currentPage++),
  //         //Note: This is a custom operator because we also need the last emitted value.
  //         //Note: Stop if there are no more pages, or no results at all for the current search text.
  //         takeWhile(p => p.length > 0),
  //         scan((allTruongs, newTruongs) => allTruongs.concat(newTruongs), []),
  //       );
  //     }));//.subscribe(users =>  users);; // Note: We let asyncPipe subscribe.

  //   //end autocomplete
  // }




  //end autocomplete

  CMNDDaCo(cmnd: string): Boolean {

    this._thiSinhService.singleByCMND(cmnd).subscribe(
      success => {
        if (success != null) {
          // this.openSnackBar('CMND này đã được đăng ký tài khoản. Vui lòng đăng nhập để đăng ký!', 1);
          return true;
        }
        else {
          return false;
        }
      },
      error => {
        return false;
      }
    )
    return false;
  }

  isObjectEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  isObject(obj) {
    return typeof obj === 'object';
  }

  IsUpload() {
    let isUpload = true;
    let namefile = "";
    this.model.GiayToYeuCaus.forEach(function (element, index) {
      if (element.IsBatBuoc) {
        if (element.FileDinhKem == null) {
          // this.openSnackBar('Vui lòng Upload '+element.Ten, 1);
          namefile = element.Ten;
          isUpload = false;
          return isUpload;
        }
        else {
          if (element.FileDinhKem.Path == null || element.FileDinhKem.Path == '') {
            // this.openSnackBar('Vui lòng Upload '+element.Ten, 1);
            namefile = element.Ten;
            isUpload = false;
            return isUpload;
          }
        }
      }
    });
    if (!isUpload) {
      this.openSnackBar('Vui lòng Upload ' + namefile, 1);
    }
    return isUpload;
  }

  kiemTraCMND(): Boolean {
    let cmnd = this.model.ThiSinh.CMND;
    this._thiSinhService.singleByCMND(cmnd).subscribe(
      success => {
        if (success != null) {
          this.openSnackBar('CMND này đã được đăng ký tài khoản. Vui lòng đăng nhập để đăng ký!', 1);
          return false;
        }
        else {
          return true;
        }
      },
      error => {
        this.openSnackBar('Không kiểm tra được CMND', 1);
        return false;
      }
    )
    return true;
  }
  // kiemTraCMND(): Boolean {
  //   if (this._hoSoXetTuyenIdRouter == 'null') {
  //     let cmnd = this.model.ThiSinh.CMND;
  //     this._thiSinhService.singleByCMND(cmnd).subscribe(
  //       success => {
  //         if (success != null) {
  //           this.model.ThiSinh = success;
  //           if (this.model.ThiSinh.TinhThanhId != null) {
  //             this.onChangeTinhThanhPho(this.model.ThiSinh.TinhThanhId);
  //           }
  //           if (this.model.ThiSinh.QuanHuyenId != null) {
  //             this.onChangeQuanHuyen(this.model.ThiSinh.QuanHuyenId);
  //           }
  //           if (this.model.ThiSinh.TinhThanhTamTruId != null) {
  //             this.onChangeTinhThanhPhoTamTru(this.model.ThiSinh.TinhThanhTamTruId);
  //           }
  //           if (this.model.ThiSinh.QuanHuyenTamTruId != null) {
  //             this.onChangeQuanHuyenTamTru(this.model.ThiSinh.QuanHuyenTamTruId);
  //           }
  //         }
  //       },
  //       error => {
  //         this.openSnackBar('Không kiểm tra được CMND', 1);
  //       }
  //     )
  //   }
  //   return true;
  // }

  SetData(hosoxettuyen) {
    this.model = new HoSoXetTuyen(hosoxettuyen);
    
    console.log('HoSo model', this.model);
    debugger;
    //Khởi tạo một nguyện vọng đầu tiên
    if (this.model.NguyenVongs.length == 0) {
      let nguyenVong: NguyenVong = new NguyenVong();
      nguyenVong.ThuTuNguyenVong = 1;
      this.model.NguyenVongs.push(nguyenVong);
    }

    if (hosoxettuyen.ThiSinh) {
      if (hosoxettuyen.ThiSinh.TinhThanhId != null) {
        this.onChangeTinhThanhPho(hosoxettuyen.ThiSinh.TinhThanhId);

      }
      if (hosoxettuyen.ThiSinh.QuanHuyenId != null) {
        this.onChangeQuanHuyen(hosoxettuyen.ThiSinh.QuanHuyenId);
      }
      if (hosoxettuyen.ThiSinh.TinhThanhTamTruId != null) {
        this.onChangeTinhThanhPhoTamTru(hosoxettuyen.ThiSinh.TinhThanhTamTruId);
      }
      if (hosoxettuyen.ThiSinh.QuanHuyenTamTruId != null) {
        this.onChangeQuanHuyenTamTru(hosoxettuyen.ThiSinh.QuanHuyenTamTruId);
      }
    }

  }


  async loadData(isWait: boolean = false) {


    // this.loadDoiTuongUuTien();
    // this.loadNganhDaoTaos();
    // this.loadKhaoSat();
    // this.loadTinhThanhPho();
    // this.loadTruongTHPT();

    // this.loadHeDaoTao();

    let res = await Promise.all(
      [this.loadKhuVucUuTien()
        , this.loadDoiTuongUuTien()
        , this.loadNganhDaoTaos()
        , this.loadChuyenNganhDaoTaos()
        , this.loadKhaoSat()
        , this.loadTinhThanhPho()
        , this.loadTruongTHPT()
        , this.loadHeDaoTao()
        , this.loadDanToc()
        , this.loadTruongCDDH()
        , this.loadDoiTuong3T()
        , this.loadDonViLienKet()
        , this.loadDSNganhDaoTaos()
      ]);




    if (!isWait) {
      this._hoSoXetTuyenService.singleAsync(this._hoSoXetTuyenIdRouter != 'null' ? Number.parseInt(this._hoSoXetTuyenIdRouter) : null, this._dotTuyenSinhIdRouter != 'null' ? Number.parseInt(this._dotTuyenSinhIdRouter) : null).then(
        success => {
          this.SetData(success);
          success.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId;

        }
      ).then(error => {
        this.openSnackBar(error, 1);

        this.router.navigateByUrl("tuyen-sinh");
      })
    }
    else {
      await this._hoSoXetTuyenService.singleAsync(this._hoSoXetTuyenIdRouter != 'null' ? Number.parseInt(this._hoSoXetTuyenIdRouter) : null, this._dotTuyenSinhIdRouter != 'null' ? Number.parseInt(this._dotTuyenSinhIdRouter) : null).then(
        success => {
          this.SetData(success);
          success.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId;
        }

      ).catch(error => {
        debugger;
        if (error.error)
          this.openSnackBar(error.error.Message, 1);

        this.router.navigateByUrl("tuyen-sinh");

      })
    }
  }


  loadKhuVucUuTien() {
    this._formXetTuyenService.getAllPriorAreasAsync().then((khuVucUuTienArr: KhuVucUuTien[]) => {
      this.khuVucUuTiens = khuVucUuTienArr;
      this.khuVucUuTiens.forEach(element => {
        element.Ten = element.MaKhuVucUuTien + " - " + element.Ten;
      });
    }).catch(
      () => {
        this.openSnackBar('Không lấy được danh sách Khu vực ưu tiên', 1);
      }
    );
  }
  loadDSNganhDaoTaos(){
    this._nganhDaoTaoService.allAsync(null,null,"NhomChaId is null","Ten ASC").then(dsNganhs => {
      this.dsNganhDaoTaos = dsNganhs;
      this.dsNganhDaoTaos.forEach(element => {
        // if(element.Id == this.model.ThiSinh.NganhDHCD)
        // alert(element.Ten)
        element.Ten = element.NganhId + " - " + element.Ten;
      })
    }).catch(()=>{
      this.openSnackBar('Không lấy được các ngành',1);
    });
  }
  loadDanToc() {
    this._danTocService.allAsync().then((danhTocs: DanToc[]) => {
      this.danTocs = danhTocs;

    }).catch(
      () => {
        this.openSnackBar('Không lấy được danh sách dân tộc', 1);
      }
    );
  }

  loadDoiTuong3T() {
    this._doiTuong3TService.allAsync().then((doiTuong3Ts: DoiTuong3T[]) => {
      this.doiTuong3Ts = doiTuong3Ts;

    }).catch(
      () => {
        this.openSnackBar('Không lấy được danh sách dân tộc', 1);
      }
    );
  }


  loadDoiTuongUuTien() {
    this._formXetTuyenService.getAllPriorObjsAsync().then((doiTuongUuTienArr: DoiTuongUuTien[]) => {
      this.doiTuongUuTiens = doiTuongUuTienArr;
      this.doiTuongUuTiens.forEach(element => {
        element.Ten = element.MaDoiTuongUuTien + " - " + element.Ten;
      });
    }).catch(
      () => {
        this.openSnackBar('Không lấy được danh sách đối tượng ưu tiên', 1);
      }
    );
  }


  loadNganhDaoTaos() {
    this._nganhDaoTaoService.getNganhDaoTaoByDotTuyenSinhIdAsync(this._dotTuyenSinhIdRouter, null)
      .then(nganhDaoTaos => {
        console.log('in')
        console.log('nganhdaotao 446', nganhDaoTaos);
        this.nganhDaoTaos = nganhDaoTaos;
        this.nganhDaoTaos.forEach(element => {
          element.Ten = element.NganhId + " - " + element.Ten;
        });
      }).catch(() => {
        this.openSnackBar('Không lấy được danh sách Ngành đào tạo', 1);
      });
  }

  loadChuyenNganhDaoTaos() {
    this._nganhDaoTaoService.getNganhDaoTaoByDotTuyenSinhIdAsync(this._dotTuyenSinhIdRouter, 'NhomChaId is not null')
      .then(nganhDaoTaos => {

        this.chuyenNganhDaoTaos = nganhDaoTaos;
        this.chuyenNganhDaoTaos.forEach(element => {
          element.Ten = element.NganhId + " - " + element.Ten;
        });
      }).catch(() => {
        this.openSnackBar('Không lấy được danh sách chuyên ngành đào tạo', 1);
      });
  }

  loadTinhThanhPho() {
    // this._quanHuyenService.GetDSTheoCapAsync('tinhthanhpho', 0)
    this._quanHuyenService.allAsync(undefined, undefined, `ChaId=1`, 'Ten')
      .then(quanhuyens => {
        this.tinhThanhPhos = quanhuyens;
        console.log(this.tinhThanhPhos);
      }, () => {
        this.openSnackBar('Không lấy được danh sách Tỉnh/Thành phố', 1);
      });
  }

  loadKhaoSat() {
    this._khaoSatService.allAsync().then(
      success => {
        this.khaoSats = success;
      }).catch(() => {
        this.openSnackBar('Không lấy được thông tin khảo sát', 1);
      });
  }

  // loadDanToc() {
  //   debugger;
  //   this._formXetTuyenService.getAllDanTocsAsync().then((danTocArr: DanToc[]) => {
  //     this.danTocs = danTocArr;
  //     this.danTocs.forEach(element => {
  //       element.Ten = element.Ten;
  //     });
  //   }).catch(
  //     () => {
  //       this.openSnackBar('Không lấy được danh sách Khu vực ưu tiên', 1);
  //     }
  //   );
  // }


  /* #region  load trường THPT */
  loadTruongTHPT() {
    this._truongThptService.pageAsync('', '', `Loai = 'thpt'`, 'Id asc', 0, 30000).then(
      success => {

        this.truongTHPTs = success.body as TruongTHPT[];
        this.truongTHPTs.forEach(element => {
          element.Ten = (element.MaTruong != null ? element.MaTruong + " - " : '') + element.Ten;
        });
      }).catch(() => {
        this.openSnackBar('Không lấy được thông tin trường THPT', 1);
      });
  }
  /* #endregion */
  
  loadTruongCDDH() {
    debugger;
    this._truongThptService.pageAsync('', '', `Loai = 'CD' OR Loai = 'DH' OR Loai = 'TC'`, 'Id asc', 0, 30000).then(
      success => {

        this.truongCDDHs = success.body as TruongTHPT[];
        this.truongCDDHs.forEach(element => {
          element.Ten = (element.MaTruong != null ? element.MaTruong + " - " : '') + element.Ten;
        });
      }).catch(() => {
        this.openSnackBar('Không lấy được thông tin trường CĐ-ĐH', 1);
      });
  }

  loadDonViLienKet() {
    debugger;
    this._truongThptService.pageAsync('', '', `Loai = 'DVLK'`, 'Id asc', 0, 30000).then(
      success => {

        this.doniLienKets = success.body as TruongTHPT[];
        this.doniLienKets.forEach(element => {
          element.Ten = (element.MaTruong != null ? element.MaTruong + " - " : '') + element.Ten;
        });
      }).catch(() => {
        this.openSnackBar('Không lấy được thông tin trường CĐ-ĐH', 1);
      });
  }

  loadHeDaoTao() {
    this._heDaoTaoService.allAsync().then(
      success => {

        this.heDaoTaos = success;
      }).catch(() => {
        this.openSnackBar('#377 Không lấy được hệ đào tạo', 1);
      });
  }

  onChangeTinhThanhPho(Id) {
    this.quanHuyens = [];
    this.phuongXas = [];
    if (Id != null) {
      // this._quanHuyenService.GetDSTheoCapAsync('quanhuyen', Id)
      this._quanHuyenService.allAsync(undefined, undefined, `ChaId = ${Id}`, 'Ten')
        .then(quanhuyens => {
          this.quanHuyens = <Array<QuanHuyen>>quanhuyens;
        }, () => {
          this.openSnackBar('#389 Thay đổi tỉnh thành lỗi', 1);
        });
    }
  }
  onChangeTinhThanhPhoTamTru(Id) {
    this.quanHuyenTamTrus = [];
    this.phuongXaTamTrus = [];
    if (Id != null) {
      // this._quanHuyenService.GetDSTheoCapAsync('quanhuyen', Id)
      this._quanHuyenService.allAsync(undefined, undefined, `ChaId = ${Id}`, 'Ten')
        .then(quanhuyens => {
          this.quanHuyenTamTrus = <Array<QuanHuyen>>quanhuyens;
        }).catch(() => {
          this.openSnackBar('#401 Thay đổi tỉnh thành lỗi', 1);
        });
    }
  }

  // set lại cột điểm cho từng nguyện vọng, trường hợp giao diện bảng điểm gộp chung lại không không đi theo nguyện vọng
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
        this.openSnackBar('thứ tự nguyện vọng phải liên tục 1,2,3,...', 1);
        return false;
      }

      min++;
    }
    return true;


  }

  //gắn địa chỉ tạm trú giống địa chỉ thường trú
  onChangeDiaChiTamTru(event) {
    if (event.checked == true) {
      this.model.ThiSinh.TinhThanhTamTruId = this.model.ThiSinh.TinhThanhId;

      this.quanHuyenTamTrus = this.quanHuyens;
      this.model.ThiSinh.QuanHuyenTamTruId = this.model.ThiSinh.QuanHuyenId;

      this.phuongXaTamTrus = this.phuongXas;
      this.model.ThiSinh.PhuongXaTamTruId = this.model.ThiSinh.PhuongXaId;
      this.model.ThiSinh.DiaChiLienLacTamTru = this.model.ThiSinh.DiaChiLienLac;
    }
  }


  onChangeQuanHuyen(Id) {
    this.phuongXas = [];
    if (Id != null) {
      // this._quanHuyenService.GetDSTheoCap('phuongxa', Id)
      this._quanHuyenService.allAsync(undefined, undefined, `ChaId = ${Id}`, 'Ten')
        .then(phuongxa => {
          this.phuongXas = <Array<QuanHuyen>>phuongxa;
        });
    }
  }

  onChangeQuanHuyenTamTru(Id) {
    this.phuongXaTamTrus = [];
    if (Id != null) {
      // this._quanHuyenService.GetDSTheoCap('phuongxa', Id).pipe()
      this._quanHuyenService.allAsync(undefined, undefined, `ChaId = ${Id}`, 'Ten')
        .then(phuongxa => {
          this.phuongXaTamTrus = <Array<QuanHuyen>>phuongxa;
        });
    }
  }

  onChangeNguyenVong(i, value) {
    this._nganhDaoTaoService.getToHopCotDiemByNganhDaoTaoID(value, this._dotTuyenSinhIdRouter).subscribe(
      success => {

        this.model.NguyenVongs[i].TopHopCotDiems = success;
        this.model.NguyenVongs[i].CotDiems = [];
        this.model.NguyenVongs[i].ToHopCotDiemId = null;
        //this.onChange();
      }, () => {
        this.openSnackBar('Không lấy được tổ hợp điểm', 1);
      }
    )
  }

  getDanhSachToHopCotDiemTheoNguyenVong(i, value) {
    this._nganhDaoTaoService.getToHopCotDiemByNganhDaoTaoID(value, this._dotTuyenSinhIdRouter).subscribe(
      success => {
        this.model.NguyenVongs[i].TopHopCotDiems = success;
      }, () => {
        this.openSnackBar('Không lấy được Cột điểm', 1);
      }
    )
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
      }
      , error => {
        this.openSnackBar('Không lấy được Cột điểm', 1);
      }
    )
  }

  taoDanhSachCotDiem() {
    this.model.CotDiems = [];
    for (let i = 0; i < this.model.NguyenVongs.length; i++) {
      // this.model.NguyenVongs[i].ThuTuNguyenVong = i;
      const nguyenVong = this.model.NguyenVongs[i];
      for (let j = 0; j < nguyenVong.CotDiems.length; j++) {
        const cotDiem = nguyenVong.CotDiems[j];

        if (!this.model.CotDiems.find(item => item.Id == cotDiem.Id)) {
          this.model.CotDiems.push(cotDiem);
        }
      }
    }
    console.log(this.model.CotDiems);

    // //Gắn điểm 
    // for (let index = 0; index < this.cotDiemService.length; index++) {
    //   const element = this.cotDiemService[index];
    //   for (let index = 0; index < this.model.CotDiems.length; index++) {
    //     const e = this.model.CotDiems[index];
    //     if (e.Id == element.Id)
    //       this.model.CotDiems[index].Diem = element.Diem;
    //   }
    // }

  }

  onAddNguyenVong() {
    const nguyenVong = new NguyenVong();

    nguyenVong.ThuTuNguyenVong = this.tinhSoThuTuNguyenVongKhiBamNutThemNguyenVong();
    this.model.NguyenVongs.push(nguyenVong);
  }

  tinhSoThuTuNguyenVongKhiBamNutThemNguyenVong(): number {
    // lấy thứ tự phần tử cuối cùng của mãng + 1;

    this.model.NguyenVongs = this.model.NguyenVongs.sort((n1, n2) => n1.ThuTuNguyenVong > n2.ThuTuNguyenVong ? 1 : -1); //asc

    if (this.model.NguyenVongs.length !== 0)
      return this.model.NguyenVongs[this.model.NguyenVongs.length - 1].ThuTuNguyenVong + 1;
    else
      return 1;
  }

  onDeleteNguyenVongClick(i: number) {
    this.model.NguyenVongs.splice(i, 1);

    //this.onChange();
  }

  onChangekhaoSat(event) {
    // for (let i = 0; i < this.khaoSats.length; i++) {
    //   const element = this.khaoSats[i];
    //   if (element.Id == event.source.value) {
    //     this.model.KhaoSat.Ten = element.Ten;
    //     this.model.KhaoSat.Id = element.Id;
    //     this.model.KhaoSatString = element.Ten;
    //   }
    // }

  }

  parseToDatetime() {
    //this.model.ThiSinh.NgaySinh = new Date();
  }

  onRegisterClick() {

    console.log(this.model);

    this.parseToDatetime();
    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = this._dotTuyenSinh.HinhThucXetTuyen.Loai;
    this.model.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId; //ktra lai
    debugger;
    if (this.isValidData() == 0) {
      this.signupForm.markAsTouched()
      return;
    }

    if (this._dotTuyenSinh.HinhThucXetTuyenId == 2) {
      if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.MaTruongCDDH == '' ||
        this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.MaTruongCDDH == '') {
        this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
        return;
      }
    }
    let model = JSON.parse(JSON.stringify(this.model));

    let ngaySinh = new Date(model.ThiSinh.NgaySinh);
    model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
    model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);

    this.btnSaveDisable = true;

    this._hoSoXetTuyenService.create(model).subscribe(
      success => {
        let LinkInBienNhan = `${this.serviceUrl}/reports/ExportHoSoDangKyTuyenSinh?hsdangkytuyensinhid=${success.Id}`;
        var item = { TenDangNhap: success.ThiSinh.TenDangNhap, MatKhau: success.ThiSinh.MatKhau, NoiDungThongBao: this._dotTuyenSinh.NoiDungThongBao, LinkInBienNhan: LinkInBienNhan };
        if (!this.IsGiaoDienTrongAdmin) // không phải là trong giao diện admin
          this.openDialog(item);

        this.openSnackBar('Đã đăng ký xét tuyển thành công', 2);
        this.router.navigateByUrl(this.url + success.Id + '/' + this._dotTuyenSinhIdRouter);
        this.btnSaveDisable = false;
      }, error => {
        this.btnSaveDisable = false;
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
      });
  }
  copy(data: any) {
    let node;
    if (Array.isArray(data)) {
      node = data.length > 0 ? data.slice(0) : [];
      node.forEach((e, i) => {
        if (
          (typeof e === 'object' && e !== {}) ||
          (Array.isArray(e) && e.length > 0)
        ) {
          node[i] = this.copy(e);
        }
      });
    } else if (data && typeof data === 'object') {
      node = data instanceof Date ? data : Object.assign({}, data);
      Object.keys(node).forEach((key) => {
        if (
          (typeof node[key] === 'object' && node[key] !== {}) ||
          (Array.isArray(node[key]) && node[key].length > 0)
        ) {
          node[key] = this.copy(node[key]);
        }
      });
    } else {
      node = data;
    }
    return node;
  }
  onSaveClick() {

    var url = this._location.path();
    url = url.substring(0, url.lastIndexOf('/' + this._dotTuyenSinhIdRouter));
    url = url.substring(url.lastIndexOf('/') + 1, url.length);
    this.parseToDatetime();
    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = "nhapdiem";
    this.model.Id = Number.parseInt(this._hoSoXetTuyenIdRouter);

    if (this.isValidData() == 0) {
      return;
    }
    if (this._dotTuyenSinh.HinhThucXetTuyenId == 2) {
      if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.MaTruongCDDH == '' ||
        this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.MaTruongCDDH == '') {
        this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
        return;
      }
    }
    //var that = this;
    //let model =  Object.assign({}, this.model);
    //let model=this.copy(this.model);
    let model = JSON.parse(JSON.stringify(this.model));
    let ngaySinh = new Date(model.ThiSinh.NgaySinh);
    model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
    model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);
    console.log(model);
    this.btnSaveDisable = true;
    this._hoSoXetTuyenService.update(model).subscribe(
      () => {
        this.openSnackBar('Đã cập nhật xét tuyển thành công', 2);
        this.btnSaveDisable = false;
      }, error => {
        this.btnSaveDisable = false;
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
      });

  }

  onClearForm() {
    this._hoSoXetTuyenIdRouter = 'null';
    this.model = new HoSoXetTuyen();
    this.model.NguyenVongs.push(new NguyenVong());
    this.router.navigateByUrl('admission/dang-ky/admin/null/1/null/' + this._dotTuyenSinhIdRouter);

  }


  /**
    * Opens a snackbar with a message and an optional action.
    * @param title The message to show in the snackbar.
    * @param panelClass ex: 1 is error, 2 is success, 3 is warning, 4 is info,
    */
  openSnackBar(title, panelClass) {
    if (panelClass == 1) {
      this._matSnackBar.open(title, 'Lỗi', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 4000, panelClass: 'ErrorSnackbar'
      });
    }
    if (panelClass == 2) {
      this._matSnackBar.open(title, 'Thành công', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 4000, panelClass: 'SuccessSnackbar'
      });
    }
    if (panelClass == 3) {
      this._matSnackBar.open(title, 'Cảnh báo', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 4000, panelClass: 'WarningSnackbar'
      });
    }
    if (panelClass == 4) {
      this._matSnackBar.open(title, 'Thông tin', {
        verticalPosition: 'top', horizontalPosition: 'right',
        duration: 4000, panelClass: 'InfoSnackbar'
      });
    }
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

  isValidData(): any {
    let valid: boolean = true;


    if ((this.model.ThiSinh.HoLotVaTen == null || this.model.ThiSinh.HoLotVaTen.trim() == '')
    ) {

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

    if (this.model.ThiSinh.DiaChiLienLac == null || this.model.ThiSinh.DiaChiLienLac.trim() == '') {

      this.openSnackBar('Vui lòng nhập Địa chỉ liên lạc', 1);
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
        this.openSnackBar('Vui lòng chọn Ngành', 1);
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

  SearchMaHoSo() {
    //alert(this.maHoSoSearch);
    //  this.activatedRoute.
    debugger;

    this.openSnackBar('Chức năng này đang nâng cấp', 4);
    return false;

    var id = this.activatedRoute.snapshot.params['id'];

    console.log(this.router.url);
    this._hoSoXetTuyenService.getHoSoXetTuyenbyMaHoSo(this.maHoSoSearch, this._dotTuyenSinh.Id.toString()).subscribe(
      data => {

        // this.router.navigate()
        // this._location.go(this.url + `${data.Id}/${data.DotTuyenSinhId}`);

        //this._location.go(this.url + `${data.Id}/${data.DotTuyenSinhId}`);

        // this._hoSoXetTuyenIdRouter = data.Id.toString();

        // this._dotTuyenSinhIdRouter = data.DotTuyenSinhId.toString();
        // this._dotTuyenSinhService.single(Number(this._dotTuyenSinhIdRouter)).pipe()
        //   .subscribe(result => {
        //     debugger;
        //     this._dotTuyenSinh = result;
        //     let url = window.location.pathname.toLowerCase().split('/');
        //     let hinhThucXetTuyenIdRouter = url[url.length - 3];
        //     //if(window.location.pathname.toLowerCase().indexOf('/admission') < 0)
        //     if (this._dotTuyenSinh.HinhThucXetTuyenId != Number.parseInt(hinhThucXetTuyenIdRouter)) {
        //       if (window.location.pathname.toLowerCase().indexOf('admission') >= 0) {
        //         this.router.navigateByUrl('/admission/dot-tuyen-sinh/quan-ly');
        //       }
        //       else
        //         this.router.navigateByUrl('tuyen-sinh');
        //     }

        //   }, error => {
        //     this.openSnackBar("Không lấy được đợt tuyển sinh", 1);
        //   })
        //   ;
        // this.loadData();
        // this._matSnackBar.open('Đã hiển thị thông tin hồ sơ: ' + this.maHoSoSearch, 'OK', {
        //   verticalPosition: 'top', horizontalPosition: 'right',
        //   duration: 2000, panelClass: 'SuccessSnackbar'
        // });

      }, error => {
        this._matSnackBar.open('Không tìm thấy hồ sơ: ' + this.maHoSoSearch + '-' + error.error.message, 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
      }
    );
  }

  // onClickDinhKemTapTin() {
  //   this.fileInput.nativeElement.click();
  // }

  onClickFileURL(file: any) {

    window.open("//" + file.Path, "_blank");

    // console.log(file);
    // var idx = file.Path.indexOf('fileXTUpload');
    // if(idx != -1) {
    //   // var pathString = 'https://tuyensinhapi.scm.azurewebsites.net/dev/api/files/wwwroot/' + file.Path.substring(idx).replace(/\\/g, '/');
    //   // // alert(pathString);
    //   // window.open(pathString, "_blank");
    //   this._uploadService.downloadFileDinhKem(file.Path, file.FileType).subscribe(data => {
    //     debugger;
    //     console.log(data);

    //     saveAs(data, file.Ten);

    //     // var fileURL = URL.createObjectURL(data);
    //     // window.open(fileURL);

    //     // var urlCreator = window.URL;
    //     // return this._domSanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(data));

    //     // let url = window.URL.createObjectURL(data);
    //     //   let a = document.createElement('a');
    //     //   document.body.appendChild(a);
    //     //   a.setAttribute('style', 'display: none');
    //     //   a.href = url;
    //     //   a.download = data.FileName;
    //     //   a.click();
    //     //   window.URL.revokeObjectURL(url);
    //     //   a.remove();
    //   }, error => {
    //     console.log(error);
    //   });
    //}
  }

  // onClickDeleteFileDinhKem(filePath) {
  //   var idx = this.model.GiayTos.findIndex(t => t.Path == filePath);
  //   if(idx != -1) {
  //     this.model.GiayTos.splice(idx, 1);
  //   }
  // }

  onCLickCheckGiayTo() {
    console.log('onCLickCheckGiayTo', this.model.GiayToYeuCaus);
  }

  onClickDeleteFileDinhKem(giaytoyeucauid) {
    debugger;
    var giaytoyeucau = this.model.GiayToYeuCaus.find(t => t.Id == giaytoyeucauid);
    if (giaytoyeucau != null) {
      giaytoyeucau.FileDinhKem = null;
    }
  }

  onClickDinhKemTapTin(giaytoyeucauid, file) {
    debugger;
    this.fileModel = null;
    this.giaytoyeucauid = giaytoyeucauid;
    this.fileModel = file;
    //gán thêm chứng minh nhân dân của thí sinh nhập và mã đơn vị
    this.fileModel.CMND = this.model.ThiSinh.CMND;
    this.fileModel.MaDonVi = environment.truong;

    this.fileInput.nativeElement.click();
  }

  uploadFileDinhKem(files: FileList) {
    files = this.fileInput.nativeElement.files;
    debugger;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      this._uploadService.uploadFileDinhKem(file, this.fileModel).subscribe(data => {

        if (!data.IsError) {
          var fileL = files
          var newGiayTo = {
            Id: null,
            Ten: data.FileName,
            FileName: data.FileName,
            Extension: data.Extension,
            FileType: data.FileType,
            Size: data.Size,
            Path: data.Path,
            LoaiFileGiayTo: null,
            ThuTu: null,
            HoSoId: this.model.Id,
            MoTa: null,
            NgayUpFile: null,
            KhachHangId: null,
            TableName: null,
            TableId: this.model.Id,
            NgayTao: null,
            NgaySua: null,
            NguoiTao: null,
            NguoiSua: null,
            DaNop: null,
            FileDinhKem: null,
            IsBatBuoc: null,
            KichThuoc: null, //3x4; 4x6
            DungLuong: null
          };
          var giaytoyeucau = this.model.GiayToYeuCaus.find(t => t.Id == this.giaytoyeucauid);
          if (giaytoyeucau != null) {
            giaytoyeucau.FileDinhKem = newGiayTo;
          }
          this.giaytoyeucauid = null;
        } else {
          this._matSnackBar.open(data.ContentResult, 'OK', {
            verticalPosition: 'top', horizontalPosition: 'right',
            duration: 2000, panelClass: 'ErrorSnackbar'
          });
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
/* #endregion */


/* #region  Văn bằng 2- NEU  */

@Component({
  selector: 'app-form-xet-tuyen-van-bang-2-neu',
  templateUrl: './form-xet------van-bang-2-----NEU.component.html',
  styleUrls: ['./form-xet-tuyen.component.scss'],
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
export class FormXetTuyenVanBang2NEUComponent extends BaseFormXetTuyenComponent {

  async ngOnInit() {
    await this.loadData(true);

    this.taoDanhSachCotDiem();

    this.loadTruongCDDH();
    this.url = '/tuyen-sinh';
  }

  onClearForm() {
    this._hoSoXetTuyenIdRouter = 'null';
    this.model = new HoSoXetTuyen();
    this.model.NguyenVongs.push(new NguyenVong());
    //this.router.navigateByUrl('tuyen-sinh/dang-ky/form-xet-tuyen/1/null/' + this._dotTuyenSinhIdRouter);
  }

  kiemTraCMND(): Boolean {
    let cmnd = this.model.ThiSinh.CMND;
    this._thiSinhService.singleByCMND(cmnd).subscribe(
      success => {
        if (success != null) {
          this.openSnackBar('CMND này đã được đăng ký tài khoản. Vui lòng đăng nhập để đăng ký!', 1);
          return false;
        }
        else {
          return true;
        }
      },
      error => {
        this.openSnackBar('Không kiểm tra được CMND', 1);
        return false;
      }
    )
    return true;
  }

  onChangeNguyenVong(i, value) {
    this._nganhDaoTaoService.getToHopCotDiemByNganhDaoTaoID(value, this._dotTuyenSinhIdRouter).subscribe(
      toHopCotDiems => {

        this.model.NguyenVongs[i].TopHopCotDiems = toHopCotDiems;
        this.model.NguyenVongs[i].CotDiems = [];


        //nếu khác 0 thì tự động gọi tổ hợp cột điểm thứ 1
        if (toHopCotDiems.length !== 0) {
          this.model.NguyenVongs[i].ToHopCotDiemId = toHopCotDiems[0].Id;
          this.onChangeToHopCotDiem(i, toHopCotDiems[0].Id);
        }



      }, () => {
        this.openSnackBar('Không lấy được tổ hợp điểm', 1);
      }
    )
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
    console.log(this.model);

    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = this._dotTuyenSinh.HinhThucXetTuyen.Loai;
    this.model.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId; //ktra lai

    if (this.isValidData() == 0) {
      return;
    }

    if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.XepHangCDDH == null || this.model.ThiSinh.ThangNamTotNghiepCDDH == null || this.model.ThiSinh.SoHieuBangTotNghiepCDDH == null || this.model.ThiSinh.SoVaoSoBangTotNghiepCDDH == null || this.model.ThiSinh.NgayKyCapBangTotNghiep == null) {
      this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
      return;
    }



    if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.MaTruongCDDH == '' ||
      this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.MaTruongCDDH == '') {
      this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
      return;
    }


    if (this.kiemTraCMND()) {
      let model = JSON.parse(JSON.stringify(this.model));
      let ngaySinh = new Date(model.ThiSinh.NgaySinh);
      model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
      model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);


      model.NguyenVongs.forEach(nguyenVong => {
        nguyenVong.CotDiems = this.model.CotDiems;
      })

      //Gán thêm tên từ json vào cột
      this.model.ThiSinh.Ten = this.model.ThiSinh.HoLotVaTen;

      this.btnSaveDisable = true;
      this._hoSoXetTuyenService.create(model).subscribe(
        success => {
          let LinkInBienNhan = `${this.serviceUrl}/reports/ExportHoSoDangKyTuyenSinh?hsdangkytuyensinhid=${success.Id}`;
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

  }

  onSaveClick() {
    var url = this._location.path();
    url = url.substring(0, url.lastIndexOf('/' + this._dotTuyenSinhIdRouter));
    url = url.substring(url.lastIndexOf('/') + 1, url.length);
    this.parseToDatetime();
    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = "nhapdiem";
    this.model.Id = Number.parseInt(this._hoSoXetTuyenIdRouter);
    console.log(this.model);
    debugger;
    if (this.isValidData() == 0) {
      return;
    }
    if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.XepHangCDDH == null || this.model.ThiSinh.ThangNamTotNghiepCDDH == null || this.model.ThiSinh.SoHieuBangTotNghiepCDDH == null || this.model.ThiSinh.SoVaoSoBangTotNghiepCDDH == null || this.model.ThiSinh.NgayKyCapBangTotNghiep == null) {
      this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
      return;
    }
    if (this._dotTuyenSinh.HinhThucXetTuyenId == 2) {
      if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.MaTruongCDDH == '' ||
        this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.MaTruongCDDH == '') {
        this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
        return;
      }
    }

    let model = JSON.parse(JSON.stringify(this.model));
    let ngaySinh = new Date(model.ThiSinh.NgaySinh);
    model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
    model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);

    this.btnSaveDisable = true;
    this._hoSoXetTuyenService.update(model).subscribe(
      () => {
        this.openSnackBar('Đã cập nhật hồ sơ xét tuyển thành công', 2);
        this.btnSaveDisable = false;
      }, error => {
        this.btnSaveDisable = false;
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
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
}

/* #endregion */


/* #region  Đại học chính quy kết hợp- NEU  */

@Component({
  selector: 'app-form-xet-tuyen-van-bang-2-neu',
  templateUrl: './form-xet------xet-tuyen-dh-chinhquy-ket-hop----NEU.component.html',
  styleUrls: ['./form-xet-tuyen.component.scss'],
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
export class FormXetTuyenDHChinhQuyKetHopNEUComponent extends BaseFormXetTuyenComponent {

  async ngOnInit() {
    await this.loadData(true);

    this.taoDanhSachCotDiem();

    this.loadTruongCDDH();
    this.url = '/tuyen-sinh';
  }

  onClearForm() {
    this._hoSoXetTuyenIdRouter = 'null';
    this.model = new HoSoXetTuyen();
    this.model.NguyenVongs.push(new NguyenVong());
    //this.router.navigateByUrl('tuyen-sinh/dang-ky/form-xet-tuyen/1/null/' + this._dotTuyenSinhIdRouter);
  }

  kiemTraCMND(): Boolean {
    let cmnd = this.model.ThiSinh.CMND;
    this._thiSinhService.singleByCMND(cmnd).subscribe(
      success => {
        if (success != null) {
          this.openSnackBar('CMND này đã được đăng ký tài khoản. Vui lòng đăng nhập để đăng ký!', 1);
          return false;
        }
        else {
          return true;
        }
      },
      error => {
        this.openSnackBar('Không kiểm tra được CMND', 1);
        return false;
      }
    )
    return true;
  }

  onChangeNguyenVong(i, value) {
    this._nganhDaoTaoService.getToHopCotDiemByNganhDaoTaoID(value, this._dotTuyenSinhIdRouter).subscribe(
      toHopCotDiems => {

        this.model.NguyenVongs[i].TopHopCotDiems = toHopCotDiems;
        this.model.NguyenVongs[i].CotDiems = [];


        //nếu khác 0 thì tự động gọi tổ hợp cột điểm thứ 1
        if (toHopCotDiems.length !== 0) {
          this.model.NguyenVongs[i].ToHopCotDiemId = toHopCotDiems[0].Id;
          this.onChangeToHopCotDiem(i, toHopCotDiems[0].Id);
        }



      }, () => {
        this.openSnackBar('Không lấy được tổ hợp điểm', 1);
      }
    )
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
    debugger;
    console.log(this.model);

    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = this._dotTuyenSinh.HinhThucXetTuyen.Loai;
    this.model.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId; //ktra lai

    if (this.isValidData() == 0) {
      return;
    }







    if (this.kiemTraCMND()) {
      let model = JSON.parse(JSON.stringify(this.model));
      let ngaySinh = new Date(model.ThiSinh.NgaySinh);
      model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
      model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);


      model.NguyenVongs.forEach(nguyenVong => {
        nguyenVong.CotDiems = this.model.CotDiems;
      })

      this.btnSaveDisable = true;
      this._hoSoXetTuyenService.create(model).subscribe(
        success => {
          let LinkInBienNhan = `${this.serviceUrl}/reports/ExportHoSoDangKyTuyenSinh?hsdangkytuyensinhid=${success.Id}`;
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

  }

  onSaveClick() {
    var url = this._location.path();
    url = url.substring(0, url.lastIndexOf('/' + this._dotTuyenSinhIdRouter));
    url = url.substring(url.lastIndexOf('/') + 1, url.length);
    this.parseToDatetime();
    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = "nhapdiem";
    this.model.Id = Number.parseInt(this._hoSoXetTuyenIdRouter);
    console.log(this.model);

    if (this.isValidData() == 0) {
      return;
    }


    let model = JSON.parse(JSON.stringify(this.model));
    let ngaySinh = new Date(model.ThiSinh.NgaySinh);
    model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
    model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);
    this.btnSaveDisable = true;
    this._hoSoXetTuyenService.update(model).subscribe(
      () => {
        this.openSnackBar('Đã cập nhật hồ sơ xét tuyển thành công', 2);
        this.btnSaveDisable = false;
      }, error => {
        this.btnSaveDisable = false;
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
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
}

/* #endregion */


/* #region  liên thông cao đẳng lên đại học NEU ============== */

@Component({
  selector: 'app-form-thi-lien-thong-cao-dang-len-dai-hoc-neu',
  templateUrl: './form-thi------lien-thong-cao-dang-len-dai-hoc-----NEU.component.html',
  styleUrls: ['./form-xet-tuyen.component.scss'],
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
export class FormThiLienThongCaoDangLenDaiHocNEUComponent extends BaseFormXetTuyenComponent {

  async ngOnInit() {
    await this.loadData(true);

    this.taoDanhSachCotDiem();

    this.loadTruongCDDH();
    this.url = '/tuyen-sinh';
  }

  onClearForm() {
    this._hoSoXetTuyenIdRouter = 'null';
    this.model = new HoSoXetTuyen();
    this.model.NguyenVongs.push(new NguyenVong());
    //this.router.navigateByUrl('tuyen-sinh/dang-ky/form-xet-tuyen/1/null/' + this._dotTuyenSinhIdRouter);
  }

  kiemTraCMND(): Boolean {
    let cmnd = this.model.ThiSinh.CMND;
    this._thiSinhService.singleByCMND(cmnd).subscribe(
      success => {
        if (success != null) {
          this.openSnackBar('CMND này đã được đăng ký tài khoản. Vui lòng đăng nhập để đăng ký!', 1);
          return false;
        }
        else {
          return true;
        }
      },
      error => {
        this.openSnackBar('Không kiểm tra được CMND', 1);
        return false;
      }
    )
    return true;
  }

  onChangeNguyenVong(i, value) {
    this._nganhDaoTaoService.getToHopCotDiemByNganhDaoTaoID(value, this._dotTuyenSinhIdRouter).subscribe(
      toHopCotDiems => {

        this.model.NguyenVongs[i].TopHopCotDiems = toHopCotDiems;
        this.model.NguyenVongs[i].CotDiems = [];


        //nếu khác 0 thì tự động gọi tổ hợp cột điểm thứ 1
        if (toHopCotDiems.length !== 0) {
          this.model.NguyenVongs[i].ToHopCotDiemId = toHopCotDiems[0].Id;
          this.onChangeToHopCotDiem(i, toHopCotDiems[0].Id);
        }



      }, () => {
        this.openSnackBar('Không lấy được tổ hợp điểm', 1);
      }
    )
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
    debugger;
    console.log(this.model);

    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = this._dotTuyenSinh.HinhThucXetTuyen.Loai;
    this.model.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId; //ktra lai


    if (this.isValidData() == 0) {
      return;
    }

    if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.XepHangCDDH == null || this.model.ThiSinh.ThangNamTotNghiepCDDH == null || this.model.ThiSinh.SoHieuBangTotNghiepCDDH == null || this.model.ThiSinh.SoVaoSoBangTotNghiepCDDH == null || this.model.ThiSinh.NgayKyCapBangTotNghiep == null) {
      this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
      return;
    }


    if (this._dotTuyenSinh.HinhThucXetTuyenId == 2) {
      if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.MaTruongCDDH == '' ||
        this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.MaTruongCDDH == '') {
        this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
        return;
      }
    }

    if (this.kiemTraCMND()) {
      let model = JSON.parse(JSON.stringify(this.model));
      let ngaySinh = new Date(model.ThiSinh.NgaySinh);
      model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
      model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);


      model.NguyenVongs.forEach(nguyenVong => {
        nguyenVong.CotDiems = this.model.CotDiems;
      })

      this.btnSaveDisable = true;
      this._hoSoXetTuyenService.create(model).subscribe(
        success => {
          let LinkInBienNhan = `${this.serviceUrl}/reports/ExportHoSoDangKyTuyenSinh?hsdangkytuyensinhid=${success.Id}`;
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

  }

  onSaveClick() {
    var url = this._location.path();
    url = url.substring(0, url.lastIndexOf('/' + this._dotTuyenSinhIdRouter));
    url = url.substring(url.lastIndexOf('/') + 1, url.length);
    this.parseToDatetime();
    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = "nhapdiem";
    this.model.Id = Number.parseInt(this._hoSoXetTuyenIdRouter);
    console.log(this.model);

    if (this.isValidData() == 0) {
      return;
    }
    if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.XepHangCDDH == null || this.model.ThiSinh.ThangNamTotNghiepCDDH == null || this.model.ThiSinh.SoHieuBangTotNghiepCDDH == null || this.model.ThiSinh.SoVaoSoBangTotNghiepCDDH == null || this.model.ThiSinh.NgayKyCapBangTotNghiep == null) {
      this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
      return;
    }
    if (this._dotTuyenSinh.HinhThucXetTuyenId == 2) {
      if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.MaTruongCDDH == '' ||
        this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.MaTruongCDDH == '') {
        this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
        return;
      }
    }

    let model = JSON.parse(JSON.stringify(this.model));
    let ngaySinh = new Date(model.ThiSinh.NgaySinh);
    model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
    model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);
    this.btnSaveDisable = true;
    this._hoSoXetTuyenService.update(model).subscribe(
      () => {
        this.openSnackBar('Đã cập nhật hồ sơ xét tuyển thành công', 2);
        this.btnSaveDisable = false;
      }, error => {
        this.btnSaveDisable = false;
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
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
}

/* #endregion */



/* #region  Không biết có dùng không */

// @Component({
//   selector: 'form-xet-tuyen-van-bang-2-admin',
//   templateUrl: './form-xet-tuyen-van-bang-2-admin.component.html',
//   styleUrls: ['./form-xet-tuyen.component.scss'],
//   animations: fuseAnimations,
//   encapsulation: ViewEncapsulation.None,
//   providers: [
//     //{provide: ValidatorService, useClass: PersonValidatorService },
//     {
//       provide: DateAdapter, useClass: AppDateAdapter
//     },
//     { provide: MAT_DATE_LOCALE, useValue: 'vi' },
//     {
//       provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
//     }]
// }
// )
// export class FormXetTuyenVanBang2Component extends BaseFormXetTuyenComponent {
//   ngOnInit() {
//     this.loadData();
//     //2: văn bằng 2
//     this.url = '/admission/dang-ky/admin/2/1/';
//   }

// }


/* #endregion */



/* #region  Xet Tuyen hoc ba admin Yersin */

@Component({
  selector: 'app-form-xet-tuyen-hoc-ba-admin',
  templateUrl: './form-xet------xet-tuyen-hoc-ba-----Yersin.component.html',
  styleUrls: ['./form-xet-tuyen.component.scss'],
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
}
)
export class FormXetTuyenHocBaAdminYersinComponent extends BaseFormXetTuyenComponent {

  displayedColumns = ['Ten', 'Diem'];//this.columns.map(c => c.columnDef);

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


      }
    );


    this.tinhThanhThuongTrus$ = this.autoCompleteTinhThanh(this.tinhThanhThuongTruNextPage$, this.txtTinhThanhThuongTru, "tinhthanhpho", null);

    //  this.tinhThanhTamTrus$ = this.autoCompleteTinhThanh(this.tinhThanhTamTruNextPage$, this.txtTinhThanhTamTru, "tinhthanhpho", null);

    //  this.tinhThanhHocLop10s$ = this.autoCompleteTinhThanh(this.tinhThanhHocLop10NextPage$, this.txtTinhThanhHocLop10, "tinhthanhpho", null);

    //  this.tinhThanhHocLop11s$ = this.autoCompleteTinhThanh(this.tinhThanhHocLop11NextPage$, this.txtTinhThanhHocLop11, "tinhthanhpho", null);

    //   this.tinhThanhHocLop12s$ = this.autoCompleteTinhThanh(this.tinhThanhHocLop12NextPage$, this.txtTinhThanhHocLop12, "tinhthanhpho", null);

    this.truongHocLop12s$ = this.autoCompleteTruong(this.truongHocLop12NextPage$, this.txtTruongHocLop12, "THPT", null, null);


    await this.loadData(true);

    this.taoDanhSachCotDiem();



    // khi edit thì set 
    //Khi sửa
    if (this._hoSoXetTuyenIdRouter) // nếu khác null && undefine thì là trường hợp edit
    {
      this.onSetValueFormControl();
      this.model.ThiSinh.KhuVucUuTienId = 5; //KV3
      this.model.ThiSinh.DoiTuongUuTienId = 29; // Không thuộc đối tượng ưu tiên


      debugger;

      for (let index = 0; index < this.model.NguyenVongs.length; index++) {
        // this.model.NguyenVongs[index].ChuyenNganhDaoTaos.push( this.model.NguyenVongs[index].ChuyenNganhDaoTao)
        this.onChangeNguyenVongEdit(index, this.model.NguyenVongs[index].NganhDaoTao);
      }

    }

    if (!this.IsGiaoDienTrongAdmin)
      this.btnSaveDisable = true; // nếu không phải giao diện admin thì khóa lại


    // this.model.ThiSinh.ChungChi = { Ma: 'SAT', Ten: "IELTS", DonViCap: '', NgayCap: '', DaThi: true, Diem: 0, MaSoBang: '', SoHieuBang: '' }
    //this.chungChi= { Ma: 'SAT', Ten: "IELTS", DonViCap: '', NgayCap: '', DaThi: true, Diem: 0, MaSoBang: '', SoHieuBang: '' };


    //this.loadTruongCDDH();
    this.url = '/tuyen-sinh';
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

  onOptionSelected_THPT12(lop12: TruongTHPT) {
    // console.log('lop12', lop12);
    this.model.ThiSinh.TruongTHPT12MaTruong = lop12.MaTruong;
    this.model.ThiSinh.TruongTHPT12MaTinh = lop12.MaTinh;

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

  displayWithTHPT(thpt: TruongTHPT) {

    if (thpt && typeof thpt.Ten !== "undefined" && thpt.Ten != null) {

      return thpt.Ten + ' - ' + thpt.DiaChi
    }
    else {
      return "";
    }
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

      )
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
    if (nganh.NganhId != null) {
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


    console.log('register', this.model);

    this.onGetValueFormControl();

    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = this._dotTuyenSinh.HinhThucXetTuyen.Loai;
    this.model.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId; //ktra lai


    // if (this.isValidData() == 0) {
    //   return;
    // }

    // 

    if (this.CMNDDaCo(this.model.ThiSinh.CMND)) { this.openSnackBar('CMND này đã được đăng ký. Vui lòng đăng nhập để đăng ký!', 1); return; }


    if (!this.CheckThuTuNguyenVongHopLe(this.model.NguyenVongs)) return;



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
    this._hoSoXetTuyenService.create(this.model).subscribe(
      success => {
        let LinkInBienNhan = `${this.serviceUrl}/reports/ExportHoSoDangKyTuyenSinh_V2?hsdangkytuyensinhid=${success.Id}`;
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

    console.log('update', this.model);

    this.onGetValueFormControl();

    if (!this.CheckThuTuNguyenVongHopLe(this.model.NguyenVongs)) return;

    // let model = JSON.parse(JSON.stringify(this.model));
    // let ngaySinh = new Date(model.ThiSinh.NgaySinh);
    //model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
    // model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);

    //Gán thêm tên từ json vào cột
    this.model.ThiSinh.Ten = this.model.ThiSinh.HoLotVaTen;

    this.btnSaveDisable = true;
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

  goBack() {
    this._location.back();
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

}
/* #endregion */


/* #region  Form xet tuyen hoc ba HIU */

@Component({
  selector: 'app-form-xet-tuyen-hoc-ba',
  templateUrl: './form-xet-tuyen-hoc-ba.component.html',
  styleUrls: ['./form-xet-tuyen.component.scss'],
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
export class FormXetTuyenHocBaComponent extends BaseFormXetTuyenComponent {
  ngOnInit() {
    this.loadData();

    this.url = '/tuyen-sinh';
  }

  onClearForm() {
    this._hoSoXetTuyenIdRouter = 'null';
    this.model = new HoSoXetTuyen();
    this.model.NguyenVongs.push(new NguyenVong());
    //this.router.navigateByUrl('tuyen-sinh/dang-ky/form-xet-tuyen/1/null/' + this._dotTuyenSinhIdRouter);
  }

  kiemTraCMND(): Boolean {
    let cmnd = this.model.ThiSinh.CMND;
    this._thiSinhService.singleByCMND(cmnd).subscribe(
      success => {
        if (success != null) {
          this.openSnackBar('CMND này đã được đăng ký tài khoản. Vui lòng đăng nhập để đăng ký!', 1);
          return false;
        }
        else {
          return true;
        }
      },
      error => {
        this.openSnackBar('Không kiểm tra được CMND', 1);
        return false;
      }
    )
    return true;
  }

  onRegisterClick() {
    console.log(this.model);
    this.btnSaveDisable = true;
    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = this._dotTuyenSinh.HinhThucXetTuyen.Loai;
    this.model.HinhThucXetTuyenId = this._dotTuyenSinh.HinhThucXetTuyenId; //ktra lai


    if (this.isValidData() == 0) {
      return;
    }

    if (this._dotTuyenSinh.HinhThucXetTuyenId == 2) {
      if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.MaTruongCDDH == '' ||
        this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.MaTruongCDDH == '') {
        this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
        return;
      }
    }

    if (this.kiemTraCMND()) {
      let model = JSON.parse(JSON.stringify(this.model));
      let ngaySinh = new Date(model.ThiSinh.NgaySinh);
      model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
      model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);

      this.btnSaveDisable = true;
      this._hoSoXetTuyenService.create(model).subscribe(
        success => {
          let LinkInBienNhan = `${this.serviceUrl}/reports/ExportHoSoDangKyTuyenSinh?hsdangkytuyensinhid=${success.Id}`;
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

  }

  onSaveClick() {
    var url = this._location.path();
    url = url.substring(0, url.lastIndexOf('/' + this._dotTuyenSinhIdRouter));
    url = url.substring(url.lastIndexOf('/') + 1, url.length);
    this.parseToDatetime();
    this.model.DotTuyenSinhId = Number.parseInt(this._dotTuyenSinhIdRouter);
    this.model.HinhThucXetTuyen.Loai = "nhapdiem";
    this.model.Id = Number.parseInt(this._hoSoXetTuyenIdRouter);
    console.log(this.model);

    if (this.isValidData() == 0) {
      return;
    }

    if (this._dotTuyenSinh.HinhThucXetTuyenId == 2) {
      if (this.model.ThiSinh.MaTruongCDDH == null || this.model.ThiSinh.MaTruongCDDH == '' ||
        this.model.ThiSinh.LoaiHinhDaoTaoCDDH == null || this.model.ThiSinh.MaTruongCDDH == '') {
        this.openSnackBar('Vui lòng nhập thông tin đầy đủ', 1);
        return;
      }
    }

    let model = JSON.parse(JSON.stringify(this.model));
    let ngaySinh = new Date(model.ThiSinh.NgaySinh);
    model.ThiSinh.NgaySinh = new Date(ngaySinh.getFullYear(), ngaySinh.getMonth(), ngaySinh.getDate());
    model.ThiSinh.NgaySinh.setDate(model.ThiSinh.NgaySinh.getDate() + 1);

    this._hoSoXetTuyenService.update(model).subscribe(
      () => {
        this.openSnackBar('Đã cập nhật hồ sơ xét tuyển thành công', 2);
      }, error => {
        this.openSnackBar(error.error.Message, 1);
        console.log(error);
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
}
/* #endregion */

/* #region  Popup confirm sau khi dang ky */


@Component({
  selector: 'app-confirm-dang-ky-modal',
  templateUrl: './confirm-dang-ky.modal.html',
  styleUrls: ['./form-xet-tuyen.component.scss'],
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
export class ConfirmDangKyComponent implements OnInit {

  thiSinh: any = null;
  constructor(private _dialogRef: MatDialogRef<ConfirmDangKyComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {

  }
}
/* #endregion */








/* #region  Directive AutoCompletee */

export interface IAutoCompleteScrollEvent {
  autoComplete: MatAutocomplete;
  scrollEvent: Event;
};

@Directive({
  selector: 'mat-autocomplete[optionsScroll]'
})
export class OptionsScrollDirective implements OnDestroy {

  @Input() thresholdPercent = .8;
  @Output('optionsScroll') scroll = new EventEmitter<IAutoCompleteScrollEvent>();
  _onDestroy = new Subject();

  constructor(public autoComplete: MatAutocomplete) {
    this.autoComplete.opened.pipe(
      tap(() => {
        // Note: When autocomplete raises opened, panel is not yet created (by Overlay)
        // Note: The panel will be available on next tick
        // Note: The panel wil NOT open if there are no options to display
        setTimeout(() => {
          // Note: remove listner just for safety, in case the close event is skipped.
          this.removeScrollEventListener();
          this.autoComplete.panel.nativeElement
            .addEventListener('scroll', this.onScroll.bind(this))
        });
      }),
      takeUntil(this._onDestroy)).subscribe();

    this.autoComplete.closed.pipe(
      tap(() => this.removeScrollEventListener()),
      takeUntil(this._onDestroy)).subscribe();
  }

  private removeScrollEventListener() {
    if (this.autoComplete.panel)
      this.autoComplete.panel.nativeElement
        .removeEventListener('scroll', this.onScroll);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();

    this.removeScrollEventListener();
  }

  onScroll(event: Event) {

    if (this.thresholdPercent === undefined) {
      this.scroll.next({ autoComplete: this.autoComplete, scrollEvent: event });
    } else {
      var element = event.target as HTMLElement;
      const threshold = this.thresholdPercent * 100 * element.scrollHeight / 100;
      const current = element.scrollTop + element.clientHeight;

      console.log(`scroll, threshold: `)
      if (current > threshold) {
        //console.log('load next page');
        this.scroll.next({ autoComplete: this.autoComplete, scrollEvent: event });
      }
    }
  }

};
/* #endregion */



export function RequireMatch(control: AbstractControl) {
  console.log('validate', control.value);
  const selection: any = control.value;
  if (typeof selection === 'string') {
    return { incorrect: true };
  }
  return null;
}


@Directive({
  selector: '[autoClose]'
})
export class AutoCloseDirective implements AfterContentInit {

  @Input() control: FormControl;
  @Input() autoCompleteRef: MatAutocomplete;

  subscription: Subscription;

  constructor(@Host() @Self() private readonly autoCompleteTrigger: MatAutocompleteTrigger) {
  }

  ngAfterContentInit() {
    if (this.control === undefined) {
      throw Error('inputCtrl @Input should be provided ')
    }

    if (this.autoCompleteRef === undefined) {
      throw Error('valueCtrl @Input should be provided ')
    }

    setTimeout(() => {
      this.subscribeToClosingActions();
      this.handelSelection();
    }, 0);
  }

  private subscribeToClosingActions(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.autoCompleteTrigger.panelClosingActions
      .subscribe((e) => {
        if (!e || !e.source) {
          this.control.setValue(null);
        }
      },
        err => this.subscribeToClosingActions(),
        () => this.subscribeToClosingActions()
      );
  }

  private handelSelection() {
    this.autoCompleteRef.optionSelected.subscribe((e: MatAutocompleteSelectedEvent) => {
      this.control.setValue(e.option.value);
    });
  }
}