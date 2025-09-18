import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal, TemplateRef } from '@angular/core';
import { ContentHeader } from '../../../../widgets/content-header/content-header';
import { CustomerListTable } from "../../view/view-customerList/customer-list-table/customer-list-table";
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tabs } from "../../reusable/tabs/tabs";
import { EnquiryMain } from "./enquiry-main/enquiry-main";
import { EnquiryProducts } from "./enquiry-products/enquiry-products";
import { EnquiryFollowup } from "./enquiry-followup/enquiry-followup";

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [
    ContentHeader, 
    CustomerListTable, 
    MatIcon, 
    MatButton, 
    Tabs, 
    NgIf, 
    EnquiryMain, 
    EnquiryProducts, 
    EnquiryFollowup
  ],
  providers:[BsModalService],
  templateUrl: './enquiry.html',
  styleUrl: './enquiry.css'
})
export class Enquiry {

  title='Home';

  modalRef = signal<BsModalRef | null>(null);

  private modalService = inject(BsModalService);

  constructor(private cd: ChangeDetectorRef) {}

  //tabs
  tabs:any = [
    { label: 'Main', icon: 'fa-solid fa-pencil' }, // using FontAwesome
    { label: 'Products', icon: 'fa-solid fa-pen-nib' },
    { label: 'FollowUP', icon: 'fa-solid fa-pencil' }
  ];

  activatedTabIndex: number = 0;

  tabChange(tabIndex: number){
    this.activatedTabIndex = tabIndex;
    console.log('Activated Tab:', this.activatedTabIndex);
  }

  openUserFormModal(template: TemplateRef<void>){
    this.activatedTabIndex = 0; // or whichever is default
    this.modalRef.set(this.modalService.show(template,{ class: 'modal-xl' }));

    // 🔑 ensures Angular immediately updates the view
    setTimeout(() => this.cd.detectChanges(), 0);
  }

  closeUserModal(){
    this.modalRef()?.hide();
  }

}
