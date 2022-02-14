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

  constructor(private recordService: BookRecordService) {}

  ngOnInit(): void {
    this.getRecords();
  }

  public getRecords(): void {
    this.recordService.getRecords().subscribe(
      (response: BookRecord[]) => {
        this.records = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
