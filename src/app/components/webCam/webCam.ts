import { Component, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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

  localApiUrl = 'https://localhost:7209/api/ImageAnalysis';
  serverApiUrl = 'https://imageanalysisapi.azurewebsites.net/api/ImageAnalysis';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

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

  fetchDetailsForCapturedImage() {
    if (this.captureImage) {
      const headers = new HttpHeaders();

      headers.set('Content-Type', 'multipart/form-data');
      headers.set('Accept', 'application/json');

      headers.set('Access-Control-Allow-Methods', 'Content-Type');
      headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
      headers.set('Access-Control-Allow-Origin', 'http://localhost:4200/');
      // headers.set('Access-Control-Allow-Methods', 'Authorization');

      var input = {
        imagePath: 'C:\\Images\\500front.png',
      };

      const req = this.http.post(this.localApiUrl, input, {
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
          this.toastr.success(data.message);
        }

        if (!data.success) {
          this.toastr.error(data.message);
        }
      });
    } else {
      this.toastr.error('Please scan image first. !!!');
    }
  }
}
