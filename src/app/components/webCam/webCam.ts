import { Component, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IImageInput } from 'src/app/modal/imageInput';
 //var FileSaver = require('filesaver');
 import { saveAs } from 'file-saver';
//var fs = require('fs');
//import { writeFile } from 'fs';
var FileSaver = require('file-saver');

var folders = {
  images: 'C:\\Images\\'
}

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
  private input: IImageInput = { imagePath: 'C:\\Images\\500back.jpg' };

  private localApiUrl = 'https://localhost:7209/api/ImageAnalysis';
  private serverApiUrl =
    'https://imageanalysisapi.azurewebsites.net/api/ImageAnalysis';
  private base64img: string = null;

  constructor(private http: HttpClient, private toastr: ToastrService) {
  
}

  ngOnInit() {}

  public getSnapshot(): void {
    this.trigger.next();
  }
  public onCaptureImgClick(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage?.imageAsDataUrl;
    this.base64img = (webcamImage?.imageAsBase64);

    
    // var file = "C:\\Images\\500back.jpg";
    // var reader = new FileReader();
    // reader.readAsBinaryString(file);
    
    // var tempblob : Blob = this.dataURItoBlob(this.captureImage);
    // var blob = new Blob([tempblob], {type: "image/jpeg"});
    // //var tempFile = new File([tempblob], event.target.files[0]);
    // FileSaver.saveAs(blob, "1.jpg");
    //this.savePicture(webcamImage);
  }

  private base64textString:String="";
  
  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {

        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        //reader.readAsBinaryString(file);
        reader.readAsDataURL(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
    }
  
  public getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    //let file = "C:\\Images\\500back.jpg";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
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

  private dataURItoBlob(dataURI): Blob {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
       
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString }); // returns size and type of img.
}
  }
}
