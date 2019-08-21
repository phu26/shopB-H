import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DotXetTuyen } from '../../Models/DotXetTuyen.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DotXetTuyenService } from '../dot-xet-tuyen.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { DotTuyenSinhService } from '../../dot-tuyen-sinh/dot-tuyen-sinh.service';

@Component({
  selector: 'app-them-dot-xet-tuyen',
  templateUrl: './them-dot-xet-tuyen.component.html',
  styleUrls: ['./them-dot-xet-tuyen.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ThemDotXetTuyenComponent implements OnInit {

  dotXetTuyen: DotXetTuyen = new DotXetTuyen();
  pageType: string = 'new';
  dotXetTuyenForm: FormGroup;
  _idRouter: string;
  dsdotTuyenSinhs: any[]=[];

  constructor(
    private _dotXetTuyenService: DotXetTuyenService,
    private _dotTuyenSinhService: DotTuyenSinhService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this._dotTuyenSinhService.all().pipe()
            .subscribe(dotTuyenSinhs => {
                this.dsdotTuyenSinhs = dotTuyenSinhs;
            });
    this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
    if (this._idRouter == 'them') {
      this.dotXetTuyen = new DotXetTuyen();
      this.pageType = 'new';
      console.log('new');

    }
    else {
      this._dotXetTuyenService.single(Number(this._idRouter)).pipe()
        .subscribe(dotXetTuyen => {
          this.dotXetTuyen = new DotXetTuyen(dotXetTuyen);
          this.pageType = 'edit';
          console.log('edit')
          this.dotXetTuyenForm = this.createDotXetTuyenForm();

        });
    }
    this.dotXetTuyenForm = this.createDotXetTuyenForm();
  }

  ngOnInit() {
  }
  createDotXetTuyenForm(): FormGroup {
    return this._formBuilder.group({
      Id: [this.dotXetTuyen.Id],
      Ten: [this.dotXetTuyen.Ten],
      DotTuyenSinhId: [this.dotXetTuyen.DotTuyenSinhId],
      KichHoat: [this.dotXetTuyen.KichHoat],
      CongThucTinhDiem: [this.dotXetTuyen.CongThucTinhDiem]
    });
  }
  /**
   * cập nhật đợt xét tuyển
   */
  saveDotXetTuyen(): void {
    const data = new DotXetTuyen(this.dotXetTuyenForm.getRawValue());

    this._dotXetTuyenService.update(data)
      .subscribe(() => {
        // Show the success message
        this._matSnackBar.open('Đã cập nhật Đợt xét tuyển', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      }),error=>{
        this._matSnackBar.open('Không lưu được đợt xét tuyển !!!', 'OK', {
          verticalPosition: 'top',
          duration: 2000
      });
      };
  }
  /**
   * thêm đợt xét tuyển
   */
  addDotXetTuyen(): void {
    
    const data = new DotXetTuyen(this.dotXetTuyenForm.getRawValue());

    this._dotXetTuyenService.create(data)
      .subscribe((data) => {

        // Show the success message
        this._matSnackBar.open('Thêm Đợt xét tuyển thành công!!!', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this._location.go('admission/dot-xet-tuyen/' + data.Id);
        this.pageType='edit';
      }),
      error=>{
        this._matSnackBar.open('Không thêm được đợt xét tuyển !!!', 'OK', {
          verticalPosition: 'top',
          duration: 2000
      });
      };
  }
  GoBack(): void {
    window.history.back();
  }
}
