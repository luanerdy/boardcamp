import dayjs from 'dayjs';

const endRental = (app, connection) => {
	app.post('/rentals/:id/return', async (req, res) => {
		const { id } = req.params;
		const secondsInDay = 86400000;
		const returnDate = dayjs().format('YYYY-MM-DD');
		const sql = `
                    UPDATE rentals 
                    SET "returnDate" = $1, "delayFee" = $2
                    WHERE id = $3`;

		try {
			const rental = await connection.query(
				'SELECT * FROM rentals WHERE id = $1',
				[id]
			);
			if (!rental.rows[0]) return res.sendStatus(404);
			if (rental.rows[0].returnDate) return res.sendStatus(400);

			const thisRental = rental.rows[0];
			const totalDays =
				(Date.now() - Date(thisRental.rentDate)) / secondsInDay;
			const delayFee =
				totalDays > thisRental.daysRented
					? (thisRental.originalPrice / thisRental.daysRented) *
					  (totalDays - thisRental.daysRented)
					: 0;

			await connection.query(sql, [returnDate, delayFee, id]);
			res.sendStatus(200);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
};

export default endRental;
