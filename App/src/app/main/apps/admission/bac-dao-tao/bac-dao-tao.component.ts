import { Component, OnInit,HostBinding } from '@angular/core';

@Component({
  selector: 'app-bac-dao-tao',
  templateUrl: './bac-dao-tao.component.html',
  styleUrls: ['./bac-dao-tao.component.scss']
})
export class BacDaoTaoComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
