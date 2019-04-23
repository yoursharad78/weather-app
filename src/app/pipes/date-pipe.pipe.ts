import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(obj: any[], args?: any): any {
    if (obj) {

      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      obj.forEach(data => {
        data.series = data.series.map((item: any) => {
          return {
            value: item.value,
            name: item.year + ' ' + monthNames[item.month - 1],
          };
        });
        //return data;
      });

      return [...obj];
    }

  }

}
