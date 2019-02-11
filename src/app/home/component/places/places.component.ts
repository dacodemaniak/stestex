import { Component, OnInit, Input } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import * as moment from 'moment';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  @Input() tour: any;
  
  public places: any = {
    min: 1,
    max: 8,
    quantity: 1
  };

  private referenceDate: moment.Moment;

  // tslint:disable-next-line:no-inferrable-types
  public enableButtons: boolean = true;

  constructor() {
    this.referenceDate = moment();
  }

  ngOnInit() {
    if (moment(this.tour.tourTime).isAfter(this.referenceDate, 'minute')) {
      console.log(moment(this.tour.tourTime).format('DD-MM-YYYY HH:mm') + ' est après ' + this.referenceDate.format('DD-MM-YYYY HH:mm'));
      // tslint:disable-next-line:no-inferrable-types
      let doneResa: number = 0;
      if (this.tour.reservations instanceof Array && this.tour.reservations.length) {
        this.tour.reservations.forEach((reservation) => {
        doneResa += reservation.nbPlaces;
        });
      }
      this.places.max = 8 - doneResa;
    } else {
      console.log(moment(this.tour.tourTime).format('DD-MM-YYYY HH:mm') + ' est avant ' + this.referenceDate.format('DD-MM-YYYY HH:mm'));
      this.enableButtons = false;
    }

  }

  public handleSlide(event: any): void {}

  public increment(slidingItem: IonItemSliding): any {
    console.log('Incrémentation');
    slidingItem.close();
  }

  public decrement(slidingItem: IonItemSliding): any {
    console.log('Décrémentation');
    slidingItem.close();
  }
}
