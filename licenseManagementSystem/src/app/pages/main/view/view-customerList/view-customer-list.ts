import { Component, OnInit, signal } from '@angular/core';
import { ContentHeader } from "../../../../widgets/content-header/content-header";
import { CUSTOMER } from '../../../../mock-data/customer.list.mock';
import { CustomerList } from '../../../../interface/customer-List';
import { CustomerListTable } from "./customer-list-table/customer-list-table";

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [ContentHeader, CustomerListTable],
  templateUrl: './view-customer-list.html',
  styleUrl: './view-customer-list.css'
})
export class ViewCustomerList implements OnInit {

  title = 'CUSTOMER';

  customers = signal<CustomerList[]>([]);

  ngOnInit(){
    console.log('ngoninit view-customer List');
    this.customers.set(CUSTOMER);
  }

}
