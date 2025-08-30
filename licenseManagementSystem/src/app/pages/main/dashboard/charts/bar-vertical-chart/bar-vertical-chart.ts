import { Component, signal } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-vertical-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './bar-vertical-chart.html',
  styleUrl: './bar-vertical-chart.css'
})
export class BarVerticalChart {

  //  view: [number, number] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;


  // colorScheme = {
  //   domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  // };

    colorScheme = signal<any>({
        name: 'Sales report',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: []
  });

    ngOnInit(){
    this.colorScheme.update(scheme => {
      return {
        ...scheme,
        domain:[
          '#9370DB',
          '#87CEFA',
          '#FA8072',
          '#FF7F50',
          '#90EE90',
          '#9370DB',
        ],
      };
    });
  }



  //pie
  showLabels = true;
  // data goes here
data = [
  {
    "name": "China",
    "value": 2243772
  },
  {
    "name": "USA",
    "value": 1126000
  },
  {
    "name": "Norway",
    "value": 296215
  },
  {
    "name": "Japan",
    "value": 257363
  },
  {
    "name": "Germany",
    "value": 196750
  },
  {
    "name": "France",
    "value": 204617
  }
];

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
