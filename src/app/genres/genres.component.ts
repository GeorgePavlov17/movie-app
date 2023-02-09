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

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMoviesGenre().then((result) => {
      result.genres.forEach((e: any) => {
        this.genresList.push(e.name);
      });
    });
    // console.log(this.genresList);
  }

  showMoviesByGenre() {
    this.genresList.forEach((e: any) => {
      // console.log(e);
    });

    this.movieService.getMoviesByGenre('14').then((result) => {
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
