import Room from "../db/models/room";

export class RoomResponseDTO {
    hotelId: number;
    roomCategoryId: number
    dateOfAvailability: Date;
    price: number;
    bookingId?: number | null;

    constructor(room: Room){
        this.hotelId = room.hotelId;
        this.roomCategoryId = room.roomCategoryId;
        this.dateOfAvailability = room.dateOfAvailability;
        this.price = room.price;
        this.bookingId = room.bookingId;
    }
}