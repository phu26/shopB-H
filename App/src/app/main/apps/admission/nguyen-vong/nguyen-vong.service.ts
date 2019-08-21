import { Injectable } from '@angular/core';
import { ResourceService } from 'app/main/apps/admission/resource.service';

import { HttpClient } from '@angular/common/http';
import { NguyenVong } from '../Models/NguyenVong.model';

@Injectable()
export class NguyenVongService extends ResourceService<NguyenVong> {

  constructor(private _httpClient: HttpClient) {
    super(_httpClient, 'nguyenvongs')
   }
    
}
