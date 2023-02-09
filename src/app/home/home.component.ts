import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../services/movie-service/movie.service';
import { Movie } from '../types/Movie';

export type SearchEntry = {
  title: string,
  checked: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('file', { read: ElementRef }) file?: ElementRef;

  public movies: Movie[] = [];
  public uploaded: SearchEntry[] = [];
  public popularMovies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies().then((result) => {
      // console.log(result);
      const popular = result.results.map((popularMovie: any) => {
        return {
          id: popularMovie.id,
          title: popularMovie.original_title,
          overview: popularMovie.overview,
          genres: popularMovie.genre_ids,
          poster: popularMovie.poster_path,
          release: popularMovie.release_date,
          rating: popularMovie.vote_average
        }
      });
      this.popularMovies.push(...popular);
      // console.log(popular);
    });
  }

  uploadFile() {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.uploaded = String(event.target?.result).split(/[\r\n]+/).map((title: string): SearchEntry => {
        return { title, checked: true };
      });
      // console.log(event.target?.result);  
      // console.log(this.uploaded);
    }
    if (this.file) {
      if (this.file.nativeElement.files && this.file.nativeElement.files.length) {
        reader.readAsText(this.file.nativeElement.files[0]);
      }
    }
  }

  search() {
    this.movies = [];

    this.uploaded.forEach((entry: SearchEntry) => {
      if (entry.checked === true) {
        this.movieService.getMovie(entry.title).then((result) => {
          // console.log(result);
          const matchedMovies: Movie[] = result.results.map((currMovie: any): Movie => {
            // console.log(currMovie.backdrop_path);
            return {
              id: currMovie.id,
              title: currMovie.original_title,
              overview: currMovie.overview,
              genres: currMovie.genre_ids,
              poster: currMovie.poster_path,
              release: currMovie.release_date,
              rating: currMovie.vote_average
            };
          });
          this.movies.push(matchedMovies[0]);
        });
      }
    });
  }

  delete(movie: Movie) {
    let index = this.movies.indexOf(movie);
    this.movies.splice(index, 1);
  }

  save() {
    this.movieService.saveMoviesList(this.movies).then((result) => {

    }, (error) => {
      console.log('error!');
    });
  }

  sortByRating(event: any) {
    switch (event.target.value) {
      case "Low":
        {
          this.movies = this.movies.sort((low, high) => low.rating - high.rating);
          break;
        }

      case "High":
        {
          this.movies = this.movies.sort((low, high) => high.rating - low.rating);
          break;
        }
    }
    return this.movies;
  }

  displayMovie(movie: Movie): void {
    this.movies.push(movie);
  }

  // getPopular() {
  //   this.movieService.getPopularMovies().then((result) => {
  //     // console.log(result);
  //     const popular = result.results.map((popularMovie: any) => {
  //       return {
  //         id: popularMovie.id,
  //         title: popularMovie.original_title,
  //         overview: popularMovie.overview,
  //         genres: popularMovie.genre_ids,
  //         poster: popularMovie.poster_path,
  //         release: popularMovie.release_date,
  //         rating: popularMovie.vote_average
  //       }
  //     });
  //     this.popularMovies.push(popular[0]);
  //     // console.log(popular);
  //   });
  //   console.log(this.popularMovies);
  // }

}
