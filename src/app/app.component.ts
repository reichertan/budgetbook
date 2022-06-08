import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookRecord } from './book-record';
import { BookRecordService } from './book-record.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public records: BookRecord[] | undefined;
  public editRecord: BookRecord | undefined;
  public deleteRecord: BookRecord | undefined;
  today : Date = new Date();
  firstDayOfMonth : Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  lastDayOfMonth : Date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);

  constructor(private recordService: BookRecordService) {}

  ngOnInit(): void {
    this.getRecords(this.firstDayOfMonth, this.lastDayOfMonth);
  }

  public getRecords(startDate: Date, endDate: Date): void {
    let params = new HttpParams()
      .append('start-date', startDate.toISOString())
      .append('end-date', endDate.toISOString());
    this.recordService.getRecords(params).subscribe({
      next: (response: BookRecord[]) => {
        this.records = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onAddRecord(addForm: NgForm): void {
    document.getElementById('add-record-form')?.click();
    this.recordService.createRecord(addForm.value).subscribe(
      (response: BookRecord) => {
        console.log(response);
        this.getRecords(this.firstDayOfMonth, this.lastDayOfMonth);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateRecord(record: BookRecord): void {
    this.recordService.updateRecord(record.id, record).subscribe(
      (response: BookRecord) => {
        console.log(response);
        this.getRecords(this.firstDayOfMonth, this.lastDayOfMonth);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onDeleteRecord(recordId: number): void {
    this.recordService.deleteRecord(recordId).subscribe(
      (response: void) => {
        console.log(response);
        this.getRecords(this.firstDayOfMonth, this.lastDayOfMonth);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public searchRecords(key: string): void {
    const results: BookRecord[] = [];
    for (const record of this.records!) {
      if (record.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(record);
      }
    }
    this.records = results;
    if (results.length === 0 || !key) {
      this.getRecords(this.firstDayOfMonth, this.lastDayOfMonth);
    }
  }

  public onOpenModal(mode: string, record?: BookRecord): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addRecordModal');
    }
    if (mode === 'edit') {
      this.editRecord = record;
      button.setAttribute('data-target', '#updateRecordModal');
    }
    if (mode === 'delete') {
      this.deleteRecord = record;
      button.setAttribute('data-target', '#deleteRecordModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
