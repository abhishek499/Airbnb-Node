import { createHotelDTO } from "../dto/hotel.dto";
import { createHotel, getAllHotels, getHotelById, softDeleteHotel } from "../repositories/hotel.repository";

export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id:number) {
    const hotel = await getHotelById(id);
    return hotel;
}

export async function getAllHotelsService(orderBy?: string, orderDirection?: 'ASC' | 'DESC', pageSize?: number, pageNumber?: number) {
    const hotels = await getAllHotels(orderBy, orderDirection, pageSize, pageNumber);
    return hotels;
}

export async function deleteHotelService(id: number) {
    const hotel = await softDeleteHotel(id);
    return hotel;
}