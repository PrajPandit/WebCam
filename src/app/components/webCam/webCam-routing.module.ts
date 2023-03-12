import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebCamComponent } from './webCam';

const routes: Routes = [
  {
    path: '',
    component: WebCamComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebCamRoutingModule {}
