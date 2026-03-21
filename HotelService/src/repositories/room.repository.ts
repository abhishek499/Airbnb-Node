import Room from "../db/models/room";
import { RoomResponseDTO } from "../dto/room.dto";
import BaseRepository from "./base.repository";



export class RoomRepository extends BaseRepository<Room> {

    constructor() {
        super(Room, (room) => new RoomResponseDTO(room))
    }
}