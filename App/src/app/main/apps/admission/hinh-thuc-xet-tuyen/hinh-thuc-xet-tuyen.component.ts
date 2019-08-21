import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-hinh-thuc-xet-tuyen',
  templateUrl: './hinh-thuc-xet-tuyen.component.html',
  styleUrls: ['./hinh-thuc-xet-tuyen.component.scss']
})
export class HinhThucXetTuyenComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  constructor() { }

  ngOnInit() {
  }

}
