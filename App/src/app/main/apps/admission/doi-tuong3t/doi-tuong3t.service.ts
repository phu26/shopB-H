import { Injectable } from '@angular/core';
import { ResourceService } from '../resource.service';
import { DoiTuong3T } from '../Models/DoiTuong3T.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoiTuong3tService extends ResourceService<DoiTuong3T>
{

  constructor(
    private _httpClient: HttpClient
  ) {
    super(_httpClient, 'DoiTuong3T');
  }
}
