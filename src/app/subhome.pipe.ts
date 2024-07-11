import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subhome'
})
export class SubhomePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
