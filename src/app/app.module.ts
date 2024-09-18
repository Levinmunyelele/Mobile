import { LogoutService } from './services/logout.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MenuComponent } from './menu/menu.component'; 
import { NotificationComponent } from './notification/notification.component';
import { TokenInterceptor } from '../app/Interceptors/interceptor';
import { ErrorInterceptor } from '../app/Interceptors/error-interceptor';





import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CountyPipe } from './county.pipe';
import { SubhomePipe } from './subhome.pipe';

@NgModule({
  declarations: [AppComponent, CountyPipe, SubhomePipe, MenuComponent, NotificationComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule ,FormsModule,ReactiveFormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LogoutService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

