import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers;
  // inject dependency in constructor
  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    // calling service, subscribe() is to send request to server https://angular.io/guide/http
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  onDeleteClick(id) {
    this.customerService.deleteCustomer(id).subscribe(customer => {
      this.router.navigate(['/']);
    });
  }
}
