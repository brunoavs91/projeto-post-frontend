import { BrowserModule } from '@angular/platform-browser';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
/** Services */
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import {HttpClientModule} from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    RegisterComponent,
    LogInComponent,
    PostComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [AuthService,
    StorageService,
    UsuarioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }