import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dot-xet-tuyen',
  templateUrl: './dot-xet-tuyen.component.html',
  styleUrls: ['./dot-xet-tuyen.component.scss']
})
export class DotXetTuyenComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  constructor() { }

  ngOnInit() {
  }

}
