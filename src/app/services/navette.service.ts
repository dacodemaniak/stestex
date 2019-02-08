import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavetteService {

  constructor(private httpClient: HttpClient) { }

  public getTours(date: string = null): Observable<any> {
    let uri: string = environment.api + 'api/v2/tours';

    if (date !== null) {
      uri += '/' + date;
    }

    return this.httpClient.get<any>(uri).pipe(
      map(this.manageData),
      catchError(this.handleError)
    );
  }

  private manageData(result: Response) {
    const body: any = result;

    return body || null;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Une erreur est survenue :', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Erreur retournée ${error.status}, ` +
        `Contenu : ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Une erreur inattendue est survenue. Veuillez réessayer plus tard');
  }
}
