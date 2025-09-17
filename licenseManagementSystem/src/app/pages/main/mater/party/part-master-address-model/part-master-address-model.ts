import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgxSelectModule } from "ngx-select-ex";

@Component({
  selector: 'app-part-master-address-model',
  standalone: true,
  imports: [NgxSelectModule, MatIcon, MatButtonModule],
  templateUrl: './part-master-address-model.html',
  styleUrl: './part-master-address-model.css'
})
export class PartMasterAddressModel {

}
