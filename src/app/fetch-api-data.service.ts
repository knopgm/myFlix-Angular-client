import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-api-gkm.herokuapp.com';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  //1. Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //2. User login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(catchError(this.handleError));
  }

  //3. Get all movies enpoint
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + '/movies', this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  //4. Get one movie
  public getOneMovie(title: string): Observable<any> {
    console.log(title);
    return this.http
      .get(apiUrl + '/movies/' + title)
      .pipe(catchError(this.handleError));
  }

  //5. Get director
  public getDirector(name: string): Observable<any> {
    console.log(name);
    return this.http
      .get(apiUrl + '/director/' + name)
      .pipe(catchError(this.handleError));
  }

  //6. Get genre
  public getGenre(title: string): Observable<any> {
    console.log(title);
    return this.http
      .get(apiUrl + '/movies/genre/' + title)
      .pipe(catchError(this.handleError));
  }

  //7. Add movie to favorite Movies
  public addFavoriteMovie(movieID: string): Observable<any> {
    console.log(movieID);
    const username = localStorage.getItem('user');

    return this.http
      .post(
        apiUrl + `/users/${username}/movies/${movieID}`,
        {},
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  //8. Update user info
  public updateUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}/users/${username}`, updatedUser, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  //9. Delete user
  public deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}/users/${username}`, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  //10. Remove movie from favorite movies list
  public removeFavoriteMovie(movieID: string): Observable<any> {
    const username = localStorage.getItem('user');
    return this.http
      .delete(
        apiUrl + `/users/${username}/movies/${movieID}`,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  //11. Get user and get favorite movies of a user
  public getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}/users/${username}`, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return httpOptions;
  }
}