import { Component, OnInit } from '@angular/core';
import { HttpConnectService } from "../../services/http-connect.service";
import { Products } from "../../dto/products";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Products[] = [];

  constructor(
    private httpConnectService: HttpConnectService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.httpConnectService.getProducts().subscribe(
      (data: Products[]) =>  this.products = data
    );
  }
}
