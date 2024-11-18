import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate(800)]),
      transition('* => void', [animate(800, style({ opacity: 0 }))]),
    ]),
  ],
})
export class AdminPageComponent {
  newItem: string = '';
  list: string[] = ['test1', 'test3'];
  addItem() {
    if (this.newItem.trim()) {
      this.list.push(this.newItem); // Add the new item to the list
      this.newItem = ''; // Clear the input field after adding the item
    }
  }
  removeItem(index: number) {
    this.list.splice(index, 1);
  }
}
