import { SearchInterfaceComponent } from './../search-interface/search-interface.component';
import { Movie } from './../movie';
import { DataService } from './../data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() movies: Movie[];
  @Input() results: Object;
  @Input() nextUrl: string;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  ev: any;
  postUrl1 : string = "https://movie-search-project.herokuapp.com/movie/";
  constructor(private dataService:DataService, private sic: SearchInterfaceComponent) { }

  ngOnInit() {
    
  }
  onScrollDown (ev) {
    console.log('scrolled down!!', ev);
    console.log(this.nextUrl);
    this.sic.getMovieData(this.nextUrl, this.movies);
    this.direction = 'down';
  }
}