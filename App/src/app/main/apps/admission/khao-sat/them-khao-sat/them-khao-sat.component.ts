import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { ActivatedRoute } from '@angular/router';
import { KhaoSat } from '../../Models/KhaoSat.model';
import { KhaoSatService } from '../khao-sat.service';

@Component({
    selector: 'app-them-khao-sat',
    templateUrl: './them-khao-sat.component.html',
    styleUrls: ['./them-khao-sat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ThemKhaoSatComponent implements OnInit {

    khaosat: KhaoSat = new KhaoSat();
    pageType: string = "new";
    khaosatForm: FormGroup;
    _idRouter: string;

    constructor(
        private _khaosatService: KhaoSatService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {
        this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
        if (this._idRouter == 'them') {
            this.khaosat = new KhaoSat();
            this.pageType = 'new';
            console.log('new');
        }
        else {
            this._khaosatService.single(Number(this._idRouter)).pipe()
                .subscribe(khaosat => {
                    debugger;
                    this.khaosat = new KhaoSat(khaosat);
                    this.pageType = 'edit';
                    console.log('edit');
                    this.khaosatForm = this.createKhaoSatForm();
                });
        }
        this.khaosatForm = this.createKhaoSatForm();
    }

    ngOnInit(): void {
    }

    createKhaoSatForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.khaosat.Id],
            Ten: [this.khaosat.Ten],
            KichHoat: [this.khaosat.KichHoat]
            // ,
            // NgayTao: [this.khaosat.NgayTao],
            // NgaySua: [this.khaosat.NgaySua],
            // NguoiTao: [this.khaosat.NguoiTao],
            // NguoiSua: [this.khaosat.NguoiSua]
        });
    }

    saveKhaoSat(): void {
        const data = this.khaosatForm.getRawValue();
        //data.handle = FuseUtils.handleize(data.name);

        this._khaosatService.update(data)
            .subscribe(() => {
                // Show the success message
                this._matSnackBar.open('Đã cập nhật Khảo sát', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }),
            error => {
                this._matSnackBar.open('Không lưu được khảo sát !!!', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            };
    }

    addKhaoSat(): void {
        const data = this.khaosatForm.getRawValue();
        //data.handle = FuseUtils.handleize(data.name);

        this._khaosatService.create(data)
            .subscribe(() => {

                // Show the success message
                this._matSnackBar.open('Đã thêm Khảo sát', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

                // Change the location with new one
                this._location.go('admission/khao-sat/' + data.Id);
                this.khaosatForm.controls['Id'].setValue(data.Id);
                this.pageType = 'edit';
            }),
            error => {
                this._matSnackBar.open('Không thêm được khảo sát !!!', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            };
    }
}
