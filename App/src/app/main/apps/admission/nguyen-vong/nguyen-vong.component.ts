import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-nguyen-vong',
  templateUrl: './nguyen-vong.component.html',
  styleUrls: ['./nguyen-vong.component.scss']
})
export class NguyenVongComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') aligncontent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
