import { Component, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { IImageInput } from 'src/app/modal/imageInput';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-webcam',
  templateUrl: './webCam.html',
  styleUrls: ['./webCam.scss'],
})
export class WebCamComponent implements OnInit {
  public webcamImage: WebcamImage;
  public captureImage = '';

  private trigger = new Subject();
  private nextWebcam = new Subject();

  private localApiUrl = 'https://localhost:7209/api/ImageAnalysis';
  // private serverApiUrl = 'https://imageanalysisapi.azurewebsites.net/api/ImageAnalysis';

  constructor(private http: HttpClient) {}

  ngOnInit() {}
  public getSnapshot(): void {
    this.trigger.next();
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage?.imageAsDataUrl;
  }

  public invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  public onFetchDetailsForCapturedImage() {
    if (this.captureImage) {
      let convertedUrlBlob = null;
      convertedUrlBlob = this.dataURItoBlob(this.captureImage);

      const formData = new FormData(document.forms[0]);
      formData.append('imagePath', convertedUrlBlob);

      const headers = new HttpHeaders();

      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');

      headers.set('Access-Control-Allow-Methods', 'Content-Type');
      headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
      headers.set('Access-Control-Allow-Origin', 'http://localhost:4200/');
      // headers.set('Access-Control-Allow-Methods', 'Authorization');

      // const input: IImageInput = {
      //   imagePath: 'C:\\Images\\500front.png',
      // };

      const req = this.http.post(this.localApiUrl, formData, {
        headers,
        reportProgress: true,
        responseType: 'json',
      });
      //.subscribe((data) => {
      //Check success message
      //  console.log(data);
      // });
      return req.subscribe((data: any) => {
        if (data.success) {
          //this.toaster.success(data.message);
        }

        if (!data.success) {
          //this.toaster.error(data.message);
        }
      });
    } else {
     // this.toaster.error('Please scan image first. !!!');
    }
  }

  private dataURItoBlob(dataURI): Blob {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }
}
