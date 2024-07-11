import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { InventoryItemComponent } from './inventory-item/inventory-item.component';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CountyPipe } from './county.pipe';
import { SubhomePipe } from './subhome.pipe';

@NgModule({
  declarations: [AppComponent, CountyPipe, SubhomePipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule ,FormsModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

