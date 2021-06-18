import dayjs from "dayjs";

const addRental = (app, connection) => {
	app.post('/rentals', async (req, res) => {
		const { customerId, gameId, daysRented } = req.body;
		const [rentDate, returnDate, delayFee] = [dayjs().format('YYYY-MM-DD'), null, null];
		const sql = `
                    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

		try {
			const customer = await connection.query(
				'SELECT * FROM customers WHERE id = $1',
				[customerId]
			);
			const game = await connection.query(
				'SELECT * FROM games WHERE id = $1',
				[gameId]
			);
			const gameSum = await connection.query(
				'SELECT SUM("stockTotal") FROM games WHERE id = $1',
                [gameId]
			);
			const rentalsCount = await connection.query(
				'SELECT COUNT(id) FROM rentals WHERE "gameId" = $1',
                [gameId]
			);
			const validation =
				!customer.rows[0] ||
				!game.rows[0] ||
				daysRented <= 0 ||
				gameSum.rows[0].sum <= rentalsCount.rows[0].count;

			if (validation) return res.sendStatus(400);

			const originalPrice = daysRented * game.rows[0].pricePerDay;

			await connection.query(sql, [
				customerId,
				gameId,
				rentDate,
				daysRented,
				returnDate,
				originalPrice,
				delayFee,
			]);
			res.sendStatus(201);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
};

export default addRental;
