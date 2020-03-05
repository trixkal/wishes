import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {

  listas: Lista[] = [];
  constructor() {
    this.loadtorage();
   }

   createList(title: string) {
    const newList = new Lista(title);
    this.listas.push(newList);
    this.saveStorage();
    return newList.listId;
   }

   deleteList(list: Lista) {
    this.listas = this.listas.filter(listData => listData.listId !== list.listId);
   }

   loadList(listIdParam: string | number) {
     listIdParam = Number(listIdParam); // Asi se obliga a que solo sea numero
     return this.listas.find(listData => listData.listId === listIdParam);
   }

   saveStorage() {
     localStorage.setItem('data', JSON.stringify(this.listas));

   }

   loadtorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
   }
}
