import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, delay, Observable, throwError} from "rxjs";
import {IProduct} from "src/app/models/product";
import {ErrorService} from "src/app/services/error.service";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {

  }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products',
      {
        params: new HttpParams({
          fromObject: {limit: 5}
        })
      }).pipe(
      delay(2000),
      catchError(this.errorHandler)
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
