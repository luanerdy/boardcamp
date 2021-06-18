const getRentals = (app, connection) => {
	app.get('/rentals', async (req, res) => {
		const { gameId, customerId } = req.query;
        let sql = `
                    SELECT rentals.*, customers.name AS "customerName", 
                    games.name AS "gameName", games."categoryId" AS "categoryId", 
                    categories.name AS "categoryName"
                    FROM rentals 
                    JOIN customers
                    ON rentals."customerId" = customers.id
                    JOIN games
                    ON rentals."gameId" = games.id
                    JOIN categories
                    ON games."categoryId" = categories.id
                    WHERE rentals.id > 0`;
        const params = [];
        let paramCount = 1;

        if(gameId) {
            sql += ` AND games.id = $${paramCount}`;
            paramCount++;
            params.push(gameId);
        }

        if(customerId) {
            sql += ` AND customers.id = $${paramCount}`;
            paramCount++;
            params.push(customerId);
        }
        
        try {
            const rentals = await connection.query(sql, params);
            rentals.rows = rentals.rows.map(r => {
                const customer = {
                    id: r.customerId,
                    name: r.customerName
                };
                const game = {
                    id: r.gameId,
                    name: r.gameName,
                    categoryId: r.categoryId,
                    categoryName: r.categoryName
                };
                const newRental = {...r, customer, game};
                delete newRental.customerName;
                delete newRental.gameName;
                delete newRental.categoryId;
                delete newRental.categoryName;

                return newRental;
            });

            res.send(rentals.rows);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
	});
};

export default getRentals;
