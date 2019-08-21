import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar, MatDialog, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatAccordion, } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { DotTuyenSinh } from '../../Models/DotTuyenSinh.model';
import { DotTuyenSinhService } from '../dot-tuyen-sinh.service';
import { HeDaoTao } from '../../Models/HeDaoTao.model';
import { HeDaoTaoService } from '../../he-dao-tao/he-dao-tao.service';
import { BacDaoTao } from '../../Models/BacDaoTao.model';
import { BacDaoTaoService } from '../../bac-dao-tao/bac-dao-tao.service';
import { HinhThucXetTuyen } from '../../Models/HinhThucXetTuyen.model';
import { HinhThucXetTuyenService } from '../../hinh-thuc-xet-tuyen/hinh-thuc-xet-tuyen.service';
import { NganhDaoTao } from '../../Models/NganhDaoTao.model';
//import { TableElement, TableDataSource, ValidatorService } from 'angular4-material-table';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../date.adapter';
import { CongThucDiemComponent } from './cong-thuc-diem/cong-thuc-diem.component';
import { RegExpClass } from 'app/core/validation';
import { GiayTo } from '../../Models/GiayTo.model';

import { UploadFilesService } from '../../upload-files/upload-files.service';



@Component({
    selector: 'app-chi-tiet-dot-tuyen-sinh',
    templateUrl: './chi-tiet-dot-tuyen-sinh.component.html',
    styleUrls: ['./chi-tiet-dot-tuyen-sinh.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [
        //{provide: ValidatorService, useClass: PersonValidatorService },
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        { provide: MAT_DATE_LOCALE, useValue: 'vi' },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }

    ],
})

export class ChiTietDotTuyenSinhComponent implements OnInit {
    panelOpenState = true;
    //-- Property----
    DotTuyenSinh: DotTuyenSinh = new DotTuyenSinh();
    pageType: string = 'new'; //dùng để biết form ở trạng thái nào mà có thể ẩn hiển nút tương ứng,...
    itemForm: FormGroup;

    tenHeDaoTaos: Array<HeDaoTao> = new Array<HeDaoTao>();
    tenBacDaoTaos: Array<BacDaoTao> = new Array<BacDaoTao>();
    tenHinhThucXetTuyens: Array<HinhThucXetTuyen> = new Array<HinhThucXetTuyen>();
    nganhDaoTaoSelected: NganhDaoTao = new NganhDaoTao();
    idDotTuyenSinh: string = this.activatedRoute.snapshot.paramMap.get('id');
    idCloneDotTuyenSinh: string = this.activatedRoute.snapshot.paramMap.get('idClone');
    congThucDiem: string = '';
    regExpClass = RegExpClass;
    btnSaveDisable: boolean = false;
    IsMoRongCauHinhDaoTao: boolean = false;
    @ViewChild(MatAccordion) accordion: MatAccordion;

    @ViewChild('fileInput')
    fileInput: ElementRef;

    dinhdangfiles: Array<string> = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx', '.rar'];
    kichthuocanhs: Array<string> = ['2x3', '3x4', '4x6'];
    //PhanQuyenChinhSuaHoSo
    PhanQuyenChinhSuaHoSoList: Array<any> = [
        {
            Id:0,
            Ten: 'Cho phép chỉnh sửa toàn bộ thông tin hồ sơ'
        },
        {
            Id:1,
            Ten: 'Chỉ cho phép chỉnh sửa thông tin thí sinh'
        }
    ]

    fileModel: any = null;
    giaytoyeucauid = null;

    checkXemFileDinhKiem: boolean;


