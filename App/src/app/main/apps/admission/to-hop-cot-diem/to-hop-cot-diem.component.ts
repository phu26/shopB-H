import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-to-hop-cot-diem',
  templateUrl: './to-hop-cot-diem.component.html',
  styleUrls: ['./to-hop-cot-diem.component.scss']
})
export class ToHopCotDiemComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
