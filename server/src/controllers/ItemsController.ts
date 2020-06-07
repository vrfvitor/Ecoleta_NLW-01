import knex from '../database/connection'
import { Response, Request } from 'express';

class ItemsController {

    async index(request: Request, response: Response) {
        const items = await knex('item').select('*');

        const serealizedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image: `http://192.168.15.5:8000/uploads/${item.image}`
            }
        });
    
        return response.json(serealizedItems);
    }
    
}

export default ItemsController;