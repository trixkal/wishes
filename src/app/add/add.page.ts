import { Component, OnInit } from '@angular/core';
import { WishesService } from '../services/wishes.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  listTasks: Lista;
  nameItem = '';
  constructor(private wService: WishesService, private activatedRoute: ActivatedRoute) {
    const listId = this.activatedRoute.snapshot.paramMap.get('listId');
    this.listTasks = this.wService.loadList(listId);

  }

  ngOnInit() {
  }

  addItem() {
    if (this.nameItem.length === 0) {
      return;
    }
    const newItem = new ListaItem(this.nameItem);
    this.listTasks.items.push(newItem);
    this.nameItem = '';
    this.wService.saveStorage();

  }

  checkChanged(item: ListaItem) {
    const pending = this.listTasks.items.filter(itemData => !itemData.itemDone).length;
    if (pending === 0) {
      this.listTasks.doneDate = new Date();
      this.listTasks.done = true;
    } else {
      this.listTasks.doneDate = null;
      this.listTasks.done = false;
    }
    this.wService.saveStorage();
  }

  deleteItem(idx: number) {
    this.listTasks.items.splice(idx, 1);
    this.wService.saveStorage();
  }
}
