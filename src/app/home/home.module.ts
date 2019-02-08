import { MomentPipe } from './../pipes/moment.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PlacesComponent } from './component/places/places.component';
import { SliderDirective } from './directive/slider.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, MomentPipe, PlacesComponent, SliderDirective],
  exports: [PlacesComponent, SliderDirective]
})
export class HomePageModule {}
