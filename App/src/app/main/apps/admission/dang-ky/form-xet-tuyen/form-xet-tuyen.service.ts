import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KhuVucUuTien } from '../../Models/KhuVucUuTien.model';
import { DoiTuongUuTien } from '../../Models/DoiTuongUuTien.model';
import { NganhDaoTao } from '../../Models/NganhDaoTao.model';
import { DanToc } from '../../Models/DanToc.model';

@Injectable({
  providedIn: 'root'
})
export class FormXetTuyenService {
  urlApi = environment.urlApi;

  constructor(private http: HttpClient) { }
  getAllPriorAreas(): Observable<KhuVucUuTien[]> {
    return this.http.get<KhuVucUuTien[]>(this.urlApi + '/khuvucuutiens/all')
  }
  getAllPriorObjs(): Observable<DoiTuongUuTien[]> {
    return this.http.get<DoiTuongUuTien[]>(this.urlApi + '/doituonguutiens/all')
  }
  getAllNganhDaoTaos(): Observable<NganhDaoTao[]> {
    return this.http.get<NganhDaoTao[]>(this.urlApi + '/nganhdaotaos/all')
  }

  getAllPriorAreasAsync(): Promise<KhuVucUuTien[]> {
    return this.http.get<KhuVucUuTien[]>(this.urlApi + '/khuvucuutiens/all').toPromise()
  }
  getAllPriorObjsAsync(): Promise<DoiTuongUuTien[]> {
    return this.http.get<DoiTuongUuTien[]>(this.urlApi + '/doituonguutiens/all').toPromise()
  }
  getAllNganhDaoTaosAsync(): Promise<NganhDaoTao[]> {
    return this.http.get<NganhDaoTao[]>(this.urlApi + '/nganhdaotaos/all').toPromise()
  }
  getAllDanTocsAsync(): Promise<DanToc[]> {
    return this.http.get<DanToc[]>(this.urlApi + '/dantocs/all').toPromise()
  }

}
