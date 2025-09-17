import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-party-master-model',
  standalone: true,
  imports: [NgxSelectModule, MatIcon,MatButtonModule],
  templateUrl: './party-master-model.html',
  styleUrl: './party-master-model.css'
})
export class PartyMasterModel {

}
