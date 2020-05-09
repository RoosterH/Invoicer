import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers;
  // inject dependency in constructor
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    // calling service, subscribe() is to send request to server https://angular.io/guide/http
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }
}
