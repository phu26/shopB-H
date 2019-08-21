import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { ActivatedRoute } from '@angular/router';
import { TruongThptService } from '../truong-thpt.service';
import { TruongTHPT } from '../../Models/TruongTHPT.model';

@Component({
  selector: 'app-them-truong-thpt',
  templateUrl: './them-truong-thpt.component.html',
  styleUrls: ['./them-truong-thpt.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ThemTruongThptComponent implements OnInit {

  truongthpt: TruongTHPT = new TruongTHPT();
  pageType: string = "new";
  truongthptForm: FormGroup;
  _idRouter: string;

  constructor(
    private _truongthptService: TruongThptService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
    if (this._idRouter == 'them') {
      this.truongthpt = new TruongTHPT();
      this.pageType = 'new';
      console.log('new');
    }
    else {
      this._truongthptService.single(Number(this._idRouter)).pipe()
        .subscribe(truongthpt => {
          this.truongthpt = new TruongTHPT(truongthpt);
          this.pageType = 'edit';
          console.log('edit');
          this.truongthptForm = this.createTruongTHPTForm();
        });
    }
    this.truongthptForm = this.createTruongTHPTForm();
  }

  ngOnInit() {
  }

  createTruongTHPTForm(): FormGroup {
    return this._formBuilder.group({
      Id: [this.truongthpt.Id],
      Ten: [this.truongthpt.Ten],
      KichHoat: [this.truongthpt.KichHoat],
      MaTruong:[this.truongthpt.MaTruong],
      MaTinh:[this.truongthpt.MaTinh],
      Loai:[this.truongthpt.Loai]
      // ,
      // NgayTao: [this.truongthpt.NgayTao],
      // NgaySua: [this.truongthpt.NgaySua],
      // NguoiTao: [this.truongthpt.NguoiTao],
      // NguoiSua: [this.truongthpt.NguoiSua]
    });
  }

  saveTruongTHPT(): void {
    const data = this.truongthptForm.getRawValue();
    //data.handle = FuseUtils.handleize(data.name);

    this._truongthptService.update(data)
      .subscribe(() => {
        // Show the success message
        this._matSnackBar.open('Đã cập nhật trường THPT', 'OK', {
          verticalPosition: 'top',horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });
      }, error => {
        this._matSnackBar.open('Cập nhật không thành công', 'OK', {
          verticalPosition: 'top',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
      });
  }

  addTruongTHPT(): void {
    const data = this.truongthptForm.getRawValue();
    //data.handle = FuseUtils.handleize(data.name);

    this._truongthptService.create(data)
      .subscribe((data) => {

        // Show the success message
        this._matSnackBar.open('Đã thêm trường THPT', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });

        // Change the location with new one
        this._location.go('admission/truong/' + data.Id);
        this.truongthptForm.controls['Id'].setValue(data.Id);
        this.pageType='edit';
      }),error=>{
        this._matSnackBar.open('Không thêm được trường !!!', 'OK', {
          verticalPosition: 'top',
          duration: 2000, panelClass: 'ErrorSnackbar'
      });
      };
     
  }
}
