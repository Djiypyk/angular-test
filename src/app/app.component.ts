import {Component, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {IProduct} from "src/app/models/product";
import {ProductsService} from "src/app/services/products.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Fake shop';

  // products: IProduct[] = []
  products$: Observable<IProduct[]>

  loading = false

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.products$ = this.productsService.getAll().pipe(
      tap(() => this.loading = false)
    )
    // this.productsService.getAll().subscribe((products) => {
    //   this.products = products
    //   this.loading = false
    // })
  }

}
