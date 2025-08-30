import { Component, signal } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css'
})
export class PieChart {

  data: any[] = [
      {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
    {
    "name": "UK",
    "value": 6200000
  }
  ];
  // view: any[] = [700, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme = signal<any>({
        name: 'Sales report',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: []
  });

  // constructor() {
  //   Object.assign(this, { data: this.data });
  // }

  ngOnInit(){
    this.colorScheme.update(scheme => {
      return {
        ...scheme,
        domain:[
          this.getCSSVariable('--primary-color'),
          '#03DAC6',
          '#FF0266',
          this.getCSSVariable('--warning-color'),
        ],
      };
    });
  }

  getCSSVariable(name: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
