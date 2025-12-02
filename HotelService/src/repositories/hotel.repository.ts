import logger from '../config/logger.config';
import Hotel from '../db/models/hotel';
import { createHotelDTO, HotelResponseDTO } from '../dto/hotel.dto';
import { NotFoundError } from '../utils/errors/app.error';

export async function createHotel(hotelData: createHotelDTO) : Promise<HotelResponseDTO> {
    const hotel = await Hotel.create(hotelData);

    logger.info(`Hotel created with ID: ${hotel.id}`);

    return new HotelResponseDTO(hotel);
}

export async function getHotelById(id: number): Promise<HotelResponseDTO> {
    const hotel = await Hotel.findByPk(id);

    if(!hotel) {
        logger.error(`Hotel not found with ID: ${id}`);
        throw new NotFoundError(`Hotel with ID ${id} not found`);
    }
    
    logger.info(`Hotel Found: ID: ${hotel.id}, Name: ${hotel.name}`);

    return new HotelResponseDTO(hotel);
}

export async function getAllHotels(orderBy?: string, orderDirection?: 'ASC' | 'DESC', pageSize?: number, pageNumber?: number) { 
    //1. Fetch all hotels in the db with pagination
    /**
     * pageSize, pageNumber, orderBy, orderDirection
     */

    console.log({orderBy, orderDirection, pageSize, pageNumber});
    const hotels = await Hotel.findAll({
        where: { deletedAt: null },
        order: [orderBy ? [orderBy, orderDirection || 'ASC'] : ['id', 'ASC']],
        offset: pageSize && pageNumber ? (pageNumber - 1) * pageSize : 0,
        limit: pageSize || 10,
    });


    if(hotels.length === 0) {
        logger.error('No hotels found in the database');
        throw new NotFoundError('No hotels found');
    }

    logger.info(`Fetched ${hotels.length} hotels from the database with pagination details`, {
        orderBy,
        orderDirection,
        pageSize,
        pageNumber
    });

    return hotels;
}

export async function softDeleteHotel(id: number) {
    const hotel = await Hotel.findByPk(id);

    if(!hotel) {
        logger.error(`Hotel not found with ID: ${id}`);
        throw new NotFoundError(`Hotel with ID ${id} not found`);
    }

    hotel.deletedAt = new Date();
    await hotel.save();// Save changes to the db

    logger.info(`Hotel soft deleted with ID: ${id}`);

    return hotel;
}