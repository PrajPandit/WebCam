import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebCamComponent } from './webCam';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { WebcamModule } from 'ngx-webcam';
import { WebCamRoutingModule } from './webCam-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    WebCamRoutingModule,
    WebcamModule
  ],
  declarations: [WebCamComponent]
})
export class WebCamModule {}
