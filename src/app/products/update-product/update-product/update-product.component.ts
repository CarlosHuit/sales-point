import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  loading = false;

  constructor() { }

  ngOnInit() {
  }

  searchProduct = () => {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

}
