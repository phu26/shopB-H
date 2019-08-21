import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DoiTuongUuTien } from '../../Models/DoiTuongUuTien.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DoiTuongUuTienService } from '../doi-tuong-uu-tien.service';
import { MatSnackBar } from '@angular/material';
import { Subject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
// import { FuseUtils } from '@fuse/utils';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-them-doi-tuong-uu-tien',
  templateUrl: './them-doi-tuong-uu-tien.component.html',
  styleUrls: ['./them-doi-tuong-uu-tien.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ThemDoiTuongUuTienComponent implements OnInit, OnDestroy {
  doiTuongUuTien: DoiTuongUuTien;
  pageType: string;
  doiTuongUuTienForm: FormGroup;
  _idRouter: string;

  // Private
  private _unsubscribeAll: Subject<any>;
  length: any;
  lessonsSubject: any;
  loadingSubject: any;

  /**
   * Constructor
   * 
   * @param {doiTuongUuTienService} _doiTuongUuTienService
   * @param {FormBuilder} _formBuilder
   * @param {Location} _location
   * @param {MatSnackBar} _matSnackBar
   * @param {ActivatedRoute} _activatedRoute
   */
  constructor(
    private _doiTuongUuTienService: DoiTuongUuTienService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute
  ) {
    // Set the default
    this.doiTuongUuTien = new DoiTuongUuTien();

    // Set the private defaults
    this._unsubscribeAll = new Subject();

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to update doiTuongUuTien on changes
    this._idRouter = this._activatedRoute.snapshot.paramMap.get('pageType');
    if (this._idRouter === 'new') {
      this.doiTuongUuTien = new DoiTuongUuTien();
      this.pageType = 'new';
      console.log('new');
    }
    else {
      this._doiTuongUuTienService.single(Number(this._idRouter)).pipe()
        .subscribe(doiTuongUuTien => {
          this.doiTuongUuTien = new DoiTuongUuTien(doiTuongUuTien);
          this.pageType = 'edit';
          console.log('edit');
          this.doiTuongUuTienForm = this.createDoiTuongUuTienForm();
        });
    }
    this.doiTuongUuTienForm = this.createDoiTuongUuTienForm();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create doiTuongUuTien form
   *
   * @returns {FormGroup}
   */
  createDoiTuongUuTienForm(): FormGroup {
    return this._formBuilder.group({
      Id: [this.doiTuongUuTien.Id],
      Ten: [this.doiTuongUuTien.Ten],
      DiemCong: [this.doiTuongUuTien.DiemCong],
      MaDoiTuongUuTien: [this.doiTuongUuTien.MaDoiTuongUuTien],
      NgayTao: [this.doiTuongUuTien.NgayTao],
      NgaySua: [this.doiTuongUuTien.NgaySua],
      NguoiTao: [this.doiTuongUuTien.NguoiTao],
      NguoiSua: [this.doiTuongUuTien.NguoiSua],
      // ThiSinhs: [this.doiTuongUuTien.ThiSinhs]
    });
  }

  /**
   * Save doiTuongUuTien
   */
  saveDoiTuongUuTien(): void {
    const data = new DoiTuongUuTien(this.doiTuongUuTienForm.getRawValue());
    // data.handle = FuseUtils.handleize(data.Ten);

    this._doiTuongUuTienService.update(data)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(() => {
        // Show the success message
        this._matSnackBar.open('Cập nhật đối tượng ưu tiên thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 3000, panelClass: 'SuccessSnackbar'
        });
        // Change the location with new one
        // this._location.go('apps/admission/doit-tuong-uu-tien/' + data.id + '/' + data.handle);
        this._location.go('apps/admission/doi-tuong-uu-tien');
      }
      ), error => {
        this._matSnackBar.open('Không lưu được đối tượng ưu tiên !!!', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 3000, panelClass: 'ErrorSnackbar'
        });
      };
  }

  /**
   * Add doiTuongUuTien
   */
  addDoiTuongUuTien(): void {
    const data = new DoiTuongUuTien(this.doiTuongUuTienForm.getRawValue());
    // data.handle = FuseUtils.handleize(data.ten);

    // const data = new DoiTuongUuTien(this.doiTuongUuTienForm.getRawValue());
    // this.doiTuongUuTien = new DoiTuongUuTien(this.doiTuongUuTienForm.getRawValue());
    data.NgayTao = new Date();
    data.NguoiTao = 'nmphong';

    this._doiTuongUuTienService.create(data)
      // .pipe(
      //   catchError(() => of([])),
      //   finalize(() => this.loadingSubject.next(false))
      // )
      .subscribe((data) => {
        // Show the success message
        this._matSnackBar.open('Thêm đối tượng ưu tiên thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 3000, panelClass: 'SuccessSnackbar'
        });

        // Change the location with new one
        this._location.go('admission/doi-tuong-uu-tien/' + data.Id);
        this.doiTuongUuTienForm.controls['Id'].setValue(data.Id);
        this.pageType = 'edit';
      }
      ), error => {
        this._matSnackBar.open('Không thêm được đối tượng ưu tiên !!!', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 5000, panelClass: 'ErrorSnackbar'
        });
      };
  }

}