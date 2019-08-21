import { Injectable } from '@angular/core';
import { XetTuyen } from '../Models/XetTuyen.model';
import { ResourceService } from '../resource.service';

import { ToHopCotDiem } from '../Models/ToHopCotDiem.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class XetTuyenService extends ResourceService<XetTuyen>
{
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, 'xettuyens')

    }  
}
