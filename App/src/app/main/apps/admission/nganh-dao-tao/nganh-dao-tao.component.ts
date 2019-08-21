import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-nganh-dao-tao',
  templateUrl: './nganh-dao-tao.component.html',
  styleUrls: ['./nganh-dao-tao.component.scss']
})
export class NganhDaoTaoComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
