import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgxSelectModule } from 'ngx-select-ex';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-app-edit-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    NgxSelectModule, 
    BsDatepickerModule, 
    MatButtonModule,
    MatIconModule],
  providers: [DatePipe],
  templateUrl: './app-edit-customer.html',
  styleUrl: './app-edit-customer.css'
})
export class AppEditCustomer implements OnInit {

  formData = signal<FormGroup | null>(null);

  private FormBuilder = inject(FormBuilder);

  private datePipe = inject(DatePipe);

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


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const form = this.FormBuilder.group({
    })
  }

}
