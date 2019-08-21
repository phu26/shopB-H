import { Injectable } from '@angular/core';
import { ResourceService } from 'app/main/apps/admission/resource.service';
import { Upload } from './Upload.model';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends ResourceService<Upload> {
  public progress: number;  
  public message: string;
  constructor(private _httpClient: HttpClient) {
    super(_httpClient, 'Uploads','http://localhost:32687/api/v1.0');
  }

  public upload(formData: FormData) {
    return this.httpClient
      .post<any>(`http://localhost:32687/api/v1.0/uploads`, formData, {reportProgress: true, observe: 'events'});
  }
 
}
