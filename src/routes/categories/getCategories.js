const getCategories = (app, connection) => {
	app.get('/categories', async (req, res) => {
		const sql = 'SELECT * FROM categories';

		try {
			const categories = await connection.query(sql);
			res.send(categories.rows);
		} catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
	});
};

export default getCategories;
