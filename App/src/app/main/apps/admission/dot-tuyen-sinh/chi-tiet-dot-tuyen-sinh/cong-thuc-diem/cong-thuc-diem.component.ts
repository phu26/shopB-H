import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CotDiem } from '../../../Models/CotDiem.model';
import { MatDialogRef } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-cong-thuc-diem',
  templateUrl: './cong-thuc-diem.component.html',
  styleUrls: ['./cong-thuc-diem.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class CongThucDiemComponent implements OnInit {
  @Input() dotTuyenSinhId = '';
  congthucArea: string = '';
  point: number=0;
  btnCals: string[] = [
    "(",
    ")",
    "backspace",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    ".",
    "0",
    "<",
    ">",
    "&&",
    "||"
  ];
  constructor(
    public _dialogRef: MatDialogRef<CongThucDiemComponent>
    ) {

  }
  checkNum(s: string) {
    if (isNaN(Number(s)))
      return false;
    return true;
  }
  OnbtnCalClicked(s: string) {
    if (s == "backspace") {
      this.congthucArea = this.congthucArea.substr(0, (this.point - 1 < 0) ? 0 : this.point - 1) + this.congthucArea.substr(this.point, this.congthucArea.length);

      if (this.point > 0)
        this.point--;
    }
    else {
      this.congthucArea = this.congthucArea.substr(0, this.point) + s + this.congthucArea.substr(this.point, this.congthucArea.length);
      this.point+=s.length;
    }
  }
  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
      this.point = oField.selectionStart;
    }
  }
  ngOnInit() {
  }
  cotDiemEmit(cotDiem: CotDiem) {
    this.congthucArea += ` [${cotDiem.Ma}] `;
  }
  onConfirmClicked() {
    this._dialogRef.close(this.congthucArea);
  }
  keydownCongThuc(event){
    if(event.code != "Space")
    {
      event.preventDefault();
    }
  }

}
