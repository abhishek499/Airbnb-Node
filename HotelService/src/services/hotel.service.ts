import { createHotelDTO } from "../dto/hotel.dto";
import { HotelRepository } from "../repositories/hotel.repository";

const hotelRepository = new HotelRepository();

export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await hotelRepository.create(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await hotelRepository.findById(id);
    return hotel;
}

export async function getAllHotelsService(orderBy?: string, orderDirection?: 'ASC' | 'DESC', pageSize?: number, pageNumber?: number) {
    const hotels = await hotelRepository.findAll();
    return hotels;
}

export async function deleteHotelService(id: number) {
    const hotel = await hotelRepository.softDeleteById(id);
    return hotel;
}