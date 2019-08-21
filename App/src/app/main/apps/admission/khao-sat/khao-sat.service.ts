import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KhaoSat } from '../Models/KhaoSat.model';
import { ResourceService } from 'app/main/apps/admission/resource.service';

@Injectable()
export class KhaoSatService extends ResourceService<KhaoSat>
{
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, 'khaosats');

    }

}
