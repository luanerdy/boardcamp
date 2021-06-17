import pg from 'pg';

const { Pool } = pg;

const info = {
	user: 'bootcamp_role',
	password: 'senha_super_hiper_ultra_secreta_do_role_do_bootcamp',
	host: 'localhost',
	port: 5432,
	database: 'boardcamp',
};

const connection = new Pool(info);

export default connection;
