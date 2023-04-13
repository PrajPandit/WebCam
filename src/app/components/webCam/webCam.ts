import { Component, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IImageInput } from 'src/app/modal/imageInput';
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

  private image;

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

  saveImage(event: any) {
    const target = event.target.files;
    console.log(target);
  }

  // saveImage(files: FileList) {
  //   const file: File = files.item(0);
  //   const myReader: FileReader = new FileReader();

  //   myReader.onloadend = (e) => {
  //     this.image = myReader.result;
  //   };

  //   myReader.readAsDataURL(file);
  // }

  public onFetchDetailsForCapturedImage() {
    const imageURl = '/assets/icon/favicon.png';
    const input: IImageInput = { imagePath: imageURl };

    if (!this.captureImage) {
      // this.toaster.error('Please scan image first. !!!');
    } else {
      let convertedUrlBlob = null;
      convertedUrlBlob = this.dataURItoBlob(this.captureImage);

      const formData = new FormData();
      formData.set('imagePath', convertedUrlBlob);

      this.onPost(formData);
    }
  }

  private dataURItoBlob(dataURI): Blob {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    }
    // else {
    //   byteString = unescape(dataURI.split(',')[1]);
    // }

    // separate out the mime component.
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString }); // returns size and type of img.
  }

  private onPost(input: any) {
    const headers = new HttpHeaders({
      contentType: 'application/json',
      accept: 'undefined',
    });

    const req = this.http.post(this.localApiUrl, input, { headers });
    return req.subscribe((data: any) => {
      if (data.success) {
        //this.toaster.success(data.message);
      }

      if (!data.success) {
        //this.toaster.error(data.message);
      }
    });
  }
}
