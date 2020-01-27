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

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  postUrl1 : string = "https://movie-search-project.herokuapp.com/movie/";
  constructor(private dataService:DataService, private sic: SearchInterfaceComponent) { }

  ngOnInit() {
    
  }
  onScrollDown (ev) {
    console.log('scrolled down!!', ev);
    this.sic.getMovieData(this.postUrl1, this.movies);
    this.direction = 'down';
  }
}