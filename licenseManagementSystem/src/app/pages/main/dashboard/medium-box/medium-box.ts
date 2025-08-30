import { LowerCasePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-medium-box',
  standalone: true,
  imports: [LowerCasePipe, NgClass],
  templateUrl: './medium-box.html',
  styleUrl: './medium-box.css'
})
export class MediumBox {



}
