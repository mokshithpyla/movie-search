
import { Movie } from './movie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  movie : any;
  movies : Movie[];
  categories : string[];
  moviesData: any;
  categoriesData: any;
  postUrl1 : string = "https://movie-search-project.herokuapp.com/movie/";
  postUrl2 : string = "https://movie-search-project.herokuapp.com/"
  constructor(private http: HttpClient) { }

  getMovieData(url: string) {
    return this.http.get(url);
  }

  getCategoriesData(url: string) {
    return this.http.get(url);
  }
}
