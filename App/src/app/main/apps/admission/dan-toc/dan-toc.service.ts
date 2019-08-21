import { Injectable } from '@angular/core';
import { ResourceService } from '../resource.service';
import { HttpClient } from '@angular/common/http';
import { DanToc } from '../Models/DanToc.model';

@Injectable({
  providedIn: 'root'
})



export class DanTocService extends ResourceService<DanToc>
{

  constructor(
    private _httpClient: HttpClient
  ) {
    super(_httpClient, 'dantocs');
  }
}
