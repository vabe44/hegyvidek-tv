import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ora'
})
export class OraPipe implements PipeTransform {

  transform(ora) {
    return ora.replace(':00', '');
  }

}
