import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Product } from './product.model';  

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule // Include CommonModule here
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'] 
})
export class LayoutComponent {
  products: Product[] = [];
  cart: Product[] = [];  // Cart to hold added products

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.productList();
  }

  addProduct(data: Product) {
    return this.http.post('https://dummyjson.com/products', data);
  }

  productList() {
    this.http.get<{ products: Product[] }>('https://dummyjson.com/products').subscribe(
      (response) => {
        this.products = response.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Add a product to the cart
  addToCart(product: Product) {
    if (!this.isProductInCart(product)) {
      this.cart.push(product);
    }
  }

  // Check if a product is already in the cart
  isProductInCart(product: Product): boolean {
    return this.cart.some(item => item.id === product.id);
  }

  // View cart functionality (can be expanded to navigate to a cart page)
  viewCart() {
    console.log('Current Cart:', this.cart);
    // Add navigation or logic to show the cart contents
  }
}
