## Creating an Invoicer app using MEAN 
### This is the Inovicer MEAN APP project listed in eduonix.com course "Projects in MongoDB - Learn MongoDB Building Porjects" 
### Express: 4.17.1
### Mongoose: 5.9.12
### Angular CLI: 9.1.4
### Node: 12.16.2
### OS: darwin x64

```
main: app.js
routes/ contains the routing for front end
modeles/ has backend codes that will be used from routes files
clients/ contains codes that will be used for client side
```
## MEAN code structure
```
Front End Routing is defined in app-routing.module.ts 
Routes = [
  {path: '', component: CustomersComponent},
  {path: 'customer/add', component: AddCustomerComponent},
  {path: 'customer/:id', component: CustomerDetailsComponent, runGuardsAndResolvers: 'always'},
  {path: 'customer/edit/:id', component: EditCustomerComponent},
  {path: 'invoice/add/:customer_id', component: AddInvoiceComponent}
]
where Angular app.component.html defined <router-outlet> and index.html defines <app-root>

We have /project/project-angular/src/app/components/
	   /project/project-angular/src/app/services/
components consists of 
    xxx.component.css 
    xxx.component.html => calls functions inside of xxx.component.ts
    xxx.component.spec.ts 
    xxx.component.ts => defines class and functions will be used for this component and call business codes in xxx.service.ts in /services/.

services contain the business codes that xxx.component.ts will call,
	Provide CRUD functions to communicate with back end
Example:
customer.service.ts
saveCustomer(customer) {
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/customers', customer, {headers: headers}).pipe(map(res=>res));
  }

this.http.post() => app.js that defines paths 
app.use('/api/customers', customers);
=> /routes/customers.js router.post() 
=> /models/customers.js module.exports.addCustomer
=> mongoose.create() write data to MongoDB
```
### Known issue
```
In Customer Details page, hit "Refresh" on Chrome will get "Cannot GET /customer/5eba2207e4cd93edebe14b24"
Console "Failed to load resource: the server responded with a status of 404 (Not Found)"
This only happens using Angular app.  It didn't have the problem on development code using port 4200.
```