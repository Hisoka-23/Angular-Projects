import { Component } from '@angular/core';
import { Users } from "../users/users";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChart } from "./charts/pie-chart/pie-chart";
import { BarVerticalChart } from "./charts/bar-vertical-chart/bar-vertical-chart";
import { MediumBox } from "./medium-box/medium-box";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Users, NgxChartsModule, PieChart, BarVerticalChart, MediumBox],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
 