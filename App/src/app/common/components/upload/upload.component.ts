import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { UploadService } from './upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  percentDone: number;
  uploadSuccess: boolean;
  constructor(private _uploadService: UploadService) { }

  ngOnInit() {
  }

  upload() {
    debugger;
    var files = this.fileInput.nativeElement.files;
    this.uploadAndProgress(files);
  }

  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    this._uploadService.upload(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.uploadSuccess = true;
      }
  });;


    // this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
    //   .subscribe(event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       this.percentDone = Math.round(100 * event.loaded / event.total);
    //     } else if (event instanceof HttpResponse) {
    //       this.uploadSuccess = true;
    //     }
    // });
  }

}
