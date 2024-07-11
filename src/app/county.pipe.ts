import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'county'
})
export class CountyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
