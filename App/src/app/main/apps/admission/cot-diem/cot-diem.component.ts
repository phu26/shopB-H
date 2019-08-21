import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-cot-diem',
  templateUrl: './cot-diem.component.html',
  styleUrls: ['./cot-diem.component.scss']
})
export class CotDiemComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
