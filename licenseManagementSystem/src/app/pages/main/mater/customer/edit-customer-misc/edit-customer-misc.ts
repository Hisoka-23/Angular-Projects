import { Component } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from "ngx-select-ex";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-customer-misc',
  standalone: true,
  imports: [BsDatepickerModule, NgxSelectModule, MatIconModule, MatButtonModule],
  templateUrl: './edit-customer-misc.html',
  styleUrl: './edit-customer-misc.css'
})
export class EditCustomerMisc {

  datePickerConfig: Partial<BsDatepickerConfig> = Object.assign(
    {},
    {
      containerClass: 'theme-dark-blue',
      /// showWeekNumber: true,
      /// minDate: new Date(2018, 0, 1),
      ///maxDate: new Date(2018, 11, 31)
      dateInputFormat: 'YYYY-MM-DD',
    }
  );

}
