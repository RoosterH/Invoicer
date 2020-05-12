import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // inject HttpClient as dependency
  constructor(private http: HttpClient) { }

  getCustomers() {
    // return an observable, 
    // https://rxjs-dev.firebaseapp.com/api/operators/map
    // res is now in json format so no need to do res.json()
    // pipe
    // map<T, R>(project: (value: T, index: number) => R, thisArg?: any): OperatorFunction<T, R>
    return this.http.get('http://localhost:3000/api/customers').pipe(map(res => res));
  }

  getCustomer(id) {
    // return an observable
    return this.http.get('http://localhost:3000/api/customers/'+id).pipe(map(res => res));
  }

  saveCustomer(customer) {
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/customers', customer, {headers: headers}).pipe(map(res=>res));
  }

  updateCustomer(id, customer) {
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/customers/'+id, customer, {headers: headers}).pipe(map(res=>res));
  }
  
  deleteCustomer(id) {
    // return an observable
    return this.http.delete('http://localhost:3000/api/customers/'+id).pipe(map(res => res));
  }

  getInvoices(customer_id) {
    // return an observable
    return this.http.get('http://localhost:3000/api/invoices/customers/'+customer_id).pipe(map(res => res));
  }

  markPaid(id, invoice) {
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/invoices/'+id, invoice, {headers: headers}).pipe(map(res=>res));
  }

  deleteInvoice(id) {
    return this.http.delete('http://localhost:3000/api/invoices/'+id).pipe(map(res=>res));
  }

  saveInvoice(invoice) {
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/invoices', invoice, {headers: headers}).pipe(map(res=>res));
  }
}
