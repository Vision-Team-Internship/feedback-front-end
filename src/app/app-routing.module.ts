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

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
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
    path: 'room/:id',
    component: RoomItemComponent,
  },
  {
    path: 'room',
    component: RoomComponent,
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
