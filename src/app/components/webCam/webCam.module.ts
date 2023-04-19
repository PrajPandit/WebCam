import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebCamComponent } from './webCam';
import { WebCamRoutingModule } from './webCam-routing.module';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WebCamRoutingModule,
    WebcamModule,
  ],
  declarations: [WebCamComponent]
})
export class WebCamModule {}
