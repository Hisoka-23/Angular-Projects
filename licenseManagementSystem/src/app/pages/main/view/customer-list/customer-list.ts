import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerList {
  load(arg0: string) {
    throw new Error('Method not implemented.');
  }

}
