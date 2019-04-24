import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherInput } from './weather-input.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceConstants } from './service-constants';
import { WeatherData } from './weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) {
  }

  getWeatherData(weatherInput: WeatherInput): Observable<WeatherData[]> {

    let path = this.formFullPath(weatherInput);
    let data = this.httpClient.get<WeatherData[]>(path)
      .pipe(catchError(this.handleError));
    return data;
  }

  formFullPath(weatherInput: WeatherInput): string {
    let region = weatherInput.RegionName;
    let matric = weatherInput.Metric;

    return ServiceConstants.basePath + `${matric}-${region}.json`;
  }

  handleError(httpErrorResponse: HttpErrorResponse) {
    if (httpErrorResponse.error instanceof ErrorEvent) {
      console.log('Client side error');
    }
    else {
      console.log('Server side error');
    }
    return throwError('Probelm With service');
  }
}
