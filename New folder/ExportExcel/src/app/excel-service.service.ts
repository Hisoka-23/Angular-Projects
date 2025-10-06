import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }

  public exportAsExcelFile(
    reportHeading: string,
    reportSubHeading: string,
    headersArray: any[],
    json: any[],
    footerData: any,
    excelFileName: string,
    sheetName: string
  ) {
    // Prepare worksheet data
    const wsData: any[] = [];

    // Add heading and subheading
    if (reportHeading) wsData.push([reportHeading]);
    if (reportSubHeading) wsData.push([reportSubHeading]);
    wsData.push([]); // Empty row

    // Add headers
    wsData.push(headersArray);

    // Add data rows
    json.forEach(item => {
      wsData.push(headersArray.map(header => item[header]));
    });

    // Add footer if present
    if (footerData) {
      wsData.push([]);
      footerData.forEach((row: any) => wsData.push(row));
    }

    // Create worksheet and workbook
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(wsData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Export
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    fs.saveAs(blob, excelFileName + EXCEL_EXTENSION);
  }

}