import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-dong-bo-danh-muc',
  templateUrl: './dong-bo-danh-muc.component.html',
  styleUrls: ['./dong-bo-danh-muc.component.scss']
})
export class DongBoDanhMucComponent implements OnInit {
  checkNganhDaoTao: boolean = null;
  checkDoiTuongUuTien: boolean = null;
  checkKhuVucUuTien: boolean = null; 
  checkQuanHuyen:boolean=null;
  checkTinhThanh:boolean=null;
  selectedindex: number = 0;
  checkImportDuLieu:boolean=null;
  constructor() { }

  ngOnInit() {
  }
 
}
