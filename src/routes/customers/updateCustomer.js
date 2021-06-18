import Joi from 'joi';

const updateCustomer = (app, connection) => {
	const customerSchema = Joi.object({
		name: Joi.string().min(1).required(),
		phone: Joi.string().min(10).max(11).required(),
		cpf: Joi.string().length(11).required(),
		birthday: Joi.date().less('now').required(),
	});

	app.put('/customers/:id', async (req, res) => {
		const validation = customerSchema.validate(req.body);
		if (validation.error) {
			console.log(validation.error);
			return res.sendStatus(400);
		}
        const { name, phone, cpf, birthday } = req.body;
        const { id } = req.params;

        const sql = `
                    UPDATE customers 
                    SET name = $1, phone = $2, cpf = $3, birthday = $4 
                    WHERE id = $5`;

		try {
            await connection.query(sql, [name, phone, cpf, birthday, id]);
			res.sendStatus(200);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
};

export default updateCustomer;
