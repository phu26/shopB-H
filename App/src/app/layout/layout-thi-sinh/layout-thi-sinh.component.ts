import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ThongBaoNgoaiService } from 'app/main/apps/admission/thong-bao-ngoai/thong-bao-ngoai.service';
import { ThongBao } from 'app/main/apps/admission/Models/ThongBao.model';

@Component({
  selector: 'app-layout-shop',
  templateUrl: './layout-shop.component.html',
  styleUrls: ['./layout-shop.component.scss','./layout-shop2.component.scss','./layout-shop3.component.scss']
})
export class LayoutThiSinhComponent implements OnInit {
  authData: any = null;
  loggedIn: boolean = false;
  constructor() { }

  ngOnInit() {
    this.authData = JSON.parse(localStorage.getItem('authorizationData'));
    if (this.authData != null) {
      this.loggedIn = true;
    }
  }
  clickDangNhap() {
    var redirect_url = encodeURIComponent(environment.urlApp + 'tuyen-sinh/');
    window.open(environment.urlSSO + "#/login?redirect_url=" + redirect_url + "&clientId=tsadmission", '_self');
  }

  logOut() {
    localStorage.removeItem('authorizationData');
    var redirect_url = encodeURIComponent(environment.urlApp + 'tuyen-sinh/');
    window.open(environment.urlSSO + "#/login?redirect_url=" + redirect_url + "&clientId=tsadmission&key=signout", '_self');
  }
}

@Component({
  selector: 'app-layout-thi-sinh-hiu',
  templateUrl: './layout-thi-sinh.component.html',
  styleUrls: ['./layout-thi-sinh.component.scss']
})
export class LayoutThiSinhHIUComponent extends LayoutThiSinhComponent {
}

@Component({
  selector: 'app-layout-shop',
  templateUrl: './layout-shop.component.html',
  styleUrls: ['./layout-shop.component.scss','./layout-shop2.component.scss','./layout-shop3.component.scss']
})
export class LayoutShopComponent extends LayoutThiSinhComponent {
}

@Component({
  selector: 'app-layout-thi-sinh-sona',
  templateUrl: './layout-thi-sinh.component.sonadezi.html',
  styleUrls: ['./layout-thi-sinh.component.sonadezi.scss']
})
export class LayoutThiSinhSONAComponent extends LayoutThiSinhComponent {
}

@Component({
  selector: 'app-layout-thi-sinh-yersin',
  templateUrl: './layout-thi-sinh.component.yersin.html',
  styleUrls: ['./layout-thi-sinh.component.yersin.scss']
})
export class LayoutThiSinhYersinComponent extends LayoutThiSinhComponent {
}

@Component({
  selector: 'app-layout-thi-sinh-neu',
  templateUrl: './layout-thi-sinh.component.neu.html',
  styleUrls: ['./layout-thi-sinh.component.neu.scss']
})
export class LayoutThiSinhNeuComponent extends LayoutThiSinhComponent {
}

@Component({
  selector: 'app-layout-thi-sinh-qnu',
  templateUrl: './layout-thi-sinh.component.qnu.html',
  styleUrls: ['./layout-thi-sinh.component.qnu.scss']
})
export class LayoutThiSinhQnuComponent extends LayoutThiSinhComponent {
}


@Component({
  selector: 'app-layout-thi-sinh-law',
  templateUrl: './layout-thi-sinh.component.law.html',
  styleUrls: ['./layout-thi-sinh.component.law.scss']
})
export class LayoutThiSinhLawComponent extends LayoutThiSinhComponent {

  thongBao = new ThongBao();
  tbHTML: string;
  constructor(private _ThongBaoService: ThongBaoNgoaiService) {
    super();
    this._ThongBaoService.single(1).pipe().subscribe(item => {
      this.thongBao = new ThongBao(item);
      console.log(this.thongBao.NoiDung);
      this.tbHTML = this.thongBao.NoiDung;
      console.log("Thông báo" + this.tbHTML);
    });
    
    
  }
}

@Component({
  selector: 'app-layout-thi-sinh-dnu',
  templateUrl: './layout-thi-sinh.component.dnpu.html',
  styleUrls: ['./layout-thi-sinh.component.dnpu.scss']
})
export class LayoutThiSinhDnuComponent extends LayoutThiSinhComponent {
}