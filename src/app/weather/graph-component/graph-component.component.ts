import { Component, OnInit, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WeatherService } from 'src/app/graph-service/weather.service';
import { WeatherInput } from 'src/app/graph-service/weather-input.model';
import { WeatherData } from 'src/app/graph-service/weather-data.model';

@Component({
  selector: 'app-graph-component',
  templateUrl: './graph-component.component.html',
  styleUrls: ['./graph-component.component.css']
})
export class GraphComponentComponent implements OnInit {

  @Input() weatherInput: WeatherInput;

  formData: WeatherData[];
  view: any[] = [600, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  multi: any[];

  constructor(private ngxChartsModule: NgxChartsModule,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.getData();
  }

  public getData() {

    this.yAxisLabel = this.weatherInput.Metric;
    this.weatherService.getWeatherData(this.weatherInput)
      .subscribe((data) => {
        if (data) {
          this.formData = Object.assign([], data);
          this.generateGraph();
        }
      },
        (err) => {
          this.formData = Object.assign([], new WeatherData());
          this.multi = null;
        }
      );

  }

  generateGraph() {
    const filteredData = Object.assign([], this.getFilterData());

    const seriesData = filteredData.map((f) => {
      return {
        value: f.value,
        name: new Date(f.year, f.month),
        month: f.month,
        year: f.year
      };
    });

    this.multi = [
      {
        name: this.weatherInput.RegionName,
        series: seriesData
      }];

  }

  getFilterData(): WeatherData[] {

    const fDate = new Date(this.weatherInput.BsRangeValue[0].getFullYear(), this.weatherInput.BsRangeValue[0].getMonth());
    const tDate = new Date(this.weatherInput.BsRangeValue[1].getFullYear(), this.weatherInput.BsRangeValue[1].getMonth());

    const data = this.formData
      .filter((f) => new Date(f.year, (f.month - 1)) >= fDate
        && new Date(f.year, (f.month - 1)) <= tDate);

    return data;
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }
}
