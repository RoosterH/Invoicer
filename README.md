Creating an Invoicer app using MEAN 
main: app.js
routes/ contains the routing for front end
modeles/ has backend codes that will be used from routes files
clients/ contains codes that will be used for client side

MEAN code structure
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

this.http.post() app.js that defines paths 
app.use('/api/customers', customers);
=> /routes/customers.js router.post() 
=> /models/customers.js module.exports.addCustomer
=> mongoose.create() write data to MongoDB
