import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'homePage',
        loadChildren: () => import('../components/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'scanCurrency',
        loadChildren: () => import('../components/webCam/webCam.module').then(m => m.WebCamModule)
      },
      {
        path: 'scanResults',
        loadChildren: () => import('../components/info/info.module').then(m => m.InfoPageModule)
      },
      // {
      //   path: 'scanResults',
      //   loadChildren: () => import('../components/actions/action.module').then(m => m.ActionPageModule)
      // },
      {
        path: 'info',
        loadChildren: () => import('../components/info/info.module').then(m => m.InfoPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/homePage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
