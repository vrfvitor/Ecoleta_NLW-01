import knex from '../database/connection';
import { Request, Response } from 'express';

class PointsController {

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('point')
            .join('point_items', 'point.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .distinct()
            .select('point.*');

        const serealizedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.15.5:8000/uploads/${point.image}`
            }
        });

        return response.json(serealizedPoints);
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

        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }

        const insertedIds = await trx('point').insert(point);

        const pointId = insertedIds[0];

        const point_items = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((itemId: number) => {
                return {
                    item_id: itemId,
                    point_id: pointId
                };
            });

        await trx('point_items').insert(point_items);

        await trx.commit();

        return response.json({
            id: pointId,
            ...point
        });

    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('point').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('item')
            .join('point_items', 'item.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('item.title');

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.15.5:8000/uploads/${point.image}`
        }

        return response.json({ point: serializedPoint, items });
    }

}

export default PointsController;