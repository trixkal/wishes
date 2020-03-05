import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild( IonList, null) lista: IonList;
  constructor(public wishesService: WishesService, private route: Router, private alertController: AlertController) { }

  ngOnInit() {}

  selectedList(selectedList: Lista) {
    if (this.terminada) {
      this.route.navigateByUrl(`/tabs/tab2/add/${selectedList.listId}`);
    } else {
      this.route.navigateByUrl(`/tabs/tab1/add/${selectedList.listId}`);
    }

  }

  deleteList(list: Lista) {
    this.wishesService.deleteList(list);
  }

  async editList(selectedList: Lista) {
    const alert = await this.alertController.create({
      header: 'Edit List Name',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: selectedList.title,
          placeholder: 'List name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Edit',
          handler: (data) => {
            if (data.title.lenght === 0) {
              return;
            }
            selectedList.title = data.title;
            this.wishesService.saveStorage();
            this.lista.closeSlidingItems();


          }
        }
      ]
    });

    alert.present();

  }
}
