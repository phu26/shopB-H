import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-khu-vuc-uu-tien',
  templateUrl: './khu-vuc-uu-tien.component.html',
  styleUrls: ['./khu-vuc-uu-tien.component.scss']
})
export class KhuVucUuTienComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  constructor() { }

  ngOnInit() {
  }

}
