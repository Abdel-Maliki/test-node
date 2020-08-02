import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {MatTableModule} from "@angular/material/table";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { UsersComponent } from './components/users/users.component';


const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    TableModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MessagesModule,
    MessageModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
