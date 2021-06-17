import addCategory from "./addCategory.js";
import getCategories from "./getCategories.js";

const categories = (app, connection) => {
    getCategories(app, connection);
    addCategory(app, connection);
};

export default categories;
