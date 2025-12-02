import Hotel from '../db/models/hotel'; // Import your Sequelize model type

export type createHotelDTO = {
    name: string;
    address: string;
    location: string;
    rating?: number;
    ratingCount?: number;
}

export class HotelResponseDTO {
    name: string;
    address: string;
    location: string;
    rating?: number | undefined;
    ratingCount?: number | undefined;

    // The constructor controls exactly what gets assigned
    constructor(hotel: Hotel) {
        this.name = hotel.name;
        this.address = hotel.address;
        this.location = hotel.location;
        this.rating = hotel.rating;
        this.ratingCount = hotel.ratingCount;
        
        // Note: We deliberately DO NOT assign id, createdAt, updatedAt here.
        // Therefore, they will not exist in the instance of this class.
    }
}