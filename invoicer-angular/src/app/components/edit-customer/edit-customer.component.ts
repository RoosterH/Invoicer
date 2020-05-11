import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  id;
  first_name;
  last_name;
  company;
  email;
  phone;
  street;
  city;
  state;
  zip;
  constructor(private router: Router, private customerService: CustomerService, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    // get the 'id' param from routing infomration
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomer(this.id).subscribe(customer => {
      this.first_name = (<Customer>customer).first_name;
      this.last_name = (<Customer>customer).last_name;
      this.company = (<Customer>customer).company;
      this.email = (<Customer>customer).email;
      this.phone = (<Customer>customer).phone;
      this.street = (<Customer>customer).address.street;
      this.city = (<Customer>customer).address.city;
      this.state = (<Customer>customer).address.state;
      this.zip = (<Customer>customer).address.zip;
    });
  }
  onEditSubmit() {
    let customer = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      address: {
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip
      }
    }

    this.customerService.updateCustomer(this.id, customer).subscribe(customer => {
      this.router.navigate(['/']);
    })
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