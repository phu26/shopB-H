import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { ActivatedRoute } from '@angular/router';
import { NganhDaoTao } from '../../Models/NganhDaoTao.model';
import { NganhDaoTaoService } from '../nganh-dao-tao.service';


@Component({
    selector: 'app-them-nganh-dao-tao',
    templateUrl: './them-nganh-dao-tao.component.html',
    styleUrls: ['./them-nganh-dao-tao.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ThemNganhDaoTaoComponent implements OnInit {

    nganhDaoTao: NganhDaoTao = new NganhDaoTao();
    pageType: string = 'new';
    nganhDaoTaoForm: FormGroup;
    _idRouter: string;
    nganhChas: Array<NganhDaoTao> = new Array<NganhDaoTao>();

    constructor(
        private _nganhDaoTaoService: NganhDaoTaoService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {
        this._nganhDaoTaoService.all(undefined, undefined, 'NhomChaId is null', undefined).pipe()
            .subscribe(nganhDaoTaos => {
                this.nganhChas = <Array<NganhDaoTao>>nganhDaoTaos;
                console.log(this.nganhChas);
            });
        this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
        if (this._idRouter == 'them') {
            this.nganhDaoTao = new NganhDaoTao();
            this.pageType = 'new';
            console.log('new');

        }
        else {
            this._nganhDaoTaoService.single(Number(this._idRouter)).pipe()
                .subscribe(nganhDaoTao => {
                    this.nganhDaoTao = new NganhDaoTao(nganhDaoTao);
                    this.pageType = 'edit';
                    console.log('edit');

                    this.nganhDaoTaoForm = this.createNganhDaoTaoForm();
                });
        }
        this.nganhDaoTaoForm = this.createNganhDaoTaoForm();

    }

    ngOnInit(): void {

    }

    createNganhDaoTaoForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.nganhDaoTao.Id],
            Ten: [this.nganhDaoTao.Ten],
            GhiChu: [this.nganhDaoTao.GhiChu],
            NganhId: [this.nganhDaoTao.NganhId],
            KichHoat: [this.nganhDaoTao.KichHoat],
            NhomChaId: [this.nganhDaoTao.NhomChaId]
            // ,
            // NgayTao: [this.nganhDaoTao.NgayTao],
            // NgaySua: [this.nganhDaoTao.NgaySua],
            // NguoiTao: [this.nganhDaoTao.NguoiTao],
            // NguoiSua: [this.nganhDaoTao.NguoiSua]
        });
    }

    /**
     * Save nganhDaoTao
     */
    saveNganhDaoTao(): void {
        const data = new NganhDaoTao(this.nganhDaoTaoForm.getRawValue());
        //console.log(data);
        this._nganhDaoTaoService.update(data)
            .subscribe(() => {
                // Show the success message
                this._matSnackBar.open('Đã cập nhật Ngành đào tạo', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'SuccessSnackbar'
                });
            },error=>{
                this._matSnackBar.open(error.error.Message, 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'ErrorSnackbar'
                });
            });
    }

    /**
     * Add nganhDaoTao
     */
    addNganhDaoTao(): void {
        const data = new NganhDaoTao(this.nganhDaoTaoForm.getRawValue());
        //console.log(data);
        this._nganhDaoTaoService.create(data)
            .subscribe((data) => {

                // Show the success message
                this._matSnackBar.open('Đã thêm Ngành đào tạo', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'SuccessSnackbar'
                });

                // Change the location with new one
                this._location.go('admission/nganh-dao-tao/' + data.Id);
                this.nganhDaoTaoForm.controls['Id'].setValue(data.Id);
                this.pageType='edit';
                this.ngOnInit();
            }, error=>{
                this._matSnackBar.open(error.error.Message, 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'ErrorSnackbar'
                });
            });
    }
    GoBack(): void {
        window.history.back();
    }
}

