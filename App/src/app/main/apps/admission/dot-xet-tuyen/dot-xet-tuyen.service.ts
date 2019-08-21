import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../resource.service';
import { DotXetTuyen } from '../Models/DotXetTuyen.model';

@Injectable({
  providedIn: 'root'
})
export class DotXetTuyenService extends ResourceService<DotXetTuyen>
{   
    constructor(
        private _httpClient: HttpClient
    )
    {
        super(_httpClient, 'dotxettuyens')
    }
}
