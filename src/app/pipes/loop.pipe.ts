import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeat',
})
export class LoopPipe implements PipeTransform {
  transform(value: number): any {
    return Array(value);
  }
}
