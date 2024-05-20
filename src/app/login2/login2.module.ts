import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Login2PageRoutingModule } from './login2-routing.module';
import { MaskitoModule} from '@maskito/angular';



import { Login2Page } from './login2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Login2PageRoutingModule,
    MaskitoModule
    
  ],
  declarations: [Login2Page]
})
export class Login2PageModule {}
