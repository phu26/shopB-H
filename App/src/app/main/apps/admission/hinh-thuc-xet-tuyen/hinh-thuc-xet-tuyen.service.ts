import { Injectable } from '@angular/core';
import { ResourceService } from '../resource.service';
import { HinhThucXetTuyen } from '../Models/HinhThucXetTuyen.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class HinhThucXetTuyenService extends ResourceService<HinhThucXetTuyen> {

  constructor(
    private _httpClient: HttpClient
  ) {
    super(_httpClient, 'hinhthucxettuyens')
  }

  getLoaiDiems(HinhThucXetTuyenId:number) {
    return this._httpClient.get(environment.urlApi + '/loaidiems/GetDSLoaiDiemTheoHTXT?hinhThucXetTuyenId='+HinhThucXetTuyenId, {
      responseType: 'text'
    });
  }
}