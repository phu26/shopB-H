import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-doi-tuong-uu-tien',
  templateUrl: './doi-tuong-uu-tien.component.html',
  styleUrls: ['./doi-tuong-uu-tien.component.scss']
})
export class DoiTuongUuTienComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
