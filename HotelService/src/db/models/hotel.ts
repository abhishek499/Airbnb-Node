import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from './sequelize';


class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>>{
    declare id: CreationOptional<number>;
    declare name: string;
    declare address: string;
    declare location: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;
    declare rating?: number;
    declare ratingCount?: number;
}

Hotel.init(
  {
    id: {
        type: 'INTEGER',
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: 'VARCHAR(255)',
        allowNull: false,
    },
    address: {
        type: 'VARCHAR(255)',
        allowNull: false,
    },
    location: {
        type: 'VARCHAR(255)',
        allowNull: false,
    },
    rating: {
        type: 'DECIMAL(3,2)',
        allowNull: true,
    },
    ratingCount: {
        type: 'INT',
        allowNull: true,
    },
    deletedAt: {
        type: 'TIMESTAMP',
        allowNull: true,
        defaultValue: null,
    },
    createdAt: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: new Date(),
    },
    updatedAt: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: new Date(),
    }
},{
    sequelize: sequelize,
    tableName: 'hotels',
    underscored: true, //createdAt --> created_at
    timestamps: true, //add createdAt and updatedAt fields
});

export default Hotel;