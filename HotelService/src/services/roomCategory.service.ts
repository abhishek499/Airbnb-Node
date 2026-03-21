import { CreationOptional } from "sequelize";
import { RoomCategoryRepository } from "../repositories/roomCategory.repository";
import RoomCategory from "../db/models/roomCategory";
import { HotelRepository } from "../repositories/hotel.repository";


const roomCategoryRepository = new RoomCategoryRepository();
const hotelRepository = new HotelRepository();

export async function createRoomCategoryService(roomCategoryData: CreationOptional<RoomCategory>) {
    const roomCategory = await roomCategoryRepository.create(roomCategoryData);
    return roomCategory;
}

export async function getRoomCategoryByIdService(id: number) {
    const roomCategory = await roomCategoryRepository.findById(id);
    return roomCategory;
}

export async function getAllRoomCategoriesService() {
    const roomCategories = await roomCategoryRepository.findAll();
    return roomCategories;
}

export async function deleteRoomCategoryService(id: number) {
    await roomCategoryRepository.deleteById({ id });
    return true;
}

export async function getAllRoomCategoriesByHotelIdService(hotelId: number) {
    const hotel = await hotelRepository.findById(hotelId);

    if (!hotel) {
        throw new Error('Hotel not found');
    }

    const roomCategories = await roomCategoryRepository.findAllByHotelId(hotelId);

    return roomCategories;
}