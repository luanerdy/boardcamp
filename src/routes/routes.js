import connection from '../database/connection.js';
import categories from './categories/categories.js';
import games from './games/games.js';

const routes = app => {
    categories(app, connection);
    games(app, connection);
};

export default routes;
