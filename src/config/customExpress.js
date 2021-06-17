import express from 'express';
import cors from 'cors';

const custoExpress = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    return app;
};

export default custoExpress;
