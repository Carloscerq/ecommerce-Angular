import { Component, OnInit } from '@angular/core';
import { Products } from '../../dto/products';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Products[] = [];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
      this.getCartProducts();
  }

  getCartProducts() {
    this.cartService.getCart().subscribe(
      (data: Products[]) => {
        this.products = data;
        console.log(data);
      }
    );
  }

}
