import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponentComponent } from './weather/graph-component/graph-component.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WeatherService } from './graph-service/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipePipe } from './pipes/date-pipe.pipe'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponentComponent,
    DatePipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxChartsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
