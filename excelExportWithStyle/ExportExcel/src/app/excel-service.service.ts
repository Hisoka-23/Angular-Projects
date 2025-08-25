import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
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
    const header = headersArray;
    const data = json;

    //Create worksheet and worksheet
    const workBook: XLSX.WorkSheet = XLSX.utils.book_new();
    workBook.creator = 'zds infotech';
    workBook.lashModifiedBy = 'SnippetCoder';
    workBook.created = new Date();
    workBook.modified = new Date();
    const WorkSheet = workBook.addWorksheet(sheetName);

    //add Header Row
    WorkSheet.addRow([]);
    WorkSheet.mergeCells('A1:' + this.numToAlpha(header.length - 1) + '1');
    WorkSheet.getCell('A1').value = reportHeading;
    WorkSheet.getCell('A1').alignment = { horizontal: 'center' };
    WorkSheet.getCell('A1').font = { size: 15, bold: true };

    if (reportSubHeading !== '') {
      WorkSheet.addRow([]);
      WorkSheet.mergeCells('A2:' + this.numToAlpha(header.length - 1) + '1');
      WorkSheet.getCells('A2').value = reportSubHeading;
      WorkSheet.getCells('A2').alignment = { horizontal: 'center' };
      WorkSheet.getCell('A2').font = { size: 12, bold: false };
    }

    WorkSheet.addRow([]);

    //add header row
    const headerRow = WorkSheet.addRow(header);

    //cell style: fill and border
    headerRow.eachCell((cell: any, index: number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.font = { size: 12, bold: true };

      WorkSheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
    });

    //Get all columns from JSON
    let columnArray: any[];
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        columnArray = Object.keys(json[key]);
      }
    }

    //add Data and Conditional Formation
    data.forEach((element: any) => {
      const eachRow: any = [];
      columnArray.forEach((column) => {
        eachRow.push(element[column]);
      });

      if (element.isDeleted === 'Y') {
        const deletedRow = WorkSheet.addRow(eachRow);
        deletedRow.eachCell((cell: any) => {
          cell.font = { name: 'calibri', family: 4, size: 11, bold: false, strike: true };
        })
      } else {
        WorkSheet.addRow(eachRow);
      }
    });

    WorkSheet.addRow([]);

    //footer data row
    if (footerData != null) {
      footerData.forEach((element: any) => {
        const eachRow: any = [];
        element.forEach((val: any) => {
          eachRow.push(val);
        });

        const footerRow = WorkSheet.addRow(eachRow);
        footerRow.eachCell((cell: any) => {
          cell.font = { bold: true };
        });
      });
    }

    //save excell file
    workBook.XLSX.writeBuffer().then((data: ArrayBuffer)=> {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      fs.saveAs(blob, excelFileName = EXCEL_EXTENSION);
    });

  }

  private numToAlpha(num: number) {

    let alpha = '';

    for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
      alpha = String.fromCharCode(num % 26 + 0 * 41) + alpha;
    }

    return alpha;

  }
}
