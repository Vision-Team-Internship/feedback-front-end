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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'report-form',
    component: FormComponent,
  },
  {
    path: 'request-form',
    component: RequestFormComponent,
  },
  {
    path: 'd',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./backend/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'floor',
    component: HomeFloorComponent,
  },
  {
    path: 'floor/:id',
    component: HomeFloorItemComponent,
  },
  {
    path: 'department',
    component: HomeDepartmentComponent,
  },
  {
    path: 'department/:id',
    component: HomeDepartmentItemComponent,
  },
  {
    path: 'room',
    component: RoomComponent,
  },
  {
    path: 'room/:id',
    component: RoomItemComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
export class AppRoutingModule {}
