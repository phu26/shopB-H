import { Injectable } from '@angular/core';
import { ResourceService } from 'app/main/apps/admission/resource.service';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { ResponseType, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService extends ResourceService<any> {
  public progress: number;  
  public message: string;
  constructor(private _httpClient: HttpClient) {
    super(_httpClient, 'Uploads');
  }



  public upload(file: File) {
    const formData = new FormData();
    formData.append('files', file, file.name);
    //formData.append('danhmucid', danhmucid);
    //formData.append('dottuyensinhid', dottuyensinhid);
    return this.create(formData);
  }

  public importExcel(files,danhmucid,dottuyensinhid){
    const formData = new FormData();
    formData.append('files', files, files.name);
    formData.append('danhmucid', danhmucid);
    formData.append('dottuyensinhid', dottuyensinhid);
    // var dataExcel ={
    //   files: formData,
    //   danhmucid:danhmucid,
    //   dottuyensinhid:dottuyensinhid
    // };
    return this._httpClient.post(environment.urlApi+"/Uploads/importExcel",formData);
    //return this.createUpload_V1(JSON.stringify(dataExcel),environment.urlApi+"/Uploads/importExcel");

  }

  public uploadFileDinhKem(file: File,objectEx:any) {
    debugger;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadType', 'file');
    formData.append('objectEx',JSON.stringify(objectEx));
    return this.createUpload(formData,environment.urlApiUpload);
    // return this._httpClient.post('http://localhost:61186/api/v1.0/Uploads/PostFileDinhKem', file, {
    //   headers: new HttpHeaders({ 
    //     'Content-Type': 'multipart/form-data'
    //   }),
    //   responseType: 'text'
    // });
  }

  public downloadFileDinhKem(path: string, type:string){
    // const httpOptions = {
    //   responseType: 'blob' as 'blob'
    // };
    // return this._httpClient.post('http://localhost:61186/api/v1.0/Uploads/GetFileDinhKem/?path=' + path, '', httpOptions).map(
    //   (res) => {
    //     debugger;
    //     var blob = new Blob([res], {type: type} )
    //     return blob;            
    //   });

    window.open("https://www.google.com", "_blank");
    }

  // downloadFileDinhKem(path:string, type:string): Observable<Blob> {
  //   return this._httpClient.post<Blob>('http://localhost:61186/api/v1.0/Uploads/GetFileDinhKem/?path=' + path,
  //     { responseType: 'blob' }
  //   );
  // }

  // downloadFileDinhKem(path:string, type:string) {
  //   return this._httpClient.post('http://localhost:61186/api/v1.0/Uploads/GetFileDinhKem/?path=' + path,
  //   { responseType: ResponseContentType.Blob })
  //   .map(
  //     (res) => {
  //           var blob = new Blob([res], {type: type} )
  //           return blob;            
  //     });
  // }

  // public downloadFileDinhKem(path: string, type: string): Observable<any> {
  //   return this._httpClient.post('http://localhost:61186/api/v1.0/Uploads/GetFileDinhKem/?path=' + path, {
  //     observe: 'response',
  //     responseType: 'blob'
  //   });
  //   // .map((res) => {
  //   //   debugger;
  //   //   var blob = new Blob([res.blob()], {type: type})
  //   //   return blob;            
  //   // });
  // }
}
