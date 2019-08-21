import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-quan-huyen',
  templateUrl: './quan-huyen.component.html',
  styleUrls: ['./quan-huyen.component.scss']
})
export class QuanHuyenComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
