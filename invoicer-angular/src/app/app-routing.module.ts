import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerDetailsComponent } from './components/customers-details/customers-details.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';

const routes: Routes = [
  {path: '', component: CustomersComponent},
  {path: 'customer/add', component: AddCustomerComponent},
  {path: 'customer/:id', component: CustomerDetailsComponent, runGuardsAndResolvers: 'always'},
  {path: 'customer/edit/:id', component: EditCustomerComponent},
  {path: 'invoice/add/:customer_id', component: AddInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
