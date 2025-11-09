import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any; // To access Bootstrap modal

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  products: any[] = [];
  editingProduct: any = null;
  updatedDescription: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/data.json').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error loading data:', err);
      },
    });
  }

  // When user clicks "Edit"
  openEditModal(product: any) {
    this.editingProduct = product;
    this.updatedDescription = product.description;

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }

  // Save the edited description
  saveDescription() {
    if (this.editingProduct) {
      this.editingProduct.description = this.updatedDescription;
    }
    const modalEl = document.getElementById('editModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}
