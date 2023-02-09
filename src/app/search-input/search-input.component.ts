import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MovieService } from '../services/movie-service/movie.service';
import { Movie } from '../types/Movie';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @ViewChild('search') input: any;

  @Output() onSelect: EventEmitter<Movie> = new EventEmitter<Movie>();

  public searchResults: Movie[] = [];

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
  }

  performSearch(event: KeyboardEvent) {
    const query = (event.target as HTMLInputElement).value;
    if (query.length >= 3) {
      this.movieService.getMovie(query).then((result) => {
        this.searchResults = result.results.map((item: any): Movie => {
          return {
            id: item.id,
            title: item.original_title,
            overview: item.overview,
            genres: item.genre_ids,
            poster: item.poster_path,
            release: item.release_date,
            rating: item.vote_average
          }
        });
      });
    } else {
      this.searchResults = [];
    }
  }

  selectResult(item: Movie): void {
    this.onSelect.emit(item);
    this.searchResults = [];
    this.input.nativeElement.value = '';
  }

}