import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie-service/movie.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  
  public genresList: any[] = [];
  public genreListArr: any[] = [];
  public selectedGenre: any;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMoviesGenre().then((result) => {
      result.genres.forEach((e: any) => {
        this.genresList.push(e);
      });
    });
    // console.log(this.genresList);
  }

  showMoviesByGenre(id: any) {
    this.selectedGenre = id;
    this.genreListArr = [];

    this.movieService.getMoviesByGenre(String(id)).then((result) => {
      const currMovieGenre = result.results.map((currGenre: any) => {
        return {
          id: currGenre.id,
          title: currGenre.original_title,
          overview: currGenre.overview,
          genres: currGenre.genre_ids,
          poster: currGenre.poster_path,
          release: currGenre.release_date,
          rating: currGenre.vote_average
        }
      });
      this.genreListArr.push(...currMovieGenre);
      // console.log(currMovieGenre);
    });
    // console.log(currMovieGenre);
  }

}
