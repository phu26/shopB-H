import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThiSinh } from '../../Models/ThiSinh.model';
import { Subject, of } from 'rxjs';
import { ThiSinhService } from '../thi-sinh.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-doi-mat-khau',
  templateUrl: './doi-mat-khau.component.html',
  styleUrls: ['./doi-mat-khau.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DoiMatKhauComponent implements OnInit {
  thiSinh: ThiSinh;
  doiMatKhauForm: FormGroup; 
  thiSinhId: string;
  currentPass: string;

  // Private
  private _unsubscribeAll: Subject<any>;
  length: any;
  lessonsSubject: any;
  loadingSubject: any;


/**
 * Constructor
 *
 * @param {thiSinhService} _doiTuongUuTienService
 * @param {FormBuilder} _formBuilder
 * @param {Location} _location
 * @param {MatSnackBar} _matSnackBar
 * @param {ActivatedRoute} _activatedRoute
 * @param {Router} _router
 */
  constructor(
    private _thiSinhService: ThiSinhService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    ) {
    // Set the default
    this.thiSinh = new ThiSinh();

    }

  ngOnInit(): void {
    this.doiMatKhauForm = this.createDoiMatKhauForm();
    this.thiSinhId = this._activatedRoute.snapshot.paramMap.get('thiSinhId');

    this._thiSinhService.single(Number(this.thiSinhId)).pipe()
      .subscribe(thiSinh => {
        this.thiSinh = new ThiSinh(thiSinh);
        
      });
  }

  /**
   * Create doiMatKhau form
   *
   * @returns {FormGroup}
   */
  createDoiMatKhauForm(): FormGroup {
    return this._formBuilder.group({
      MatKhau: '',
      MatKhauMoi: '',
      XacNhanMatKhauMoi: ''
    });
  }

  /**
   * Save thiSinh
   */
  updateMatKhau(): void {
    
    const data = new ThiSinh(this.doiMatKhauForm.getRawValue());

    // data.handle = FuseUtils.handleize(data.Ten);
    if (data.MatKhau === this.thiSinh.MatKhau ){
      if (this.doiMatKhauForm.controls['MatKhauMoi'].value === this.doiMatKhauForm.controls['XacNhanMatKhauMoi'].value) {
        this.thiSinh.MatKhau = this.doiMatKhauForm.controls['MatKhauMoi'].value;

        this._thiSinhService.update(this.thiSinh)
          .pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
          )
          .subscribe(() => {
            // Show the success message
            this._matSnackBar.open('Cập nhật thành công', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
            // Change the location with new one
            this._router.navigateByUrl('/');
            return;
          }
            // tslint:disable-next-line:no-unused-expression
          ), error => {
            this._matSnackBar.open('Không lưu được mật khẩu mới !!!', 'OK', {
              verticalPosition: 'top',
              duration: 2000
            });
          };
      }
      else {
        this._matSnackBar.open('Mật khẩu xác nhận không khớp', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      }
    }
    else {
      this._matSnackBar.open('Mật khẩu hiện tại không chính xác', 'OK', {
        verticalPosition: 'top',
        duration: 2000
      });
    }
  }
}
