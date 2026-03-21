import logger from '../config/logger.config';
import Hotel from '../db/models/hotel';
import { HotelListQueryDTO, HotelResponseDTO, PaginatedResult } from '../dto/hotel.dto';
import { NotFoundError } from '../utils/errors/app.error';
import BaseRepository from './base.repository';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const ALLOWED_SORT_FIELDS: Record<string, string> = {
    id: "id",
    name: "name",
    createdAt: "createdAt",
    rating: "rating",
    ratingCount: "ratingCount",
};

export class HotelRepository extends BaseRepository<Hotel> {

    constructor() {
        super(Hotel, (hotel) => new HotelResponseDTO(hotel));
    }

    async findAll(): Promise<Hotel[] | []> {
        const hotels = await this.model.findAll({
            where: {
                deletedAt: null
            }
        });

        if (!hotels || hotels.length === 0) {
            logger.error('No hotels found in the database');
            throw new NotFoundError('No hotels found');
        }

        logger.info(`Fetched ${hotels.length} hotels from the database`);

        return hotels;
    }

    async softDeleteById(id: number): Promise<boolean> {
        const hotel = await this.model.findByPk(id);

        if (!hotel) {
            logger.error(`Hotel not found with ID: ${id}`);
            throw new NotFoundError(`Hotel with ID ${id} not found`);
        }

        hotel.deletedAt = new Date();
        await hotel.save();// Save changes to the db

        logger.info(`Hotel soft deleted with ID: ${id}`);

        return true;
    }

    async findManyActive(query: HotelListQueryDTO = {}): Promise<PaginatedResult<Hotel>> {
        const page = query.page && query.page > 0 ? query.page : DEFAULT_PAGE;
        const pageSize =
            query.pageSize && query.pageSize > 0 ? query.pageSize : DEFAULT_PAGE_SIZE;

        const sortBy = query.sortBy && ALLOWED_SORT_FIELDS[query.sortBy]
            ? query.sortBy
            : "id";

        const sortDirection = query.sortDirection ?? "ASC";

        const where = query.includeDeleted ? {} : { deletedAt: null };

        const { rows, count } = await this.findAndCount({
            where,
            order: [[sortBy, sortDirection]],
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });

        logger.info("Fetched hotels from database", {
            total: count,
            page,
            pageSize,
            sortBy,
            sortDirection,
            includeDeleted: query.includeDeleted ?? false,
        });

        return {
            data: rows,
            total: count,
            page,
            pageSize,
        };
    }
}