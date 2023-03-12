import { Component, OnInit } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
  
@Component({
  selector: 'webCam-page',
  templateUrl: './webCam.html',
  styleUrls: ['./webCam.scss']
})
export class WebCamComponent implements OnInit {
  
    private trigger=  new Subject();

    public webcamImage!: WebcamImage;
    private nextWebcam = new Subject();

    captureImage  = '';
  
    ngOnInit() {}
  
    /*------------------------------------------
    --------------------------------------------
    triggerSnapshot()
    --------------------------------------------
    --------------------------------------------*/
    public triggerSnapshot(): void {
        this.trigger.next();
    }
  
    /*------------------------------------------
    --------------------------------------------
    handleImage()
    --------------------------------------------
    --------------------------------------------*/
    public handleImage(webcamImage: WebcamImage): void {
        this.webcamImage = webcamImage;
        this.captureImage = webcamImage!.imageAsDataUrl;
        console.info('received webcam image', this.captureImage);
    }
  
    /*------------------------------------------
    --------------------------------------------
    triggerObservable()
    --------------------------------------------
    --------------------------------------------*/
    public get triggerObservable(): Observable<any> {

        return this.trigger.asObservable();
    }
  
    /*------------------------------------------
    --------------------------------------------
    nextWebcamObservable()
    --------------------------------------------
    --------------------------------------------*/
    public get nextWebcamObservable(): Observable<any> {

        return this.nextWebcam.asObservable();
    }
 
}