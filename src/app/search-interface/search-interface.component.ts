
import { HttpClient } from '@angular/common/http';
import { Movie } from './../movie';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchService } from './../search.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  nextUrl: string;
  results: Object;
  movies$: Observable<Movie[]>;
  movies: Movie[];

  rForm: FormGroup;
  queryField: FormControl = new FormControl();



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
    this.queryField.valueChanges.pipe(
      // debounceTime(500),
      switchMap(searchTerm => this.searchService.suggest(searchTerm)),
      distinctUntilChanged())
    .subscribe(response => {
      this.results = response;
      console.log(this.results, 'what');
    });
  }

  getCategoriesData(url: string) {
    this.dataService.getCategoriesData(url).subscribe(response => {
      this.categories = response['categories'];
      this.setCategories();
      console.log(this.rForm.get('categories'), 'categories here')
    });
  }
  getMovieData(url: string, movies: any) {
    this.dataService.getMovieData(url).subscribe(response => {
      // console.log(response['next']);
      console.log(this.movies);
      if (this.movies == undefined) { this.movies = response['results']; }
      else { this.movies = this.movies.concat(response['results']) }
      // console.log(this.movies);
      if (response['next'] != null) {
        // console.log('more')
        // this.getMovieData(response['next'], this.movies);
        this.nextUrl = response['next'];
      }
      else {
        console.log('End');
        // this.getMovieData(url, this.movies);
        this.nextUrl = this.postUrl1;
        return this.movies;
      }
    });
  }
  setCategories() {
    this.categories.forEach(() => {
      const control = new FormControl(false);
      (this.rForm.controls.categories as FormArray).push(control);
    });
  }

  search() {
    console.log(this.queryField.value, 'searchterm');
    this.searchService.search(this.queryField.value).subscribe(results => {
      this.results = results;
    });
    // this.results = this.searchService.search(term)
    console.log(this.results, 'sr')
  }
  getControls() {
    return (this.rForm.get('categories') as FormArray).controls;
  }
  filter() {
    console.log(this.rForm.controls.categories, 'cats');
    this.selectedCategories = _.map(
      this.rForm.controls.categories["controls"],
      (category, i) => {
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
