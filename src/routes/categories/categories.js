import addCategories from "./addCategory.js";
import getCategories from "./getCategories.js";

const categories = (app, connection) => {
    getCategories(app, connection);
    addCategories(app, connection);
};

export default categories;
