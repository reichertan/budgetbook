import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookRecord } from './book-record';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookRecordService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getRecords(params: HttpParams): Observable<BookRecord[]> {
    return this.http.get<BookRecord[]>(`${this.apiServerUrl}/records`, {params: params});
  }

  public createRecord(record: BookRecord): Observable<BookRecord> {
    return this.http.post<BookRecord>(`${this.apiServerUrl}/records`, record);
  }

  public updateRecord(recordId: number, record: BookRecord): Observable<BookRecord> {
    return this.http.put<BookRecord>(`${this.apiServerUrl}/records/${recordId}`, record);
  }

  public deleteRecord(recordId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/records/${recordId}`);
  }
}
