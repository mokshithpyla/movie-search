import { FormArray, FormControl } from '@angular/forms';

import { Movie } from './movie';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';
@Injectable()
export class SearchService {
  baseUrl1: string = 'https://movie-search-project.herokuapp.com/elastic/search/';
  baseUrl2: string = 'https://movie-search-project.herokuapp.com/elastic/suggest/';
  baseUrl3: string = 'https://movie-search-project.herokuapp.com/elastic/auto_complete/';

  
  queryUrl1: string = '?q=';
  queryUrl2: string = '?g=';
  x: any;

  categoryList :string;

  constructor(private http: HttpClient) { }

  search(term: string) {
    this.x = this.http.get(this.baseUrl1 + this.queryUrl1 + term.trim());
    console.log(this.x, 'response');
    return this.x;
  }

  suggest(term) {
    term = term.trim();
    if (term !='')
      return this.http.get(this.baseUrl2 + this.queryUrl1 + term);
    else
      return this.http.get(this.baseUrl1 + this.queryUrl1 + term);
  }

  autocomplete(term) {
    return this.http
      .get(this.baseUrl3 + this.queryUrl1 + term).pipe(
        map(res => res));
  }
  filter(categories:[any], data: string[]){
    this.categoryList = '';
    console.log(categories,categories[0], 'these are the values');
    console.log(data)
    // categories.valueChanges.subscribe(response =>{
    //   console.log('response:',response);
    //   categories = response;
    //   categories.setControl(0, new FormControl(true));
    //   console.log(categories,'after setting');
    // });
    for(let i = 0; i < categories.length; i++ ){
        if (categories[i] == true)
        {
          console.log(data[i], 'genre');
          if(this.categoryList != '')
            this.categoryList = this.categoryList.concat('+'.concat(data[i]));
          else{
            this.categoryList = this.categoryList.concat(data[i]);
            console.log(this.categoryList, 'query')
          }
            
        }
    }
    console.log(this.categoryList, 'list')
    return this.categoryList;
  }
}