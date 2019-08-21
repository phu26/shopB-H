import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { ActivatedRoute } from '@angular/router';

import { HoSoXetTuyenService } from '../ho-so-xet-tuyen.service';
import { HoSoXetTuyen } from '../../Models/HoSoXetTuyen.model';


@Component({
    selector: 'app-chi-tiet-ho-so-xet-tuyen',
    templateUrl: './chi-tiet-ho-so-xet-tuyen.component.html',
    styleUrls: ['./chi-tiet-ho-so-xet-tuyen.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChiTietHoSoXetTuyenComponent implements OnInit {

    item: HoSoXetTuyen = new HoSoXetTuyen();
    pageType: string = 'new';
    itemForm: FormGroup;
    _idRouter: string;

    constructor(
        private _hoSoXetTuyenService: HoSoXetTuyenService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {

        this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
        if (this._idRouter == 'null') {
            this.item = new HoSoXetTuyen();
            this.pageType = 'new';
            console.log('new');
        }
        else {
            this._hoSoXetTuyenService.single(Number(this._idRouter)).pipe()
                .subscribe(item => {
                    this.item = new HoSoXetTuyen(item);
                    this.pageType = 'edit';
                    console.log('edit');
                    this.itemForm = this.createItemForm();
                });
        }
        this.itemForm = this.createItemForm();

    }

    ngOnInit(): void {

    }

    createItemForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.item.Id],
            Ten: [this.item.Ten],
            KichHoat: [this.item.KichHoat]
            // ,
            // NgayTao: [this.nganhDaoTao.NgayTao],
            // NgaySua: [this.nganhDaoTao.NgaySua],
            // NguoiTao: [this.nganhDaoTao.NguoiTao],
            // NguoiSua: [this.nganhDaoTao.NguoiSua]
        });
    }

    /**
     * edit
     */
    editItem(): void {
        const data = new HoSoXetTuyen(this.itemForm.getRawValue());
        //console.log(data);
        this._hoSoXetTuyenService.update(data)
            .subscribe(() => {
                // Show the success message
                this._matSnackBar.open('Đã cập nhật hồ sơ xét tuyển', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000
                });
            }), error => {
                this._matSnackBar.open('Không lưu được hồ sơ xét tuyển !!!', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            };
    }

    /**
     * Add
     */
    addItem(): void {
        const data = new HoSoXetTuyen(this.itemForm.getRawValue());
        //console.log(data);
        this._hoSoXetTuyenService.create(data)
            .subscribe((data) => {

                // Show the success message
                this._matSnackBar.open('Đã thêm hồ sơ xét tuyển thành công', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000
                });

                // Change the location with new one
                this._location.go('apps/admission/ho-so-xet-tuyen/' + data.Id);
            }),
            error => {
                this._matSnackBar.open('Không thêm được hồ sơ xét tuyển !!!', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            };
    }
    GoBack(): void {
        window.history.back();
    }
}

