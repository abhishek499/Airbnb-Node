import { RoomRepository } from "../repositories/room.repository";


const roomRepository = new RoomRepository();

export async function createRoomService(roomData: any) {
    const room = await roomRepository.create(roomData);
    return room;
}

export async function getRoomByIdService(id: number) {
    const room = await roomRepository.findById(id);
    return room;
}

export async function getAllRoomsService() {
    const rooms = await roomRepository.findAll();
    return rooms;
}

export async function deleteRoomService(id: number) {
    await roomRepository.deleteById({ id });
    return true;
}