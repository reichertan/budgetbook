import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookRecordService } from './book-record.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HammerModule } from '@angular/platform-browser';
import { 
  IgxCalendarModule,
  IgxAccordionModule } from 'igniteui-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    HammerModule,
    IgxCalendarModule,
    IgxAccordionModule
  ],
  providers: [BookRecordService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
