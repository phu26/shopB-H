import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-xet-tuyen',
  templateUrl: './xet-tuyen.component.html',
  styleUrls: ['./xet-tuyen.component.scss']
})
export class XetTuyenComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
