import { CustomerList } from './../../../../interface/customer-List';
import { Component, inject, signal, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxDatatableModule, ColumnMode } from '@swimlane/ngx-datatable';
import { MatIconModule } from '@angular/material/icon';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ContentHeader } from "../../../../widgets/content-header/content-header";
import { CUSTOMER } from '../../../../mock-data/customer.list.mock';
import { OnInit } from '@angular/core';
import { AppEditCustomer } from "./app-edit-customer/app-edit-customer";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    NgxDatatableModule,
    MatButtonModule,
    MatIconModule,
    ModalModule,
    ContentHeader,
    AppEditCustomer
],
  providers:[BsModalService],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer implements OnInit {

  title = 'CUSTOMER';

  customers = signal<CustomerList[]>([]);

  modalRef = signal<BsModalRef | null>(null);

  private modalService = inject(BsModalService);

  ColumnMode = ColumnMode;

  ngOnInit() {
    console.log('ngoninit customer');
    this.customers.set(CUSTOMER);
  }

  onPageChange(event: any) {
    console.log(event);
  }

  onSortChange(event: any) {
    console.log(event);
  }

    openUserFormModal(template: TemplateRef<void>, User?: CustomerList){
  
      this.modalRef.set(this.modalService.show(template,{ class: 'modal-xl' }));
    }

      closeUserModal(){
    this.modalRef()?.hide();
  }

}
