const getCustomers = (app, connection) => {
	app.get('/customers', async (req, res) => {
        let {cpf} = req.query;
        cpf = cpf ?? '';
		const sql = `SELECT * FROM customers WHERE cpf LIKE $1`;

		try {
            const customers = await connection.query(sql, [cpf + "%"]);
            res.send(customers.rows);
		} catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
	});
};

export default getCustomers;
