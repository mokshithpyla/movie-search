import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { SearchService } from './search.service';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';
import { ListComponent } from './list/list.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    AppModule,
    BrowserTransferStateModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
