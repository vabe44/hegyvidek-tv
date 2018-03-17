import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datum'
})
export class DatumPipe implements PipeTransform {
  moment: any;

  constructor() {}
  transform(datum) {
    this.moment = moment(datum);
    this.moment.locale('hu');
    return this.moment.format('YYYY. MMMM Do');
  }

}
