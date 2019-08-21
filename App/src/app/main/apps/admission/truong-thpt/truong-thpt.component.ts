import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-truong-thpt',
  templateUrl: './truong-thpt.component.html',
  styleUrls: ['./truong-thpt.component.scss']
})
export class TruongTHPTComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
