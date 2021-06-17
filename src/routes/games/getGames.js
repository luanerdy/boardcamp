const getGames = (app, connection) => {
	app.get('/games', async (req, res) => {
		const { name } = req.query;
		let sql = `
            SELECT games.*, 
            categories.name AS "categoryName" 
            FROM games 
            INNER JOIN categories 
            ON games."categoryId" = categories.id`;

		try {
			if (name) {
				sql = `
                    SELECT games.*, 
                    categories.name AS "categoryName" 
                    FROM games INNER JOIN categories 
                    ON games."categoryId" = categories.id 
                    WHERE games.name ILIKE $1`;
				const games = await connection.query(sql, [name + '%']);
				return res.send(games.rows);
			}

			const games = await connection.query(sql);
			res.send(games.rows);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
};

export default getGames;
