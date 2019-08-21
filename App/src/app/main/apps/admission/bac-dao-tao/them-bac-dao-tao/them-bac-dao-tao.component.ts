import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { ActivatedRoute } from '@angular/router';
import { BacDaoTao } from '../../Models/BacDaoTao.model';
import { BacDaoTaoService } from '../bac-dao-tao.service';


@Component({
  selector: 'app-them-bac-dao-tao',
  templateUrl: './them-bac-dao-tao.component.html',
  styleUrls: ['./them-bac-dao-tao.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ThemBacDaoTaoComponent implements OnInit {

  bacdaotao: BacDaoTao = new BacDaoTao();
  pageType: string = "new";
  bacdaotaoForm: FormGroup;
  _idRouter: string;

  constructor(
    private _bacdaotaoService: BacDaoTaoService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
    if (this._idRouter == 'them') {
      this.bacdaotao = new BacDaoTao();
      this.pageType = 'new';
      console.log('new');
    }
    else {
      this._bacdaotaoService.single(Number(this._idRouter)).pipe()
        .subscribe(khaosat => {
          //debugger;
          this.bacdaotao = new BacDaoTao(khaosat);
          this.pageType = 'edit';
          console.log('edit');
          this.bacdaotaoForm = this.createbacdaotaoForm();
        });
    }
    this.bacdaotaoForm = this.createbacdaotaoForm();
  }

  ngOnInit(): void {
  }

  createbacdaotaoForm(): FormGroup {
    return this._formBuilder.group({
      Id: [this.bacdaotao.Id],
      Ten: [this.bacdaotao.Ten],
    });
  }

  saveBacDaoTao(): void {
    const data = this.bacdaotaoForm.getRawValue();
    //data.handle = FuseUtils.handleize(data.name);

    this._bacdaotaoService.update(data)
      .subscribe(() => {
        // Show the success message
        this._matSnackBar.open('Đã cập nhật Bậc đào tạo', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });
      },
        error => {
          this._matSnackBar.open('Không lưu được bậc đào tạo', 'OK', {
            verticalPosition: 'top', horizontalPosition: 'right',
            duration: 2000, panelClass: 'ErrorSnackbar'
          });
        });
  }

  addBacDaoTao(): void {
    const data = this.bacdaotaoForm.getRawValue();
    //data.handle = FuseUtils.handleize(data.name);

    this._bacdaotaoService.create(data)
      .subscribe(newData => {

        // Show the success message
        this._matSnackBar.open('Đã thêm Bậc đào tạo', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });

        // Change the location with new one
        this._location.go('admission/bac-dao-tao/' + newData.Id);
        console.log(newData);
        this.bacdaotaoForm.controls['Id'].setValue(newData.Id);
        this.pageType = 'edit';
      },
        error => {
          this._matSnackBar.open('Không thêm được bậc đào tạo !!!', 'OK', {
            verticalPosition: 'top', horizontalPosition: 'right',
            duration: 2000, panelClass: 'ErrorSnackbar'
          });
        });
  }
}
