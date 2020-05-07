const express = require('express');
const router = express.Router();

const Customer = require('../models/customers');

// Get all Customers, this maps to localhost:3000/api/customers
router.get('/', (req, res) => {
     Customer.getCustomers((err, customers) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(customers);
    });
});

// Get single customer
router.get('/:id', (req, res) => {
    Customer.getCustomerById(req.params.id, (err, customer) => {
       if (err) {
           console.log(err);
           res.send(err);
       }
       res.json(customer);
   });
});

// Add a customer
router.post('/', (req, res) => {
    const customer = req.body;
    Customer.addCustomer(customer, (err, customer) => {
       if (err) {
           console.log(err);
           res.send(err);
       }
       res.json(customer);
   });
});

// update a customer
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const customer = req.body;
    console.log('here');
    Customer.updateCustomer(id, customer, {}, (err, customer) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(customer);
   });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Customer.removeCustomer(id, (err, customer) => {
       if (err) {
           console.log(err);
           res.send(err);
       }
       res.json(customer);
   });
});

// https://stackoverflow.com/questions/56078508/why-is-module-exports-router-is-needed
module.exports = router;
