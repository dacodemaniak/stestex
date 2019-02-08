import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  @Input() tour: any;

  constructor() { }

  ngOnInit() {
  }

  public handleSlide(event: any, tour: any): void {
    
    const percent: Number = event.target.ratio;

    console.log('Gestion du slider ' + JSON.stringify(event.target) + ' : ' + percent);
    if (percent > 0) {
      this.increment();
    } else {
      this.decrement();
    }
  }

  private increment(): any {
    console.log('Incrémentation');
  }

  private decrement(): any {
    console.log('Décrémentation');
  }
}
