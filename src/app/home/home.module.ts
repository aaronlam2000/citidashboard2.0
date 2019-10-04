import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomePopoverComponent } from '../home-popover/home-popover.component';
import { DragulaModule } from 'ng2-dragula';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedDirectivesModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    DragulaModule
  ],
  entryComponents: [HomePopoverComponent],
  declarations: [HomePage, HomePopoverComponent]
})
export class HomePageModule {}
