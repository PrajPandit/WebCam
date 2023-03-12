import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebCamComponent } from '../components/webCam/webCam';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      // {
      //   path: 'tab1',
      //   loadChildren: () => import('../components/home/home.module').then(m => m.HomePageModule)
      // },
      // {
      //   path: 'tab2',
      //   loadChildren: () => import('../components/actions/action.module').then(m => m.ActionPageModule)
      // },
      // {
      //   path: 'tab3',
      //   loadChildren: () => import('../components/product-details/product-details.module').then(m => m.ProductDetailsPageModule)
      // },
      // {
      //   path: 'webCam-page', component: WebCamComponent
      //   // loadChildren: () => import('../components/webCam/product-details.module').then(m => m.ProductDetailsPageModule)
      // },
      {
        path: 'tab1',
       loadChildren: () => import('../components/webCam/webCam.module').then(m => m.WebCamModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