    //------Constructor------------
    constructor(
        private _DotTuyenSinhService: DotTuyenSinhService,
        private _HeDaoTaoService: HeDaoTaoService,
        private _BacDaoTaoService: BacDaoTaoService,
        private _HinhThucXetTuyenService: HinhThucXetTuyenService,
        private _formBuilder: FormBuilder,
        private _uploadService: UploadFilesService,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute,
        public _matDialog: MatDialog
    ) {
        this.idDotTuyenSinh = this.activatedRoute.snapshot.paramMap.get('id');
        this.idCloneDotTuyenSinh = this.activatedRoute.snapshot.queryParamMap.get('idClone');

        this._HeDaoTaoService.all().pipe()
            .subscribe(hedaotaos => {
                this.tenHeDaoTaos = <Array<HeDaoTao>>hedaotaos;

            });

        this._BacDaoTaoService.all().pipe()
            .subscribe(bacdaotaos => {
                this.tenBacDaoTaos = <Array<BacDaoTao>>bacdaotaos;

            });

        this._HinhThucXetTuyenService.all().pipe()
            .subscribe(hinhthucxettuyens => {
                this.tenHinhThucXetTuyens = <Array<HinhThucXetTuyen>>hinhthucxettuyens;

            });

        if (this.idDotTuyenSinh == 'them-dot-tuyen-sinh') //Thêm mới
        {
            if (this.idCloneDotTuyenSinh == null) {
                this.DotTuyenSinh = new DotTuyenSinh();
                this.pageType = 'new';
                //debugger;
                this._DotTuyenSinhService.single(null).pipe()
                    .subscribe(item => {
                        this.DotTuyenSinh = new DotTuyenSinh(item);
                        console.log(this.DotTuyenSinh);
                        this.itemForm = this.createItemForm();
                    });
            }
            else {
                this._DotTuyenSinhService.single(Number(this.idCloneDotTuyenSinh)).pipe()
                .subscribe(item => {
                    this.DotTuyenSinh = new DotTuyenSinh(item);
                    this.DotTuyenSinh.Id = null;
                    this.pageType = 'new';
                    //console.log('edit');
                    this.itemForm = this.createItemForm();
                });
            }

        }
        else //Sửa
        {
            this._DotTuyenSinhService.single(Number(this.idDotTuyenSinh)).pipe()
                .subscribe(item => {
                    console.log(item);
                    this.DotTuyenSinh = new DotTuyenSinh(item);
                    
                    // this.DotTuyenSinh.DanhSachNganhDaoTao=this.demojson;
                    //console.log(this.DotTuyenSinh);
                    this.pageType = 'edit';
                    //console.log('edit');
                    this.itemForm = this.createItemForm();
                });
        }
        this.itemForm = this.createItemForm();
    }

    ngOnInit() {

    }

    createItemForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.DotTuyenSinh.Id],
            Ten: [this.DotTuyenSinh.Ten],
            HeDaoTaoId: [this.DotTuyenSinh.HeDaoTaoId],
            CongThucDiem: [this.DotTuyenSinh.CongThucDiem],
            HinhThucXetTuyenId: [this.DotTuyenSinh.HinhThucXetTuyenId],
            BacDaoTaoId: [this.DotTuyenSinh.BacDaoTaoId],
            KhoaHoc: [this.DotTuyenSinh.KhoaHoc],
            LoaiDangKyId: [this.DotTuyenSinh.LoaiDangKyId],
            NamTuyenSinh: [this.DotTuyenSinh.NamTuyenSinh, Validators.compose([Validators.min(2019), Validators.max(2022), Validators.minLength(4), Validators.maxLength(4)])],
            SoLuongNguyenVong: [this.DotTuyenSinh.SoLuongNguyenVong, Validators.compose([Validators.min(1), Validators.max(10), Validators.maxLength(1)])],
            HanDangKy: [this.DotTuyenSinh.HanDangKy],
            ThuTuHienThi: [this.DotTuyenSinh.ThuTuHienThi],
            NgayBatDau: [this.DotTuyenSinh.NgayBatDau],
            KichHoatDK: [this.DotTuyenSinh.KichHoatDK],
            KichHoatXetTuyet: [this.DotTuyenSinh.KichHoatXetTuyet],
            CongThucKiemTraDieuKienNhapDiem: [this.DotTuyenSinh.CongThucKiemTraDieuKienNhapDiem],
            ChoPhepGuiMail: [this.DotTuyenSinh.ChoPhepGuiMail],
            ChoPhepNhapDCThuongTruVaTamTru: [this.DotTuyenSinh.ChoPhepNhapDCThuongTruVaTamTru],
            KiemTraDieuKienNhapDiem: [this.DotTuyenSinh.KiemTraDieuKienNhapDiem],
            MaTienTo: [this.DotTuyenSinh.MaTienTo],
            MaBacDaoTao: [this.DotTuyenSinh.MaBacDaoTao],
            MaBatDau: [this.DotTuyenSinh.MaBatDau],
            NoiDungThongBao: [this.DotTuyenSinh.NoiDungThongBao],
            NoiDungEmail: [this.DotTuyenSinh.NoiDungEmail],
            PhuongThucXetTuyenId: [this.DotTuyenSinh.PhuongThucXetTuyenId],
            GiayToYeuCaus: [this.DotTuyenSinh.GiayToYeuCaus],
            ChoPhepUploadHoSo: [this.DotTuyenSinh.ChoPhepUploadHoSo],
            IsTaiFile: [this.DotTuyenSinh.IsTaiFile],
            IsKhoa: [this.DotTuyenSinh.IsKhoa],
            NgayKhoa: [this.DotTuyenSinh.NgayKhoa]
        });
    }

    /**
     * edit
     */
    editItem(): void {
        debugger;
        if (this.itemForm.invalid) {
            this._matSnackBar.open('Vui lòng nhập đầy đủ thông tin', 'OK', {
                verticalPosition: 'top', horizontalPosition: 'right',
                duration: 3000, panelClass: 'ErrorSnackbar'
            });
            return;
        }
        if (!this.checkValidGiayToYeuCaus()) {
            this._matSnackBar.open('Vui lòng nhập đầy đủ thông tin', 'OK', {
                verticalPosition: 'top', horizontalPosition: 'right',
                duration: 3000, panelClass: 'ErrorSnackbar'
            });
            return;
        }
        const data = new DotTuyenSinh(this.itemForm.getRawValue());
        data.DanhSachNganhDaoTao = this.DotTuyenSinh.DanhSachNganhDaoTao;
        data.GiayToYeuCaus = this.DotTuyenSinh.GiayToYeuCaus;
        data.FileHuongDan = this.DotTuyenSinh.FileHuongDan;
        data.IsKhoa = this.DotTuyenSinh.IsKhoa;
        data.PhanQuyenChinhSuaHoSo = this.DotTuyenSinh.PhanQuyenChinhSuaHoSo;
        console.log(data);
        this.btnSaveDisable = true;
        this._DotTuyenSinhService.update(data)
            .subscribe(() => {

                // Show the success message
                this._matSnackBar.open('Đã cập nhật đợt tuyển sinh', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 3000
                });
                this.btnSaveDisable = false;
            },
                error => {
                    this.btnSaveDisable = false;
                    //debugger;
                    this._matSnackBar.open(error.error.Message, 'ERROR', {
                        verticalPosition: 'top', horizontalPosition: 'right',
                        duration: 5000, panelClass: 'ErrorSnackbar'
                    });
                }
            );
    }

    /**
     * Add đợt tuyển sinh
     */
    addItem(): void {
        debugger;
        if (this.itemForm.invalid) {
            this._matSnackBar.open('Vui lòng nhập đầy đủ thông tin', 'OK', {
                verticalPosition: 'top', horizontalPosition: 'right',
                duration: 3000, panelClass: 'ErrorSnackbar'
            });
            return;
        }
        if (!this.checkValidGiayToYeuCaus()) {
            this._matSnackBar.open('Vui lòng nhập đầy đủ thông tin', 'OK', {
                verticalPosition: 'top', horizontalPosition: 'right',
                duration: 3000, panelClass: 'ErrorSnackbar'
            });
            return;
        }
        var data = new DotTuyenSinh(this.itemForm.getRawValue());
        data.DanhSachNganhDaoTao = this.DotTuyenSinh.DanhSachNganhDaoTao;
        data.GiayToYeuCaus = this.DotTuyenSinh.GiayToYeuCaus;
        data.FileHuongDan = this.DotTuyenSinh.FileHuongDan;
        data.PhanQuyenChinhSuaHoSo = this.DotTuyenSinh.PhanQuyenChinhSuaHoSo;
        console.log(data);
        this.btnSaveDisable = true;
        this._DotTuyenSinhService.create(data)
            .subscribe((data) => {

                // Show the success message
                this._matSnackBar.open('Đã thêm đợt tuyển sinh thành công', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 3000
                });

                // Change the location with new one
                this._location.go('admission/dot-tuyen-sinh/' + data.Id);
                this.itemForm.controls['Id'].setValue(data.Id);
                //this.constructor();
                this.pageType = 'edit';

                this.btnSaveDisable = false;
            },
                error => {
                    this.btnSaveDisable = false;
                    //debugger;
                    this._matSnackBar.open(error.error.Message, 'ERROR', {
                        verticalPosition: 'top', horizontalPosition: 'right',
                        duration: 5000, panelClass: 'ErrorSnackbar'
                    });
                });
    }

    checkValidGiayToYeuCaus(): boolean {
        let valid = true;
        this.DotTuyenSinh.GiayToYeuCaus.every(element => {
            console.log(element.Extension);
            if (element.Extension == null || element.Ten == null || element.Ten.trim() == '' || element.DungLuong == null || ((element.Extension == '.jpg' || element.Extension == '.jpeg' || element.Extension == '.png') && element.KichThuoc == null)) {
                valid = false;
            }
            return valid;
        });
        return valid;
    }
    GoBack(): void {
        console.log(window.history);
        window.history.back();
        // this._location.back();
        // console.log(this._location.back());

    }

    aClickMoRongThuNho() {
        var elem = document.getElementById("divCauHinhNganhDaoTao");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }

        this.IsMoRongCauHinhDaoTao = !this.IsMoRongCauHinhDaoTao;
    }

    onEmitChangeDanhSachNganh(dotTuyenSinh: DotTuyenSinh) {

        this.DotTuyenSinh = dotTuyenSinh;
    }

    onEmitClickDanhSachNganh(nganhDaoTao: NganhDaoTao) {

        this.nganhDaoTaoSelected = nganhDaoTao;

    }

    onEmitChangeToHopCotDiem(dotTuyenSinh: DotTuyenSinh) {
        this.DotTuyenSinh = dotTuyenSinh;
    }
    NhapCongThucDiem() {

        if (this.DotTuyenSinh.Id != null) {
            const dialogRef = this._matDialog.open(CongThucDiemComponent, {
                width: '1000px',
                // height: '550px',
                data: null
            });
            dialogRef.componentInstance.dotTuyenSinhId = this.itemForm.controls['Id'].value;
            dialogRef.componentInstance.congthucArea = this.itemForm.controls['CongThucDiem'].value;
            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
                //alert(result);
                if (result) {
                    this.itemForm.controls['CongThucDiem'].setValue(result);
                    this.itemForm.controls['CongThucDiem'].disable();
                }

            });
        }

    }
    NhapCongThucKiemTra() {
        if (this.DotTuyenSinh.Id != null) {
            const dialogRef = this._matDialog.open(CongThucDiemComponent, {
                width: '1000px',
                // height: '550px',
                data: null
            });

            dialogRef.componentInstance.dotTuyenSinhId = this.itemForm.controls['Id'].value;
            dialogRef.componentInstance.congthucArea = this.itemForm.controls['CongThucKiemTraDieuKienNhapDiem'].value;
            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
                //alert(result);
                if (result) {
                    this.itemForm.controls['CongThucKiemTraDieuKienNhapDiem'].setValue(result);
                    this.itemForm.controls['CongThucKiemTraDieuKienNhapDiem'].disable();
                }

            });
        }

    }

    onSelectedFile(event) {
        console.log(event.target.files);
    }
    // onClickShowFileHuongDan($event) {
    //     debugger
    //     // if($event == true)
    //     // this.checkXemFileDinhKiem = false;
    //     // else{
    //     this.checkXemFileDinhKiem = true;
    //     // }
    // }

    onClickAddGiayToYeuCau() {
        var newId = (this.DotTuyenSinh.GiayToYeuCaus.length != 0) ? (Math.max.apply(Math, this.DotTuyenSinh.GiayToYeuCaus.map(function (t) { return t.Id; })) + 1) : 0;
        console.log('onClickAddGiayToYeuCau', newId);
        var newGiayTo = {
            Id: newId,
            Ten: null,
            FileName: null,
            Extension: null,
            FileType: null,
            Size: null,
            Path: null,
            LoaiFileGiayTo: null,
            ThuTu: null,
            HoSoId: null,
            MoTa: null,
            NgayUpFile: null,
            KhachHangId: null,
            TableName: null,
            TableId: null,
            NgayTao: null,
            NgaySua: null,
            NguoiTao: null,
            NguoiSua: null,
            DaNop: null,
            FileDinhKem: null,
            IsBatBuoc: null,
            KichThuoc: null, //3x4; 4x6
            DungLuong: null,
            IsTaiFile: null,
            FileHuongDan: null,
        };
        // var newGiayTo = new GiayTo();
        // newGiayTo.Id = newId;
        this.DotTuyenSinh.GiayToYeuCaus.push(newGiayTo);
    }

    onClickDinhKemTapTin() {
        this.fileInput.nativeElement.click();
    }
    onClickDeleteGiayTo(id) {
        var idx = this.DotTuyenSinh.GiayToYeuCaus.findIndex(t => t.Id == id);
        if (idx != -1) {
            this.DotTuyenSinh.GiayToYeuCaus.splice(idx, 1);
        }
    }

    uploadFileDinhKem(files: FileList) {
        files = this.fileInput.nativeElement.files;
        debugger;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            this._uploadService.uploadFileDinhKem(file, this.fileModel).subscribe(data => {
                debugger;
                if (!data.IsError) {
                    var fileL = files;
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
                        HoSoId: null,
                        MoTa: null,
                        NgayUpFile: null,
                        KhachHangId: null,
                        TableName: null,
                        TableId: null,
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
                    this.DotTuyenSinh.FileHuongDan = newGiayTo;

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
    onClickFileURL(file: any) {

        window.open("//" + file.Path, "_blank");
    }
    onClickDeleteFileDinhKem() {
        this.DotTuyenSinh.FileHuongDan = new GiayTo();
        this.fileInput.nativeElement.value = "";
        // tra istaifile = false
        this.itemForm.controls["IsTaiFile"].setValue(false);
    }
}
