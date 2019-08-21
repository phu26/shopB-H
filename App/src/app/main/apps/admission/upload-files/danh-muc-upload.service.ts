import { Injectable } from '@angular/core';
import { ResourceService } from 'app/main/apps/admission/resource.service';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { create } from 'domain';
import { DanhMucUpload } from '../Models/DanhMucUpload.model';

@Injectable({
  providedIn: 'root'
})
export class DanhMucUploadService extends ResourceService<DanhMucUpload> {
  public progress: number;  
  public message: string;
  constructor(private _httpClient: HttpClient) {
    super(_httpClient, 'DanhMucUploads');
  }
}
