import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NganhDaoTao } from '../Models/NganhDaoTao.model';
import { ResourceService } from 'app/main/apps/admission/resource.service';
import { ToHopCotDiem } from '../Models/ToHopCotDiem.model';

@Injectable()
export class NganhDaoTaoService extends ResourceService<NganhDaoTao>
{
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient, 'nganhdaotaos')

    }  
    getToHopCotDiemByNganhDaoTaoID(nganhDaoTaoId?,dotTuyenSinhId?) {
        if(!nganhDaoTaoId) nganhDaoTaoId=-1;
        if(!dotTuyenSinhId) dotTuyenSinhId=-1;
        return this._httpClient
         .get(`${this.url}/${this.endpoint}/${nganhDaoTaoId}/${dotTuyenSinhId}/tohopcotdiems`)
         .map((data: any) => data as ToHopCotDiem[] );
    }

    getToHopCotDiemByNganhDaoTaoIDAsync(nganhDaoTaoId?,dotTuyenSinhId?) {
        if(!nganhDaoTaoId) nganhDaoTaoId=-1;
        if(!dotTuyenSinhId) dotTuyenSinhId=-1;
        return this._httpClient
         .get(`${this.url}/${this.endpoint}/${nganhDaoTaoId}/${dotTuyenSinhId}/tohopcotdiems`)
         .map((data: any) => data as ToHopCotDiem[] ).toPromise();
    }

    getNganhDaoTaoByDotTuyenSinhId(dotTuyenSinhId){
        return this._httpClient
         .get(`${this.url}/DotTuyenSinhs/${dotTuyenSinhId}/NganhDaoTaos`)
         .map((data: any[]) => data as NganhDaoTao[] );
    }

    
    getNganhDaoTaoByDotTuyenSinhIdAsync(dotTuyenSinhId,fillter){
        return this._httpClient
         .get(`${this.url}/DotTuyenSinhs/${dotTuyenSinhId}/NganhDaoTaos${fillter==null?'':'?filter='+fillter}`)
         .map((data: any[]) => data as NganhDaoTao[] ).toPromise();
    }

    getAllNganhDaoTaoAsync(){
        return this._httpClient
         .get(`${this.url}/NganhDaoTaos/all`)
         .map((data: any[]) => data as NganhDaoTao[] );
    }
}
