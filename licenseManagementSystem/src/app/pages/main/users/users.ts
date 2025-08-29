import { MatIconModule } from '@angular/material/icon';
import { Component, inject, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { ContentHeader } from '../../../widgets/content-header/content-header';
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { USERS } from '../../../mock-data/users.mock';
import { User } from '../../../interface/user';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ContentHeader, 
    NgxDatatableModule, 
    DatePipe, 
    MatButtonModule, 
    MatIconModule,
    ModalModule
  ],
  providers:[BsModalService],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  table = viewChild<DatatableComponent>(DatatableComponent);

  title = 'Users';

  temp = signal<User[]>([]);

  users = signal<User[]>([]);

  columnMode = ColumnMode;

  loadingIndicator = signal<boolean>(false);

  modalRef = signal<BsModalRef | null>(null);

  private modalService = inject(BsModalService);

  setLoadingIndicator(value: boolean) {
    this.loadingIndicator.set(value);
  }

  ngOnInit() {
    console.log('ngoninit users');
    this.getUsers();
  }

  async getUsers() {
    try {
      this.setLoadingIndicator(true);
      const user = USERS;
      this.temp.set(user);
      this.users.set(user);
    } catch (e) {
      console.error(e);
    } finally {
      this.setLoadingIndicator(false);
    }
  }

  onFilterChange(event: any) {
    console.log(event.target.value);
    const val = event.target.value.toLowerCase();

    const filterData = this.temp().filter((item) => {
      return item?.name.toLocaleLowerCase().indexOf(val) !== -1 ||
        item.email.toLocaleLowerCase().indexOf(val) !== -1 ||
        item.phone.toLocaleLowerCase().indexOf(val) !== -1 ||
        item.address.toLocaleLowerCase().indexOf(val) !== -1 ||
        item.gender.toLocaleLowerCase().indexOf(val) !== -1 ||
        !val;
    });

    this.users.set(filterData);

    this.table()!.offset = 0;

  }

  onPageChange(event: any) {
    console.log('Page changed to: ', event);
  }

  onSort(event: any) {
    console.log('Sort Event: ', event);
  }

  exportToExcel() {

    const fields = ['id', 'name', 'email', 'phone', 'address'];

    const values = this.users();

    const sheetName = 'users';

    const data = this.prepareDataInExcel(values, fields);

    const headers = fields.reduce((acc, field) => {
      // acc[field] = field;
      acc[field] = field.charAt(0).toUpperCase() + field.slice(1);
      return acc;
    }, {} as Record<string, string>);

    const WorkSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([headers, ...data], {
      // header: Object.keys(data[0]),
      // header: Object.values(headers),
      skipHeader: true,
    });

    const WorkBook: XLSX.WorkBook = {
      Sheets: { [sheetName]: WorkSheet },
      SheetNames: [sheetName],
    };

    const excelBuffer = XLSX.write(WorkBook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const file = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(file, 'users.xlsx');

  }

  prepareDataInExcel(values: User[], fields: string[]) {
    const dataExport = values.map((value) => {

      const filterRow: Record<string, any> = {};

      fields.forEach((field) => {
        if (field in value) {
          filterRow[field] = value[field as keyof User];
        }
      });

      return filterRow;

    });

    return dataExport; // Return the full array of filtered rows

  }

  deleteItem(user: User){
    this.temp.update((users) => users.filter((usr) => usr.id !== user.id));
    this.users.update((users) => users.filter((usr) => usr.id !== user.id));
  }

  openUserFormModal(template: TemplateRef<void>, User?: User){
    this.modalRef.set(this.modalService.show(template));
  }

}
