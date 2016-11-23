import { MyTreeComponent } from './tree/tree.component';
import { MainPanelComponent } from './mainpanel/mainpanel.component';
import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail').then((comp: any) => {
      return comp.default;
    })
    ,
  },
  {
    path:'user',component:UserComponent
  },
  {
    path:'mainpanel',component:MainPanelComponent
  },
  {
    path:'treenode',component:MyTreeComponent
  },
  { path: '**',    component: NoContentComponent },
];
