import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(lists: Lista[], doneTask: boolean = true): Lista[] {

    return lists.filter(list => list.done === doneTask);
  }

}
