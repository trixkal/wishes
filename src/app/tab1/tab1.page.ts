import { Component } from '@angular/core';
import { WishesService } from '../services/wishes.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public wishesService: WishesService, private route: Router, private alertController: AlertController) {
  }

  async agregarList() {
    const alert = await this.alertController.create({
      header: 'New List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'List name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Create',
          handler: (data) => {
            console.log(data);
            if (data.title.lenght === 0) {
              return;
            }
            const listId = this.wishesService.createList(data.title);
            this.route.navigateByUrl(`/tabs/tab1/add/${listId}`);

          }
        }
      ]
    });

    alert.present();

  }

}
