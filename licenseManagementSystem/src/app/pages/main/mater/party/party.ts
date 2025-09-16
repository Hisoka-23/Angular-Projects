import { ChangeDetectorRef, Component, inject, OnInit, signal, TemplateRef } from '@angular/core';
import { ContentHeader } from "../../../../widgets/content-header/content-header";
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PartyList } from '../../../../interface/party-List';
import { PARTY } from '../../../../mock-data/party.list.mock';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { PartyMasterModel } from "./party-master-model/party-master-model";

@Component({
  selector: 'app-party',
  standalone: true,
  imports: [
    ContentHeader,
    MatIcon,
    MatButton,
    DatatableComponent,
    NgxDatatableModule,
    ModalModule,
    PartyMasterModel
],
  providers:[BsModalService],
  templateUrl: './party.html',
  styleUrl: './party.css'
})
export class Party implements OnInit {

  title = 'PARTY';

  partys = signal<PartyList[]>([]);

  modalRef = signal<BsModalRef | null>(null);

  private modalService = inject(BsModalService);

  constructor(private cd: ChangeDetectorRef) {}

  ColumnMode = ColumnMode;

  ngOnInit() {
    console.log('ngoninit party');
    this.partys.set(PARTY);
  }

  onPageChange(event: any) {
    console.log(event);
  }

  onSortChange(event: any) {
    console.log(event);
  }

  openUserFormModal(template: TemplateRef<void>, Party?: PartyList){
    this.modalRef.set(this.modalService.show(template,{ class: 'modal-xl' }));

    // 🔑 ensures Angular immediately updates the view
    setTimeout(() => this.cd.detectChanges(), 0);
  }

  closeUserModal(){
    this.modalRef()?.hide();
  }

}
