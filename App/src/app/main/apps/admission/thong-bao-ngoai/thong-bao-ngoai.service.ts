import { Injectable } from '@angular/core';
import { ResourceService } from '../resource.service';
import { ThongBao } from '../Models/ThongBao.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThongBaoNgoaiService extends ResourceService<ThongBao>{
  constructor(
    private _httpClient: HttpClient
  ) {
    super(
      _httpClient, 'thongbaos'
    );

  }
  
}
