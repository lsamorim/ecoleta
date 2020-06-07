import express, { response } from 'express';
import knex from './database/connection';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/', (request, response) => {
    return response.json({ message: 'Ecoleta Backend'});
});

routes.get('/items', itemsController.list);

routes.get('/points/:id', pointsController.get);
routes.get('/points', pointsController.list);
routes.post('/points', pointsController.create);

export default routes;