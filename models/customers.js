const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    first_name:  {
        type: String,
        required: true
    },
    last_name:  {
        type: String,
        required: true
    },
    company:  {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    },
    phone:  {
        type: String
    },
    // address is an object
    address:  {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    created_at:  {
        type: Date,
        default: Date.now
    },
});

const Customer = module.exports = mongoose.model('Customer', customerSchema);

// Get Customers
module.exports.getCustomers = (callback, limit) => {
    console.log('in customers models');
    Customer.find(callback).limit(limit).sort([['first_name', 'ascending']]);
    console.log('out customers models');
}

// Get a customer
module.exports.getCustomerById = (id, callback) => {
    console.log('in customer model');
    Customer.findById(id, callback);
    console.log('out customer model');
}

// Add Customer, POST
module.exports.addCustomer = (customer, callback) => {
    // an object
    const add = {
        first_name: customer.first_name,
        last_name: customer.last_name,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        address: {
            street: customer.address.street,
            city: customer.address.city,
            state: customer.address.state,
            zip: customer.address.zip
        }
    }
    Customer.create(add, callback);
}

// Update customer
module.exports.updateCustomer = (id, customer, options, callback) => {
    const query = {_id: id};
    const update = {
        first_name: customer.first_name,
        last_name: customer.last_name,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        address: {
            street: customer.address.street,
            city: customer.address.city,
            state: customer.address.state,
            zip: customer.address.zip
        }
    }
    // mongoose does not have findAndModify
    Customer.findOneAndUpdate(query, update, options, callback);
}

// Remove customer
module.exports.removeCustomer = (id, callback) => {
    const query = {_id: id};
    Customer.remove(query, callback);
}