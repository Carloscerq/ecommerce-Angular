import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Products } from '../dto/products';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  URL = 'http://localhost:3000/cart';

  constructor(
    private httpClient: HttpClient
  ) { }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = error.error.message;
    return throwError(errorMessage);
  }

  getCart(): Observable<Products[]> {
    return this.httpClient.get<Products[]>(this.URL)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  addToCart(product: Products) {
    return this.httpClient.post(this.URL, product)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  removeFromCart(product: Products) {
    return this.httpClient.delete(this.URL + '/' + product.id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
}
