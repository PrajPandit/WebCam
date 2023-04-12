import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderPage } from './header.page';

const routes: Routes = [
  {
    path: '',
    component: HeaderPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderPageRoutingModule {}
