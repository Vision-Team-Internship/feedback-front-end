import { FloorComponent } from './backend/floor/floor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { RoomItemComponent } from './components/room-item/room-item.component';
import { RoomComponent } from './components/room/room.component';
import { AuthComponent } from './backend/auth/auth.component';
import { DashboardComponent } from './backend/dashboard/dashboard.component';
import { DepartmentComponent } from './backend/department/department.component';
import { AuthGuard } from './backend/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { HomeFloorComponent } from './components/home-floor/home-floor.component';
import { HomeFloorItemComponent } from './components/home-floor/home-floor-item/home-floor-item.component';
import { HomeDepartmentComponent } from './components/home-department/home-department.component';
import { HomeDepartmentItemComponent } from './components/home-department/home-department-item/home-department-item.component';
import { ProfileComponent } from './components/navbar/profile/profile.component';
import { UserAuthGuard } from './backend/auth/user-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report-form',
    component: FormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'request-form',
    component: RequestFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'd',
    component: DashboardComponent,
    canActivate: [AuthGuard, UserAuthGuard],
    data: {
      role: 'admin',
    },
    loadChildren: () =>
      import('./backend/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'floor',
    component: HomeFloorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'floor/:id',
    component: HomeFloorItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'department',
    component: HomeDepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'department/:id',
    component: HomeDepartmentItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'room',
    component: RoomComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'room/:id',
    component: RoomItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
