import { Component, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {}
  public getSnapshot(): void {
    this.trigger.next();
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage?.imageAsDataUrl;
    localStorage.setItem('imageDetails', this.captureImage);
    const a = localStorage.getItem('imageDetails');
    console.log(a);
  }
  public invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  fetchDetailsForCapturedImage() {
    const headers = new HttpHeaders();
    const myFormData = new FormData();

    headers.set('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');

    headers.set('Access-Control-Allow-Methods', 'Content-Type');
    headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    headers.set('Access-Control-Allow-Origin', 'http://localhost:4200/');
    // headers.set('Access-Control-Allow-Methods', 'Authorization');

    myFormData.append('image', this.captureImage);
    const req = this.http.post(
      'https://imageanalysisapi.azurewebsites.net/ImageAnalysis',
      myFormData,
      {
        headers,
        reportProgress: true,
        responseType: 'json',
      }
    );
    //.subscribe((data) => {
    //Check success message
    //  console.log(data);
    // });
    return req.subscribe((data) => {
      console.log(data);
    });
  }
}
