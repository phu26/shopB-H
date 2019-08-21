import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BacDaoTao } from '../Models/BacDaoTao.model';
import { ResourceService } from 'app/main/apps/admission/resource.service';

@Injectable()
export class BacDaoTaoService extends ResourceService<BacDaoTao>
{
//  urlApi: string = 'http://tuyensinhapi.azurewebsites.net/api/v1.0';
    //urlApi: string = 'http://localhost:32687/api/v1.0';
    
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, 'bacdaotaos');

    }

}


