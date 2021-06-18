import addCustomer from "./addCustomer.js";
import getCustomerById from "./getCustomerById.js";
import getCustomers from "./getCustomers.js";
import updateCustomer from "./updateCustomer.js";

const customers = (app, connection) => {
    getCustomers(app, connection);
    addCustomer(app, connection);
    getCustomerById(app, connection);
    updateCustomer(app, connection)
};

export default customers;
