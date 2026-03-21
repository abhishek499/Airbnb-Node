import { CreationAttributes, FindAndCountOptions, Model, ModelStatic, WhereOptions } from "sequelize";

abstract class BaseRepository<T extends Model> {
    protected model: ModelStatic<T>;
    private readonly toResponse: (record: T) => Partial<T>;

    constructor(model: ModelStatic<T>, toResponse: (record: T) => Partial<T>) {
        this.model = model;
        this.toResponse = toResponse;
    }

    async create(data: CreationAttributes<T>): Promise<Partial<T>> {
        const record = await this.model.create(data);
        return this.toResponse(record);
    }

    async createRAW(data: CreationAttributes<T>,): Promise<T | null> {
        const record = await this.model.create(data);
        return record;
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }
        await record.update(data);
        return record;
    }

    async findById(id: number): Promise<T | null> {
        const record = await this.model.findByPk(id);

        if (!record) {
            return null;
        }
        return record;
    }


    async findAll(): Promise<T[]> {
        const record = await this.model.findAll({
        })

        if (!record || record.length === 0) {
            return [];
        }
        return record;
    }

    async findAndCount(options: FindAndCountOptions = {}): Promise<{ rows: T[]; count: number }> {
        const result = await this.model.findAndCountAll(options);
        return {
            rows: result.rows,
            count: result.count,
        };
    }

    async deleteById(whereOptions: WhereOptions<T>): Promise<void> {
        const record = await this.model.destroy({
            where: whereOptions
        })
    }
}

export default BaseRepository;