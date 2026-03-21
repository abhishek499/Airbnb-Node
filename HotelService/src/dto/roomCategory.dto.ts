import RoomCategory, { RoomType } from "../db/models/roomCategory";

export class RoomCategoryResponseDTO {
    hotelId: number;
    price: number;
    roomType: RoomType;
    roomCount: number;

    constructor(roomCategory: RoomCategory){
        this.hotelId = roomCategory.hotelId;
        this.price = roomCategory.price;
        this.roomType = roomCategory.roomType;
        this.roomCount = roomCategory.roomCount;
    }
}
