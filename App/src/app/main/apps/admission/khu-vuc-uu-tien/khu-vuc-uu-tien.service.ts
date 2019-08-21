import { Injectable } from '@angular/core';
import { ResourceService } from '../resource.service';
import { KhuVucUuTien } from '../Models/KhuVucUuTien.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class KhuVucUuTienService extends ResourceService<KhuVucUuTien> {

  constructor(
    private _httpClient: HttpClient
)
{
    super(_httpClient, 'khuvucuutiens')
}
}
