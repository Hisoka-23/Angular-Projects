import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgForOf } from "../../node_modules/@angular/common/index";
import { ExcelServiceService } from './excel-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  providers: [ExcelServiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ExportExcel';

  data: any[]=[];
  columns: any[]=[];
  footerData: any[][] = [];
  totalSaleAmount = 0;
  excelService: any;

  constructor(){

  }

  ngOnInit(): void {
    this.columns = ['Invoice ID', 'Invoice Date', 'Device Name', 'Amount'];
    this.data = [
      {
        InvoiceId: 'INV0001',
        DeviceName: 'Redmi Note 6 Pro',
        Data: '25-06-2020',
        Amount: 16000,
      },
      {
        InvoiceId: 'INV000',
        DeviceName: 'Vivo v16',
        Data: '27-06-2020',
        Amount: 26000,
      },
      {
        InvoiceId: 'INV0003',
        DeviceName: 'IPhone 15 Pro Max',
        Data: '26-06-2020',
        Amount: 200000,
      },
      {
        InvoiceId: 'INV0004',
        DeviceName: 'OnePlus 10',
        Data: '27-06-2020',
        Amount: 40000,
      },
      {
        InvoiceId: 'INV0005',
        DeviceName: 'Samsung s20',
        Data: '29-06-2020',
        Amount: 90000,
      }
    ];

    this.totalSaleAmount = this.data.reduce((sum, item) => sum + item.Amount, 0);
    this.footerData.push(['Total', '', '', this.totalSaleAmount]);

  }

  exportExcel(){
    this.excelService.exportAsExcelFile('Sales Report', '', this.columns, this.data, this.footerData, 'slaes-report', 'Sheet1');
  }

}
