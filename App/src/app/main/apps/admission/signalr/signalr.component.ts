import { Component, OnInit,HostBinding } from '@angular/core';

@Component({
  selector: 'app-signalr',
  templateUrl: './signalr.component.html',
  styleUrls: ['./signalr.component.scss']
})
export class SignalrComponent implements OnInit {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.align-content') alignContent = 'center';
  constructor() { }

  ngOnInit() {
  }

}
