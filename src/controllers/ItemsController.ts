import { Request , Response} from 'express';
import knex from '../database/connection';

class ItemsController {

    async list(request: Request, response: Response) {
        const items = await knex('Items').select('*');
    
        const serializedItems = items.map(item => {
            return {
                id: item.Id,
                title: item.Title,
                image_url: `http://localhost:3333/uploads/${item.Image}`
            };
        });
    
        return response.json(serializedItems);
    }
}

export default ItemsController;