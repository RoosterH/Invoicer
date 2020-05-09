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

  saveCustomer(customer) {
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/customers', customer, {headers: headers}).pipe(map(res=>res));
  }
}
