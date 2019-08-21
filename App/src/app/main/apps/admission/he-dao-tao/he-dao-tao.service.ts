import { Injectable } from '@angular/core';
import { HeDaoTao } from '../Models/HeDaoTao.model';
import { ResourceService } from '../resource.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeDaoTaoService extends ResourceService<HeDaoTao>
{
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, 'hedaotaos')
    }
}
