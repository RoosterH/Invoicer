import { Component, OnInit, OnDestroy } from '@angular/core';
// the reason why we need Router is because we need to do a re-direct
// ActivateRoute and Params are for getting the :id
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  id: string;
  customer;
  invoices;
  
  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the 'id' param from routing infomration
    //this.id = this.route.snapshot.params['id'];
    this.id = this.route.snapshot.params.id;
   
    this.customerService.getCustomer(this.id).subscribe(customer => {
      this.customer = <Customer>customer;
    });

    this.customerService.getInvoices(this.id).subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  markPaid(id, invoice) {
    invoice.status = 'paid';
    this.customerService.markPaid(id, invoice).subscribe(invoice => {
      invoice = 'paid';
    });
  }

  onDeleteClick(id) {
    this.customerService.deleteInvoice(id).subscribe(invoice => {
      // this won't reload the page
      // this.router.navigate(['/customer/'+this.id]);

      // using the following method will reload the current page after delete 
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
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