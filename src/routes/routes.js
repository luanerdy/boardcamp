import connection from '../database/connection.js';
import categories from './categories/categories.js';
import games from './games/games.js';
import customers from './customers/customers.js';

const routes = app => {
    categories(app, connection);
    games(app, connection);
    customers(app, connection);

};

export default routes;
