import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/types/Movie';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  MOVIE_API_URL = environment.apiUrl;
  MOVIE_API_KEY = environment.apiKey;

  constructor(private http: HttpClient) { }

  getMovie(movieName: string): Promise<any> {
    const query = `${this.MOVIE_API_URL}search/movie?api_key=${this.MOVIE_API_KEY}&query=${movieName}`;

    return new Promise((resolve, reject) => {
      this.http.get(query).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  saveMoviesList(movies: Movie[]): Promise<any> {
    const exampleAdress = 'https://www.example.com';

    return new Promise((resolve, reject) => {
      this.http.post(exampleAdress, movies).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  getMoviesGenre(): Promise<any> {
    const query = `${this.MOVIE_API_URL}genre/movie/list?api_key=${this.MOVIE_API_KEY}`;

    return new Promise((resolve, reject) => {
      this.http.get(query).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  getMoviesByGenre(id: string): Promise<any> {
    const query = `${this.MOVIE_API_URL}genre/${id}/movies?api_key=${this.MOVIE_API_KEY}`;

    return new Promise((resolve, reject) => {
      this.http.get(query).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  getPopularMovies(): Promise<any> {
    const query = `${this.MOVIE_API_URL}movie/popular?api_key=${this.MOVIE_API_KEY}`;

    return new Promise((resolve, reject) => {
      this.http.get(query).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }
}
