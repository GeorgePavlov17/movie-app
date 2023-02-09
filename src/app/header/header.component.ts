import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Movie } from '../types/Movie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onSearchedMovie: EventEmitter<Movie> = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit(): void {
  }

  emitSearchedMovie(movie: Movie): void {
    this.onSearchedMovie.emit(movie);
  }
}
