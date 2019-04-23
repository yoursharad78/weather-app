import { Component, Input } from '@angular/core';
import { WeatherInput } from './graph-service/weather-input.model';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';

  weatherRegions: any[] = [
    { RegionName: 'UK' },
    { RegionName: 'England' },
    { RegionName: 'Scotland' },
    { RegionName: 'Wales' },
  ];

  datePickerConfig: Partial<BsDatepickerConfig>;

  weatherInput: WeatherInput = {
    RegionName: 'England',
    Metric: 'Rainfall',
    BsRangeValue: [new Date(1910, 1, 4), new Date(1910, 7, 20)]
  };

  constructor() {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
    });
  }

  onMenuClick(regionName: string) {
    this.weatherInput.RegionName = regionName;
  }
}
