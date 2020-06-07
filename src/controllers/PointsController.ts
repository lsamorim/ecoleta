import { Request , Response} from 'express';
import knex from '../database/connection';

class PointsController {
    async get(request: Request, response: Response) {
        const pointId = request.params.id;
        const point = await knex('Points').where('Id', pointId).first();

        if (!point)
            return response.status(404).json({ message: 'Point not found' });
        
        const items = await knex('Items')
            .join('PointItem', 'Items.Id', '=', 'PointItem.ItemId')
            .where('PointItem.PointId', pointId)
            .select('Items.Title');

        const responseModel = {
            ...point,
            items: items
        };

        return response.json(responseModel);
    }

    async list(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        console.log(parsedItems);
        const points = await knex('Points')
            .join('PointItem', 'Points.Id', '=', 'PointItem.PointId')
            .whereIn('PointItem.ItemId', parsedItems)
            .where('Points.City', String(city))
            .where('Points.Uf', String(uf))
            .distinct()
            .select('Points.*'); 

        // const responseModel = await points.map(async (point: any) => {
        //     const items = await knex('Items')
        //         .join('PointItem', 'Items.Id', '=', 'PointItem.ItemId')
        //         .where('PointItem.PointId', point.Id)
        //         .select('Items.Title');

        //     return {
        //         ...point,
        //         items: items
        //     };
        // });

        // points.forEach(async point => {
            
        // });
        
        return response.json(points);
    }


    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
        // or: requestBody = request.body;
        // requestBody.name, requestBody.email ...
        
        const point = {
            Image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
            Name: name,
            Email: email,
            Whatsapp: whatsapp,
            Latitude: latitude,
            Longitude: longitude,
            City: city,
            Uf: uf
        };

        const trx = await knex.transaction();
    
        const insertedIds = await trx('Points').insert(point);
    
        const pointId = insertedIds[0];
    
        const pointItems = items.map((itemId: number) => {
            return {
                PointId: pointId,
                ItemId: itemId
            };
        });
    
        await trx('PointItem').insert(pointItems);
    
        await trx.commit();

        return response.json({
            pointId, 
            ...point
         });
    }
}

export default PointsController;