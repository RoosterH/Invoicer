import { Component, OnInit } from '@angular/core';
// the reason why we need Router is because we need to do a re-direct
// ActivateRoute and Params are for getting the :id
import { ActivatedRoute, Params } from '@angular/router'
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  id: string;
  customer: Customer;
  //customer: Customer;
  invoices: [];
  //customer: Customer; // Customer is an interface(similar to struct) defined below
  //invoices: Invoice[]; // Invoice interface defined below

  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the 'id' param from routing infomration
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomer(this.id).subscribe(customer => {
      this.customer = <Customer>customer;
    });
  } 
}

export interface Customer {
  id: string;
  first_name: string;
  last_name:  string;
  company:  string;
  email: string;
  phone:  string
  address:  {
    street: string;
    city: string;
    state: string;
    zip: string
  }
}

export interface Invoice {
  _id: string;
  customer: string;
  service: string;
  status: string;
  created_at: Date;
}