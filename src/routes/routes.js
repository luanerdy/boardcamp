import connection from '../database/connection.js';
import categories from './categories/categories.js';

const routes = app => {
    categories(app, connection);
};

export default routes;
