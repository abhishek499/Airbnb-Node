import logger from "../config/logger.config";
import RoomCategory from "../db/models/roomCategory";
import { RoomCategoryResponseDTO } from "../dto/roomCategory.dto";
import { NotFoundError } from "../utils/errors/app.error";
import BaseRepository from "./base.repository";

export class RoomCategoryRepository extends BaseRepository<RoomCategory> {

    constructor() {
        super(RoomCategory, (RoomCategory) => new RoomCategoryResponseDTO(RoomCategory))
    }

    async findAllByHotelId(hotelId: number): Promise<RoomCategory[] | []> {
        const roomCategories = await this.model.findAll({
            where: {
                hotelId: hotelId,
                deletedAt: null
            }
        })

        if(!roomCategories || roomCategories.length === 0) {
            logger.error(`No room categories found for hotel ID: ${hotelId}`);
            throw new NotFoundError(`No room categories found for hotel ID: ${hotelId}`);
        }
        
        return roomCategories;
    }


}