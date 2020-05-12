const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    // foreign key
    customer:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    service:  {
        type: String,
        required: true
    },
    price:  {
        type: String
    },
    due: {
        type: String
    },
    status:  {
        type: String
    },
    created_at:  {
        type: Date,
        default: Date.now
    }
});

const Invoice = module.exports = mongoose.model('Invoice', invoiceSchema);

// Get invocices
module.exports.getInvoices = (callback, limit) => {
    Invoice.find(callback).limit(limit).sort([['created_at', 'ascending']]);
}

// Get invoice by its id
module.exports.getInvoiceById = (id, callback, limit) => {
    Invoice.findById(id, callback);
}

// Get customer invoices
module.exports.getCustomerInvoices = (customer_id, callback, limit) => {
    const query = {customer: customer_id};
    Invoice.find(query, callback).limit(limit).sort([['created_at', 'ascending']]);
}

// Add Invoice, POST
module.exports.addInvoice = (invoice, callback) => {
    // an object
    const add = {
        customer: invoice.customer,
        service: invoice.service,
        price: invoice.price,
        due: invoice.due,
        status: invoice.status
    }
    Invoice.create(add, callback);
}

// Update invoice
module.exports.updateInvoice = (id, invoice, options, callback) => {
    const query = {_id: id};

    const update = {
        customer: invoice.customer,
        service: invoice.service,
        price: invoice.price,
        due: invoice.due,
        status: invoice.status
    }
    Invoice.findOneAndUpdate(query, update, options, callback);
}

// Remove invoice
module.exports.removeInvoice = (id, callback) => {
    const query = {_id: id};
    Invoice.remove(query, callback);
}