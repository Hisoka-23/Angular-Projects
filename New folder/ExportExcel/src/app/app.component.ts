import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from "@angular/common";
import { ExcelServiceService } from './excel-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [ExcelServiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ExportExcel';

  data: any[] = [];
  columns: any[] = [];
  footerData: any[][] = [];
  totalSaleAmount = 0;

  constructor(public excelService: ExcelServiceService) {}

  ngOnInit(): void {
    this.columns = ['InvoiceId', 'Date', 'DeviceName', 'Amount'];
    this.data = [
      {
        InvoiceId: 'INV0001',
        DeviceName: 'Redmi Note 6 Pro',
        Date: '25-06-2020',
        Amount: 16000,
      },
      {
        InvoiceId: 'INV0002',
        DeviceName: 'Vivo v16',
        Date: '27-06-2020',
        Amount: 26000,
      },
      {
        InvoiceId: 'INV0003',
        DeviceName: 'IPhone 15 Pro Max',
        Date: '26-06-2020',
        Amount: 200000,
      },
      {
        InvoiceId: 'INV0004',
        DeviceName: 'OnePlus 10',
        Date: '27-06-2020',
        Amount: 40000,
      },
      {
        InvoiceId: 'INV0005',
        DeviceName: 'Samsung s20',
        Date: '29-06-2020',
        Amount: 90000,
      }
    ];

    this.totalSaleAmount = this.data.reduce((sum, item) => sum + item.Amount, 0);
    this.footerData.push(['Total', '', '', this.totalSaleAmount]);
  }

  exportExcel() {
    this.excelService.exportAsExcelFile('Sales Report', '', this.columns, this.data, this.footerData, 'sales-report', 'Sheet1');
  }
}