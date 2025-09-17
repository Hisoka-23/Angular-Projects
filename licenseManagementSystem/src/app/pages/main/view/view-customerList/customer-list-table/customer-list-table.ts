import { Component, OnInit, signal } from '@angular/core';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from "@swimlane/ngx-datatable";
import { CustomerList } from '../../../../../interface/customer-List';
import { CommonModule } from '@angular/common';
import { CUSTOMER } from '../../../../../mock-data/customer.list.mock';

@Component({
  selector: 'app-customer-list-table',
  standalone: true,
  imports: [DatatableComponent, NgxDatatableModule, CommonModule],
  templateUrl: './customer-list-table.html',
  styleUrl: './customer-list-table.css'
})
export class CustomerListTable implements OnInit {

  customers = signal<CustomerList[]>([]);

  ColumnMode = ColumnMode;

  columnDefs = [
    { header: 'Product Name', prop: 'product', width: 75, sortable: true },
    { header: 'Serial Number', prop: 'serialNo', width: 75, sortable: true },
    { header: 'Key Number', prop: 'keyNo', width: 140, sortable: true },
    { header: 'Customer Name', prop: 'customerName', width: 85, sortable: true },
    { header: 'Address', prop: 'address', width: 150, sortable: true },
    { header: 'City/State', prop: 'cityState', width: 75, sortable: true },
    { header: 'Mobile Number', prop: 'mobile', width: 85, sortable: true },
    { header: 'AMC/EndDate', prop: 'amcEndDate', width: 75, sortable: true },
  ];

  ngOnInit() {
      console.log('ngoninit customer-list-table');
      this.customers.set(CUSTOMER);
  }

  onPageChange(event: any) {
    console.log(event);
  }

  onSortChange(event: any) {
    console.log(event);
  }

}
