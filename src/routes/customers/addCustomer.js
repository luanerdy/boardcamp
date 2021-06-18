import Joi from 'joi';

const addCustomer = (app, connection) => {
	const customerSchema = Joi.object({
		name: Joi.string().min(1).required(),
		phone: Joi.string().min(10).max(11).required(),
		cpf: Joi.string().length(11).required(),
		birthday: Joi.date().less('now').required(),
	});

	app.post('/customers', async (req, res) => {
		const validation = customerSchema.validate(req.body);
		if (validation.error) {
			console.log(validation.error);
			return res.sendStatus(400);
		}
        const { name, phone, cpf, birthday } = req.body;

        let sql = `
                    SELECT cpf 
                    FROM customers 
                    WHERE cpf = $1`;

		try {
            const customer = await connection.query(sql, [cpf]);
            if(customer.rows[0]) return res.sendStatus(409);

            sql = `
                    INSERT INTO customers 
                    (name, phone, cpf, birthday) 
                    VALUES ($1, $2, $3, $4)`;
                
            await connection.query(sql, [name, phone, cpf, birthday]);
			res.sendStatus(201);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
};

export default addCustomer;
