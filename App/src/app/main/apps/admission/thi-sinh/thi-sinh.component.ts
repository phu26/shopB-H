import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-thi-sinh',
  templateUrl: './thi-sinh.component.html',
  styleUrls: ['./thi-sinh.component.scss']
})
export class ThiSinhComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
