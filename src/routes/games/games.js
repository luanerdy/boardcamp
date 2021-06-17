import addGame from "./addGame.js";
import getGames from "./getGames.js";

const games = (app, connection) => {
    getGames(app, connection);
    addGame(app, connection);
};

export default games;
