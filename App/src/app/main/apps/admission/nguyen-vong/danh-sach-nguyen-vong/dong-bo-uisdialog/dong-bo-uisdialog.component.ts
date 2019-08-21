import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dong-bo-uisdialog',
  templateUrl: './dong-bo-uisdialog.component.html',
  styleUrls: ['./dong-bo-uisdialog.component.scss']
})
export class DongBoUISDialogComponent implements OnInit {
  checkNganhDaoTao: boolean = null;
  checkDoiTuongUuTien: boolean = null;
  checkKhuVucUuTien: boolean = null; 
  constructor() { }

  ngOnInit() {
  }

}
