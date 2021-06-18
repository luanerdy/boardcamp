const deleteRental = (app, connection) => {
	app.delete('/rentals/:id', async (req, res) => {
		const { id } = req.params;
		const sql = 'DELETE FROM rentals WHERE id = $1';

		try {
			const rental = await connection.query(
				'SELECT * FROM rentals WHERE id = $1',
				[id]
			);
            if(!rental.rows[0]) return res.sendStatus(404);
            if(rental.rows[0].returnDate) return res.sendStatus(400);

            await connection.query(sql, [id]);
            res.sendStatus(200);
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
};

export default deleteRental;
