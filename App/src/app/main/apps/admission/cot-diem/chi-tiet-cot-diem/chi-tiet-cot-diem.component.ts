import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';


import { ActivatedRoute } from '@angular/router';
import { CotDiem } from '../../Models/CotDiem.model';
import { CotDiemService } from '../cot-diem.service';


@Component({
    selector: 'app-chi-tiet-cot-diem',
    templateUrl: './chi-tiet-cot-diem.component.html',
    styleUrls: ['./chi-tiet-cot-diem.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChiTietCotDiemComponent implements OnInit {

    cotDiem: CotDiem = new CotDiem();
    pageType: string = 'new';
    cotDiemForm: FormGroup;
    public _idRouter: string;


    constructor(
        private _cotDiemService: CotDiemService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {
        //this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
        

    }

    ngOnInit(): void {
        //console.log(this._idRouter+'a');
        if (this._idRouter == 'them') {
            this.cotDiem = new CotDiem();
            this.pageType = 'new';
            console.log('new');
            //console.log(this.cotDiem);
        }
        else {
            this._cotDiemService.single(Number(this._idRouter)).pipe()
                .subscribe(cotDiem => {
                    this.cotDiem = new CotDiem(cotDiem);
                    this.pageType = 'edit';
                    console.log('edit');
                    //console.log(this.cotDiem);
                    this.cotDiemForm = this.createCotDiemForm();
                });
        }
        this.cotDiemForm = this.createCotDiemForm();
    }

    createCotDiemForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.cotDiem.Id],
            Ten: [this.cotDiem.Ten],
            GhiChu: [this.cotDiem.GhiChu],
            Ma:  [this.cotDiem.Ma]
            // ,
            // NgayTao: [this.cotDiem.NgayTao],
            // NgaySua: [this.cotDiem.NgaySua],
            // NguoiTao: [this.cotDiem.NguoiTao],
            // NguoiSua: [this.cotDiem.NguoiSua]
        });
    }

    /**
     * Save cotDiem
     */
    saveCotDiem(): void {
        const data = new CotDiem(this.cotDiemForm.getRawValue());
        //console.log(data);
        this._cotDiemService.update(data)
            .subscribe(() => {
                // Show the success message
                this._matSnackBar.open('Đã cập nhật Cột điểm', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'SuccessSnackbar'
                });
            },error=>{
                this._matSnackBar.open('Cập nhật không thành công: '+error.error.message, 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'ErrorSnackbar'
                });
            });
    }

    /**
     * Add cotDiem
     */
    addCotDiem(): void {
        const data = new CotDiem(this.cotDiemForm.getRawValue());
        console.log(data);
        this._cotDiemService.create(data)
            .subscribe(() => {

                // Show the success message
                this._matSnackBar.open('Đã thêm Cột điểm', 'OK', {
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
    GoBack(): void {
        window.history.back();
    }
}

