import connection from '../database/connection.js';
import categories from './categories/categories.js';
import games from './games/games.js';
import customers from './customers/customers.js';
import rentals from './rentals/rentals.js';

const routes = app => {
    categories(app, connection);
    games(app, connection);
    customers(app, connection);
    rentals(app, connection);
};

export default routes;
