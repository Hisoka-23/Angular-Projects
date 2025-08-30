import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { User } from '../../../../../interface/user';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';
import {  MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    BsDatepickerModule, 
    NgxSelectModule, 
    MatButtonModule,
    MatIconModule
  ],
  providers: [DatePipe],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css'
})
export class EditUser implements OnInit {

  formData = signal<FormGroup | null>(null);

  updateItem = input<User>();

  addedData = output<User>();

  updatedData = output<User>();

  private formBuilder = inject(FormBuilder);

  private datePipe = inject(DatePipe);

  constructor() {} // bhi use kr sath hai ngOnInit change m

  ngOnInit(){
    this.initForm();
  }

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

  initForm(){
    const item = this.updateItem();

    const form = this.formBuilder.group({
      name: [item?.name ?? null, Validators.required],
      email: [item?.email ?? null, [Validators.required, Validators.email]],
      phone: [item?.phone ?? null, Validators.required],
      gender: [item?.gender ?? null, Validators.required],
      dob: [item?.dob ?? null, Validators.required],
      address: item?.address ?? null,
    });

    this.formData.set(form);

  }

  onSubmit(){

    if(this.formData()?.invalid){
      this.formData()?.markAllAsTouched();
      return;
    }

    console.log(this.formData()?.value);

    this.saveUser();
    
  }

  saveUser(){
    //formate date
    const dob = this.dateFormat(this.formData()?.value?.dob, 'yyyy-mm-dd');

    const data = { ...this.formData()?.value, dob };

    console.log(data);
    
    if(this.updateItem()){
      //update user
      this.updatedData.emit({...this.updateItem(), ...data});
    } else {
      //add user
      this.addedData.emit({ ...data, id: 100});
    }

  }

  dateFormat(date: Date, format: string){
    return this.datePipe.transform(date, format);
  }

}
