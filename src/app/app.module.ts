import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { SearchService } from './search.service';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';
import { ListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgtUniversalModule } from '@ng-toolkit/universal';

@NgModule({
  declarations: [
    AppComponent,
    SearchInterfaceComponent,
    ListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TransferHttpCacheModule,
    NgtUniversalModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
