import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  /** convert datetime format in user friendly format**/

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === '')
      return value
    let date = (<string>value).split('T')[0];
    let [year,month,day] = date.split('-');
    let dateStr = `${day}/${month}/${year}`;

    return `${dateStr}`;
  }
}
