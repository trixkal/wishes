import { ListaItem } from './lista-item.model';
export class Lista {
    listId: number;
    title: string;
    createdDate: Date;
    doneDate: Date;
    done: boolean;
    items: ListaItem[];

constructor(title: string) {
    this.title = title;
    this.createdDate = new Date();
    this.done = false;
    this.items = [];
    this.listId = new Date().getTime();
}

}
