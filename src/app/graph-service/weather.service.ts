import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherInput } from './weather-input.model';
import { Observable} from 'rxjs';
import { WeatherData } from './weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  basePath: string;
  constructor(private httpClient: HttpClient) {
    this.basePath ='https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/';
   }

   getWeatherData(weatherInput: WeatherInput): Observable<WeatherData> {

    let path = this.formFullPath(weatherInput);
    let data= this.httpClient.get<WeatherData>(path);
    return data;
   }

   formFullPath(weatherInput: WeatherInput): string {
     let region= weatherInput.RegionName;
     let matric= weatherInput.Metric;

     return this.basePath+ `${matric}-${region}.json`;
   }
}
