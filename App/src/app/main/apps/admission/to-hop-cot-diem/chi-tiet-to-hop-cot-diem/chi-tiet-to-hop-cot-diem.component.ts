import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { fuseAnimations } from '@fuse/animations';


import { ActivatedRoute } from '@angular/router';
import { ToHopCotDiem } from '../../Models/ToHopCotDiem.model';
import { ToHopCotDiemService } from '../to-hop-cot-diem.service';

import { CotDiem_ToHopCotDiem } from '../../Models/CotDiem_ToHopCotDiem.model';
import { HinhThucXetTuyenService } from '../../hinh-thuc-xet-tuyen/hinh-thuc-xet-tuyen.service';
import { HinhThucXetTuyen } from '../../Models/HinhThucXetTuyen.model';

@Component({
    selector: 'app-chi-tiet-to-hop-cot-diem',
    templateUrl: './chi-tiet-to-hop-cot-diem.component.html',
    styleUrls: ['./chi-tiet-to-hop-cot-diem.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChiTietToHopCotDiemComponent implements OnInit {

    _dsLoaiCotDiem = [    ];
    toHopCotDiem: ToHopCotDiem = new ToHopCotDiem();
    hinhThucXetTuyens: HinhThucXetTuyen[] = [];
    pageType: string = 'new';
    toHopCotDiemForm: FormGroup;
    _idRouter: string;
    _cotDiem_toHopCotDiems: Array<CotDiem_ToHopCotDiem> = new Array<CotDiem_ToHopCotDiem>();

    constructor(
        public _toHopCotDiemService: ToHopCotDiemService,
        public _hinhThucXetTuyenService: HinhThucXetTuyenService,
        public _formBuilder: FormBuilder,
        public _location: Location,
        public _matSnackBar: MatSnackBar,
        public activatedRoute: ActivatedRoute
    ) {
        // this._toHopCotDiemService.all(undefined, undefined, 'NhomChaId is null', undefined).pipe()
        //     .subscribe(toHopCotDiems => {
        //         this.nganhChas = <Array<ToHopCotDiem>>toHopCotDiems;
        //         console.log(this.nganhChas);
        //     });
        this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
        if (this._idRouter == 'them') {
            this.toHopCotDiem = new ToHopCotDiem();
            this.pageType = 'new';
            console.log('new');
            //console.log(this.toHopCotDiem);
        }
        else {
            this._toHopCotDiemService.singleExpandCotDiem(Number(this._idRouter)).pipe()
                .subscribe(toHopCotDiem => {
                    this.toHopCotDiem = new ToHopCotDiem(toHopCotDiem);
                    this._cotDiem_toHopCotDiems = (this.toHopCotDiem.CotDiem_ToHopCotDiems);
                    // console.log(this._cotDiem_toHopCotDiems);
                    this.onSelectLoaiCotDiem();
                    this.pageType = 'edit';
                    console.log('edit');
                    // console.log(this.toHopCotDiem);
                    this.toHopCotDiemForm = this.createToHopCotDiemForm();
                    this.onSelectHinhThucXetTuyen();
                });
        }
        this.toHopCotDiemForm = this.createToHopCotDiemForm();
        this.onSelectHinhThucXetTuyen();

    }

    ngOnInit(): void {
        this._hinhThucXetTuyenService.all().subscribe(data => this.hinhThucXetTuyens = data);

    }
    onSelectHinhThucXetTuyen() {
        this._hinhThucXetTuyenService.getLoaiDiems(this.toHopCotDiemForm.controls['HinhThucXetTuyenId'].value).subscribe(
            (res: any) => {
                this._dsLoaiCotDiem = this.makechosen(JSON.parse(res));
                console.log(this._dsLoaiCotDiem);
            },
            err => {
                console.log(err.message);
            }
        );
    }

    makechosen(json: any[]): any[] {
        var dsLoaiDiem = [];
        json.forEach(element => {
            dsLoaiDiem.push({
                key: element.Ma, Loai: element.Ten, Chosen: false
            })
        })
        return dsLoaiDiem;
    }

    onAddCotDiemtoToHop(cotDiem: any) {
        var temp: CotDiem_ToHopCotDiem = new CotDiem_ToHopCotDiem();
        temp.CotDiem = cotDiem;
        temp.CotDiemId = cotDiem.Id;

        //console.log(temp.CotDiem);
        temp.ToHopCotDiemId = cotDiem.ToHopCotDiemId || 0;

        //   console.log(this._cotDiem_toHopCotDiems.findIndex(x=>x.CotDiemId===cotDiem.id));
        if (this._cotDiem_toHopCotDiems.findIndex(x => x.CotDiemId === cotDiem.Id) < 0)
            this._cotDiem_toHopCotDiems.push(temp);
        console.log(this._cotDiem_toHopCotDiems);

    }
    onSelectLoaiCotDiem() {
        this._dsLoaiCotDiem.forEach(loai => {
            if (this._cotDiem_toHopCotDiems.findIndex(x => x.Loai === loai.key) >= 0 && loai.key.indexOf('montuchon') < 0)
                loai.Chosen = true;
            else
                loai.Chosen = false;
        });
    }
    onRemoveCotDiemfromToHop(cotDiem_ToHopCotDiem: any) {
        this._cotDiem_toHopCotDiems.splice(this._cotDiem_toHopCotDiems.findIndex(x => x.CotDiemId === cotDiem_ToHopCotDiem.CotDiemId), 1);
        this.onSelectLoaiCotDiem();
    }
    createToHopCotDiemForm(): FormGroup {
        return this._formBuilder.group({
            Id: [this.toHopCotDiem.Id],
            Ten: [this.toHopCotDiem.Ten],
            KichHoat: [this.toHopCotDiem.KichHoat],
            HinhThucXetTuyenId: [this.toHopCotDiem.HinhThucXetTuyenId],
            MaToHopCotDiem:[this.toHopCotDiem.MaToHopCotDiem]
            // NgayTao: [this.toHopCotDiem.NgayTao],
            // NgaySua: [this.toHopCotDiem.NgaySua],
            // NguoiTao: [this.toHopCotDiem.NguoiTao],
            // NguoiSua: [this.toHopCotDiem.NguoiSua]
        });
        
    }

    /**
     * Save toHopCotDiem
     */
    saveToHopCotDiem(): void {
        var data: any = new ToHopCotDiem(this.toHopCotDiemForm.getRawValue());
        data.CotDiem_ToHopCotDiems = this._cotDiem_toHopCotDiems;
        for (let index = 0; index < this._cotDiem_toHopCotDiems.length; index++) {
            this, this._cotDiem_toHopCotDiems[index].Stt = index;
        }
        //console.log(data);
        this._toHopCotDiemService.update(data)
            .subscribe(() => {
                // Show the success message
                this._matSnackBar.open('Đã cập nhật tổ hợp cột điểm', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'SuccessSnackbar'
                });
            }, err => {
                this._matSnackBar.open(err.error.Message, 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'ErrorSnackbar'
                });
            });
    }

    /**
     * Add toHopCotDiem
     */
    addToHopCotDiem(): void {
        var data: any = new ToHopCotDiem(this.toHopCotDiemForm.getRawValue());
        for (let index = 0; index < this._cotDiem_toHopCotDiems.length; index++) {
            this, this._cotDiem_toHopCotDiems[index].Stt = index;
        }
        data.CotDiem_ToHopCotDiems = this._cotDiem_toHopCotDiems;
        console.log(data);
        this._toHopCotDiemService.create(data)
            .subscribe((data) => {

                // Show the success message
                this._matSnackBar.open('Đã thêm tổ hợp cột điểm', 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'SuccessSnackbar'
                });

                // Change the location with new one
                this._location.go('admission/to-hop-cot-diem/' + data.Id);
                this.toHopCotDiemForm.controls['Id'].setValue(data.Id);
                this.pageType='edit';
                this.ngOnInit();
            }, err => {
                this._matSnackBar.open(err.error.Message, 'OK', {
                    verticalPosition: 'top', horizontalPosition: 'right',
                    duration: 2000, panelClass: 'ErrorSnackbar'
                });
            });
    }
    GoBack(): void {
        window.history.back();
    }
    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);

        }
        //console.log(this._cotDiem_toHopCotDiems);
    }

}
@Component({
    selector: 'chi-tiet-to-hop-cot-diem-modal',
    templateUrl: './chi-tiet-to-hop-cot-diem-modal.component.html',
    styleUrls: ['./chi-tiet-to-hop-cot-diem.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChiTietToHopCotDiemModalComponent extends ChiTietToHopCotDiemComponent {
    constructor(
        public _toHopCotDiemService: ToHopCotDiemService,
        public _hinhThucXetTuyenService: HinhThucXetTuyenService,
        public _formBuilder: FormBuilder,
        public _location: Location,
        public _matSnackBar: MatSnackBar,
        public activatedRoute: ActivatedRoute,
        public _dialogRef: MatDialogRef<ChiTietToHopCotDiemModalComponent>
    ) {
        super(_toHopCotDiemService, _hinhThucXetTuyenService, _formBuilder, _location, _matSnackBar, activatedRoute);
    }
    onCloseClick() {

        this._dialogRef.close();

    }
}
