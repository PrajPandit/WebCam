import { Component, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IImageInput } from 'src/app/modal/imageInput';

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
  private input: IImageInput = { imagePath: 'C:\\Images\\500front.png' };

  private localApiUrl = 'https://localhost:7209/api/ImageAnalysis';
  private serverApiUrl =
    'https://imageanalysisapi.azurewebsites.net/api/ImageAnalysis';
  private base64img: string = null;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {}

  public getSnapshot(): void {
    this.trigger.next();
  }
  public onCaptureImgClick(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage?.imageAsDataUrl;
    this.base64img = btoa(this.captureImage);
  }

  public invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  public onFetchDetailsForCapturedImage() {
    if (this.captureImage) {
      const headers = this.requestHeader();
      
      // const input = {
      //   imagePath: 'C:\\Images\\500front.png',
      // };

      const input = {
        imagePath: this.base64img,
      };

      const req = this.http.post(this.localApiUrl, input, { headers, });

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

  public onClearScanImage() {
    this.captureImage = '';
    this.base64img = '';
  }

  public identifyCurrencyImageSide() {
    if (this.captureImage) {
      const headers = this.requestHeader();
      const param = '?imagePath=' + this.input.imagePath;

      const getReq = this.http.get(this.localApiUrl + param, { headers, });

      return getReq.subscribe((data: any) => {
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

  private requestHeader() {
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'multipart/form-data');
    // headers.set('Accept', 'application/json');

    headers.set('Access-Control-Allow-Methods', 'Content-Type');
    // headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    return headers;
  }
}
