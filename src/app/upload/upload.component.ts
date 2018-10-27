import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  image: any;
  isUploading = false;
  progressPercent: number;
  @ViewChild('fileInput') fileInput;
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
  }


  handleFile(event) {
    this.progressPercent = null;
    this.image = event.target.files[0];
    const reader = new FileReader();
    // tslint:disable-next-line:no-shadowed-variable
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
    reader.readAsDataURL(this.image);
  }

  onUpload() {
    const fd = new FormData();
    this.isUploading = true;
    fd.append('profile_pic', this.fileInput.nativeElement.files[0]);
    this.httpClient.post('http://localhost:3333/upload', fd, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressPercent = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
          this.isUploading = false;
        }
      });
  }

}
