
import { HttpClient } from '@angular/common/http';
import { Movie } from './../movie';
import { FormControl, FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';
import { Observable} from 'rxjs';
import { SearchService } from './../search.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.css']
})
export class SearchInterfaceComponent implements OnInit {

  categories: string[];
  postUrl1: string = "https://movie-search-project.herokuapp.com/movie/";
  postUrl2: string = "https://movie-search-project.herokuapp.com/";
  postUrl3: string = "https://movie-search-project.herokuapp.com/elastic/search/?g="
  results: Object;
  autolist: Object;
  movies$: Observable<Movie[]>;
  movies: Movie[];

  rForm: FormGroup;
  queryField: FormControl = new FormControl();

  // Infinite scroll parameters:
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';


  categoryList: string;
  selectedCategories: [string];

  constructor(private dataService: DataService, private searchService: SearchService, private fb: FormBuilder, private http: HttpClient) {
    this.rForm = this.fb.group({
      title: [null],
      categories: new FormArray([])
    });
  }

  ngOnInit() {
    this.getMovieData(this.postUrl1, this.movies);
    this.getCategoriesData(this.postUrl2);
    this.queryField.valueChanges
      .subscribe(queryField => this.searchService.suggest(queryField)
        .toPromise().then(response => {
          this.results = response;
          console.log(this.results, 'what')
        }));
    this.queryField.valueChanges.subscribe(value => console.log(value));
    console.log(this.results, 'this');
    this.queryField.valueChanges
      .subscribe(queryField => this.searchService.autocomplete(queryField)
        .toPromise().then(response => {
          this.autolist = response;
          console.log(this.autolist, 'auto')
        }));
  }

  getCategoriesData(url: string) {
    this.dataService.getCategoriesData(url).toPromise().then(response => {
      this.categories = response['categories'];
      this.setCategories();
      console.log(this.rForm.get('categories'), 'categories here')
    });
  }
  getMovieData(url: string, movies: any) {
    this.dataService.getMovieData(url).toPromise().then(response => {
      // console.log(response['next']);
      // console.log(this.movies);
      if (this.movies == undefined) { this.movies = response['results']; }
      else { this.movies = this.movies.concat(response['results']) }
      // console.log(this.movies);
      if (response['next'] != null) {
        // console.log('more')
        this.getMovieData(response['next'], this.movies);
      }
      else {
        // console.log('End');
        return this.movies;
      }
    });
  }
  setCategories() {
    this.categories.forEach((o, i) => {
      const control = new FormControl(false);
      (this.rForm.controls.categories as FormArray).push(control);
    });
  }
  onScrollDown(ev) {
    console.log('scrolled down!!', ev);
    this.getMovieData(this.postUrl1, this.movies);
    this.direction = 'down';
  }
  search() {
    console.log(this.queryField.value, 'searchterm');
    this.searchService.search(this.queryField.value).subscribe(results => {
      this.results = results;
    });
    // this.results = this.searchService.search(term)
    console.log(this.results, 'sr')
  }
  filter(){
    console.log(this.rForm.controls.categories, 'cats');
    this.selectedCategories = _.map(
      this.rForm.controls.categories["controls"],
      (category, i) =>{
        return category.value;
      }
    )
    console.log(this.selectedCategories, 'selected');
    console.log(this.rForm.value.categories, 'catsvalues');
    this.categoryList = this.searchService.filter(this.selectedCategories, this.categories)
    console.log(this.categoryList)
    this.http.get(this.postUrl3 + this.categoryList.toLowerCase()).subscribe(response => {  
      this.results = response;
    }
    );
  }
}
