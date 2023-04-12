import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './info.page';
import { RouterModule } from '@angular/router';
import { InfoRoutingModule } from './info-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: InfoComponent }]),
    InfoRoutingModule,
  ],
  declarations: [InfoComponent]
})
export class InfoPageModule {}
