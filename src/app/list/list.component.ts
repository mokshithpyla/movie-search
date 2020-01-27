import { Movie } from './../movie';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  movies : Movie[];

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  postUrl1 : string = "https://movie-search-project.herokuapp.com/movie/";
  postUrl2 : string = "https://movie-search-project.herokuapp.com/";
  postUrl3 : string = "https://movie-search-project.herokuapp.com/elastic/suggest/?q=";

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }
  // getMovieData(url: string, movies: any) {
  //   this.dataService.getMovieData(url, this.movies).toPromise().then(response => {
  //     console.log(response['next']);
  //     console.log(this.movies);
  //     if (this.movies == undefined) 
  //       { this.movies = response['results']; }
  //     else
  //       { this.movies = this.movies.concat(response['results'])}
  //       console.log(this.movies);
  //     if(response['next'] != null) {
  //       console.log('more')
  //       this.getMovieData(response['next'], this.movies);
  //     }
  //     else {
  //         console.log('End');
  //         return this.movies;
  //     }
  //   });
  // }

  // onScrollDown (ev) {
  //   console.log('scrolled down!!', ev);
  //   this.getMovieData(this.postUrl1, this.movies);
  //   this.direction = 'down';
  // }
}


// getMovieData(url: string, movies: any, scrolled : boolean) {
//   this.dataService.getMovieData(url).toPromise().then(response => {
//     this.nextUrl = response['next'];
//     console.log(response['next']);
//     console.log(this.movies, 'before');
//     if (this.movies == undefined) 
//     { 
//       this.movies = response['results']; 
//       console.log(this.movies, 'here')
//     }
//     else
//     { 
//       this.movies = this.movies.concat(response['results'])
//       this.nextUrl = response['next'];
//     }
//     console.log(this.movies,'after');
//     if (response['next'] == null){
//     console.log('End');
//     return this.movies;
//   }
//   }
// );
// }



// onScrollDown (ev) {
// console.log('scrolled down!!', ev);
// console.log(this.nextUrl, 'going here');
// if(this.nextUrl != null)
// this.getMovieData(this.nextUrl, this.movies, this.scrolled);
// this.direction = 'down';
// }