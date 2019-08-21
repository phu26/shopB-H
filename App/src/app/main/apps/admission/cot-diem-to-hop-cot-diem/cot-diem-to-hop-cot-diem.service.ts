import { HttpClient } from '@angular/common/http';
import { CotDiem } from '../Models/CotDiem.model';
import { ResourceService } from 'app/main/apps/admission/resource.service';
import { Injectable } from '@angular/core';
import { CotDiem_ToHopCotDiem } from '../Models/CotDiem_ToHopCotDiem.model';

@Injectable()
export class CotDiemToHopCotDiemService extends ResourceService<CotDiem_ToHopCotDiem>
{
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, 'cotdiem_tohopcotdiems')

    }

}

