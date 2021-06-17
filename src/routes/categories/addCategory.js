const addCategories = (app, connection) => {
	app.post('/categories', async (req, res) => {
		const { name } = req.body;
		let sql = 'SELECT * FROM categories WHERE name = $1';

        try{
            const result = await connection.query(sql, [name]);

            if (name.length === 0) return res.sendStatus(400);
            if (result.rows[0]) return res.sendStatus(409);

            sql = 'INSERT INTO categories (name) VALUES ($1)';
            await connection.query(sql, [name]);
            res.sendStatus(201);
        } catch(err) {
            console.log(err)
            res.sendStatus(500);
        }
		

		
	});
};

export default addCategories;
