import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private recordService: BookRecordService) {}

  ngOnInit(): void {
    this.getRecords();
  }

  public getRecords(): void {
    this.recordService.getRecords().subscribe({
      next: (response: BookRecord[]) => {
        this.records = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onUpdateRecord(record: BookRecord): void {

  }

  public searchRecords(key: string): void {

  }

  public onOpenModal(record: BookRecord, mode: string): void {
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
      button.setAttribute('data-target', '#deleteRecordModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
