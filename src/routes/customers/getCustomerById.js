const getCustomerById = (app, connection) => {
	app.get('/customers/:id', async (req, res) => {
        const {id} = req.params;
		const sql = `SELECT * FROM customers WHERE id = $1`;

		try {
            const customer = await connection.query(sql, [id]);
            res.send(...customer.rows);
		} catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
	});
};

export default getCustomerById;
