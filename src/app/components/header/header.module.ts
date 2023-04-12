import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderPage } from './header.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HeaderPageRoutingModule } from './header-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HeaderPageRoutingModule
  ],
  declarations: [HeaderPage],
  exports: [HeaderPage]
})
export class HomePageModule {}
