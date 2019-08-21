import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HeDaoTao } from '../../Models/HeDaoTao.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HeDaoTaoService } from '../he-dao-tao.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chi-tiet-he-dao-tao',
  templateUrl: './chi-tiet-he-dao-tao.component.html',
  styleUrls: ['./chi-tiet-he-dao-tao.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChiTietHeDaoTaoComponent implements OnInit {

  item: HeDaoTao = new HeDaoTao();
  pageType: string = 'new';
  itemForm: FormGroup;
  _idRouter: string;

  constructor(
    private _HeDoTaoService: HeDaoTaoService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this._idRouter = this.activatedRoute.snapshot.paramMap.get('id');
    if (this._idRouter == 'null') {
      this.item = new HeDaoTao();
      this.pageType = 'new';
      console.log('new');
    }
    else {
      this._HeDoTaoService.single(Number(this._idRouter)).pipe()
        .subscribe(item => {
          this.item = new HeDaoTao(item);
          this.pageType = 'edit';
          console.log('edit');
          this.itemForm = this.createItemForm();
        });
    }
    this.itemForm = this.createItemForm();
  }

  ngOnInit() {
  }
  createItemForm(): FormGroup {
    return this._formBuilder.group({
      Id: [this.item.Id],
      Ten: [this.item.Ten],
      KichHoat: [this.item.KichHoat]

    });
  }

  /**
   * edit
   */
  editItem(): void {
    const data = new HeDaoTao(this.itemForm.getRawValue());
    //console.log(data);
    this._HeDoTaoService.update(data)
      .subscribe(() => {
        // Show the success message
        this._matSnackBar.open('Đã cập nhật hệ đào tạo', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });
      }, error=>{
        this._matSnackBar.open('Cập nhật không thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
      });
  }

  /**
   * Add
   */
  addItem(): void {
    const data = new HeDaoTao(this.itemForm.getRawValue());
    //console.log(data);
    this._HeDoTaoService.create(data)
      .subscribe((data) => {

        // Show the success message
        this._matSnackBar.open('Đã thêm hệ đào tạo thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'SuccessSnackbar'
        });

        // Change the location with new one
        this._location.go('admission/dot-tuyen-sinh/' + data.Id);
        this.itemForm.controls['Id'].setValue(data.Id);
        this.pageType='edit';
      }, error=>{
        this._matSnackBar.open('Thêm không thành công', 'OK', {
          verticalPosition: 'top', horizontalPosition: 'right',
          duration: 2000, panelClass: 'ErrorSnackbar'
        });
      });
  }
  GoBack(): void {
    window.history.back();
  }
}
