import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
//// import { IImageInput } from 'src/app/modal/imageInput';
//// import { saveAs } from 'file-saver';

@Component({
  selector: 'app-webcam',
  templateUrl: './webCam.html',
  styleUrls: ['./webCam.scss'],
})
export class WebCamComponent implements OnInit {
  public webcamImage: WebcamImage;
  public captureImage = '';
  public informationOfCurrency: string[] = [];
  public sideOfNote: string = null;
  public validationSuccess = false;

  private trigger = new Subject();
  private nextWebcam = new Subject();
  // private input: IImageInput = { imagePath: 'C:\\Images\\500back.jpg' };
  // private input2: IImageInput = { imagePath: 'C:\\Images\\500front.png', };

  private localApiUrl = 'https://localhost:7209/api/ImageAnalysis';
  private serverApiUrl =
    'https://imageanalysisapi.azurewebsites.net/api/ImageAnalysis';
  private base64img: string = null;
  private base64textString: string = null;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {}

  public getSnapshot(): void {
    this.trigger.next();
  }
  public onCaptureImgClick(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage?.imageAsDataUrl;
    this.base64img = webcamImage?.imageAsBase64;
  }

  public invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  public async onFetchDetailsForCapturedImage() {
    if (this.captureImage == null || this.captureImage === '') {
      this.toastr.error('Please capture a nice image of the currency.');
    }

    const headers = this.requestHeader();
    const input = { imagePath: this.base64img };
    const serviceRequest = this.http.post(this.localApiUrl, input, { headers });

    serviceRequest.subscribe((result) => {
      this.processResult(result);
    });
  }

  public onClearScanImage() {
    this.captureImage = '';
    this.base64img = '';
  }

  private processResult(result: any): void {
    this.validationSuccess = result.success;
    if (!result.success) {
      this.toastr.error(result.message);
      return;
    } 

    this.toastr.success(result.message);
    this.toastr.success(result.sideOfNote);
    this.toastr.info(result.informationAboutNote);
    this.sideOfNote = result.sideOfNote;
    this.informationOfCurrency = result.informationAboutNote;
  }

  private requestHeader() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    // headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Methods', 'Content-Type');
    //  headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    return headers;
  }

  // // private dataURItoBlob(dataURI): Blob {
  // //   // convert base64/URLEncoded data component to raw binary data held in a string
  // //   let byteString;
  // //   if (dataURI.split(',')[0].indexOf('base64') >= 0) {
  // //     byteString = atob(dataURI.split(',')[1]);

  // //     const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // //     const ia = new Uint8Array(byteString.length);
  // //     for (let i = 0; i < byteString.length; i++) {
  // //       ia[i] = byteString.charCodeAt(i);
  // //     }

  // //     return new Blob([ia], { type: mimeString }); // returns size and type of img.
  // //   }
  // // }
}
