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

  /**
   * User registration
   * Making the api call for the user registration endpoint
   * @param {string} userDetails - User form data
   * @return User details from the API
   */
  //1. Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * User Login
   * Making the api call for the user login endpoint
   * @param {string} userDetails - User form data
   * @return User details from the API
   */
  //2. User login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all Movies
   * Making the api call for the movies endpoint
   * @param - none
   * @return List with all movies
   */
  //3. Get all movies enpoint
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + '/movies', this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  /**
   * Get a Movie
   * Making the api call for the movies endpoint
   * @param {string} title - movie title
   * @return movie details
   */
  //4. Get one movie
  public getOneMovie(title: string): Observable<any> {
    console.log(title);
    return this.http
      .get(apiUrl + '/movies/' + title)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get director
   * Making the api call for the director endpoint
   * @param {string} name - Director name
   * @return Director details
   */
  //5. Get director
  public getDirector(name: string): Observable<any> {
    console.log(name);
    return this.http
      .get(apiUrl + '/director/' + name)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get genre
   * Making the api call for the genre endpoint
   * @param {string} title - genre title
   * @return Details of a genre
   */
  //6. Get genre
  public getGenre(title: string): Observable<any> {
    console.log(title);
    return this.http
      .get(apiUrl + '/movies/genre/' + title)
      .pipe(catchError(this.handleError));
  }

  /**
   * Save a movie to Favorites
   * Making the api call for the movies endpoint
   * @param {string} movieID - Id of the movie
   * @return The movie details saved
   */
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

  /**
   * Update user info
   * Making the api call for the user endpoint
   * @param {string} username - User form data
   * @return User details from the API
   */
  //8. Update user info
  public updateUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    return this.http
      .put(`${apiUrl}/users/${username}`, updatedUser, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete user
   * Making the api call for the user endpoint
   * @param {string} username - User form data
   * @return Confirmation of deletion
   */
  //9. Delete user
  public deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    return this.http
      .delete(`${apiUrl}/users/${username}`, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  /**
   * Remove movie from Favorites
   * Making the api call for the users movies endpoint
   * @param {string} username - User name
   * @param {string} movieID - id of the movie
   * @return List of favorites without the removed movie
   */
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

  /**
   * Get users Favorite movies
   * Making the api call for the users movies endpoint
   * @param {string} username - name of the user
   * @return The list of the user's favorite movies
   */
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
