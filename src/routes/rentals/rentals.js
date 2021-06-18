import addRental from "./addRental.js";
import deleteRental from "./deleteRental.js";
import endRental from "./endRental.js";
import getRentals from "./getRentals.js";

const rentals = (app, connection) => {
    getRentals(app, connection);
    addRental(app, connection);
    endRental(app, connection);
    deleteRental(app, connection);
};

export default rentals;
