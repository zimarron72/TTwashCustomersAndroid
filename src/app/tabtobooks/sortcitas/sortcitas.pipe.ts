import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortcitas',
  standalone: false
})
export class SortcitasPipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.Location.toLowerCase().includes(terms); // only filter Location
    });
  }

}
