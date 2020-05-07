const express = require('express');
const router = express.Router();

const Invoice = require('../models/invoice');
// Get All Invoices
router.get('/', (req, res) => {
    Invoice.getInvoices((err, invoices) => {
        if (err) {
            res.send(err)
        } 
        res.json(invoices);
    });
})

router.get('/:id', (req, res) => {
    Invoice.getInvoiceById(req.params.id, (err, invoice) => {
       if (err) {
           console.log(err);
           res.send(err);
       }
       res.json(invoice);
   });
});

// Get single invoice
router.get('/customers/:customer_id', (req, res) => {
    Invoice.getCustomerInvoices(req.params.customer_id, (err, invoices) => {
       if (err) {
           console.log(err);
           res.send(err);
       }
       res.json(invoices);
   });
});

// Add an invoice
router.post('/', (req, res) => {
    const invoice = req.body;
    Invoice.addInvoice(invoice, (err, invoice) => {
       if (err) {
           console.log(err);
           res.send(err);
       }
       res.json(invoice);
   });
});

// update an invoice
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const invoice = req.body;
    Invoice.updateInvoice(id, invoice, {}, (err, invoice) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(invoice);
   });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Invoice.removeInvoice(id, (err, invoice) => {
       if (err) {
           console.log(err);
           res.send(err);
       }
       res.json(invoice);
   });
});

// https://stackoverflow.com/questions/56078508/why-is-module-exports-router-is-needed
module.exports = router;
