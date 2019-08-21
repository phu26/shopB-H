import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoiTuongUuTien } from '../Models/DoiTuongUuTien.model';
import { ResourceService } from '../resource.service';

@Injectable(

)
export class DoiTuongUuTienService extends ResourceService<DoiTuongUuTien>
{

  constructor(
    private _httpClient: HttpClient
  ) {
    super(_httpClient, 'doituonguutiens');
  }
}


