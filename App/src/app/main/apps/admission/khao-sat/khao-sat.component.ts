import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-khao-sat',
  templateUrl: './khao-sat.component.html',
  styleUrls: ['./khao-sat.component.scss']
})
export class KhaoSatComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
