const addCategory = (app, connection) => {
	app.post('/games', async (req, res) => {
		const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
		let sql = 'SELECT * FROM games WHERE name = $1';

		try {
			const result = await connection.query(sql, [name]);
			const games = await connection.query('SELECT id FROM categories');
			const validIds = games.rows.map((g) => g.id);

			if (
				name.length === 0 ||
				!(stockTotal > 0) ||
				!(pricePerDay > 0) ||
				!validIds.includes(categoryId)
			)
				return res.sendStatus(400);
			if (result.rows[0]) return res.sendStatus(409);

			sql = 'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)';
			await connection.query(sql, [name, image, stockTotal, categoryId, pricePerDay]);
			res.sendStatus(201);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
};

export default addCategory;
