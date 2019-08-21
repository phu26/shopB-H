import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-thi-sinh-item',
  templateUrl: './thi-sinh-item.component.html',
  styleUrls: ['./thi-sinh-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ThiSinhItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
