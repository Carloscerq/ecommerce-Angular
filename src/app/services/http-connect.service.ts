import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Products } from '../dto/products';

@Injectable({
  providedIn: 'root'
})
export class HttpConnectService {

  URL = 'http://localhost:3000/items';

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = error.error.message;
    return throwError(errorMessage);
  }

  getProducts(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.URL)
      .pipe(
        retry(2),
        catchError(this.errorHandler)
      )
  }

  getProduct(id: number): Observable<Products> {
    return this.httpClient.get<Products>(this.URL + '/' + id)
      .pipe(
        retry(2),
        catchError(this.errorHandler)
      )
  }
}
