import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoomItemComponent } from './components/room-item/room-item.component';
import { RoomComponent } from './components/room/room.component';
import { DashboardComponent } from './backend/dashboard/dashboard.component';
import { FloorComponent } from './backend/floor/floor.component';
import { DepartmentComponent } from './backend/department/department.component';
import { FloorEditComponent } from './backend/floor/floor-edit/floor-edit.component';
import { FloorAddComponent } from './backend/floor/floor-add/floor-add.component';
import { AuthComponent } from './backend/auth/auth.component';
import { RoomsComponent } from './backend/rooms/rooms.component';
import { MessageComponent } from './backend/message/message.component';
import { AuthGuard } from './backend/auth/auth.guard';
import { AllFeedbackComponent } from './backend/all-feedback/all-feedback.component';
import { ProcessComponent } from './backend/process/process.component';
import { CompletedMessageComponent } from './backend/completed-message/completed-message.component';
import { MessageItemComponent } from './backend/message-item/message-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RoomItemComponent,
    RoomComponent,
    DashboardComponent,
    FloorComponent,
    DepartmentComponent,
    FloorEditComponent,
    FloorAddComponent,
    AuthComponent,
    RoomsComponent,
    MessageComponent,
    AllFeedbackComponent,
    ProcessComponent,
    CompletedMessageComponent,
    MessageItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
