import { uuidv4 } from "zod";
import { getIdempotencyKey, createIdempotencyKey, createBooking, finalizeIdempotencyKey, confirmBooking, getIdempotencyKeyWithLocking, confirmBookingWithLock, finalizeIdempotencyKeyWithLocking } from "../repositories/booking.repository";
import { BadRequestError, ConflictError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import { CreateBookingDTO } from "../dto/booking.dto";
import prisma from "../prisma/client";
import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";


// export async function createBookingServiceMine(bookingInput: any, idempotencyKey: string) {
//     //1.Check if the request is idempotent by looking for an existing idempotency key
//     const existingKey = await getIdempotencyKey(idempotencyKey);

//     if(existingKey) {
//         //If the key exists, return an error or the existing booking details
//         throw new ConflictError("Duplicate booking request");
//     }

//     //2.Create Idempotency key record to mark this request as processed
//     const newIdempotencyKey = await createIdempotencyKey(uuidv4().toString());

//     //3.If not, create a new booking record in the database
//     const bookingData = await createBooking({...bookingInput, idempotencyKeyId: newIdempotencyKey.id});


//     //4.Return the booking details
//     return bookingData;
// }


export async function createBookingService(
    createBookingDTO: CreateBookingDTO
) {

    const booking = await createBooking({
        userId: createBookingDTO.userId,
        hotelId: createBookingDTO.hotelId,
        totalGuests: createBookingDTO.totalGuests,
        bookingAmount: createBookingDTO.bookingAmount
    });

    const idempotencyKey = generateIdempotencyKey();

    await createIdempotencyKey(idempotencyKey, booking.id);

    return {
        bookingId: booking.id,
        idempotencyKey: idempotencyKey
    }

}

export async function createBookingServiceWithRedlock(
    createBookingDTO: CreateBookingDTO
) {

    const ttl = serverConfig.REDLOCK_TTL;
    const bookingResource = `hotel:${createBookingDTO.hotelId}`;

    try {
        // console.log("Redlock", redlock)
        await redlock.acquire([bookingResource], ttl);
        // console.log("Redlock1", redlock)


        const booking = await createBooking({
            userId: createBookingDTO.userId,
            hotelId: createBookingDTO.hotelId,
            totalGuests: createBookingDTO.totalGuests,
            bookingAmount: createBookingDTO.bookingAmount
        });

        const idempotencyKey = generateIdempotencyKey();

        await createIdempotencyKey(idempotencyKey, booking.id);

        return {
            bookingId: booking.id,
            idempotencyKey: idempotencyKey
        }
    } catch (error) {
        throw new InternalServerError("Failed to acquire lock for booking resource.");
    }

}

export async function confirmBookingService(idempotencyKey: string) {
    const idempotencyKeyData = await getIdempotencyKey(idempotencyKey);

    if (!idempotencyKeyData) {
        throw new NotFoundError("Idempotency Key not found");
    }

    if (idempotencyKeyData.finalized) {
        throw new BadRequestError("Booking already finalized");
    }

    const booking = await confirmBooking(idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(idempotencyKey);

    return booking;
}

export async function confirmBookingServiceWithLocking(idempotencyKey: string) {
    return await prisma?.$transaction(async (tx) => {

        const idempotencyKeyData = await getIdempotencyKeyWithLocking(tx, idempotencyKey);

        if (!idempotencyKeyData) {
            throw new NotFoundError("Idempotency Key not found");
        }

        if (idempotencyKeyData.finalized) {
            throw new BadRequestError("Booking already finalized");
        }

        const booking = await confirmBookingWithLock(tx, idempotencyKeyData.bookingId);
        await finalizeIdempotencyKeyWithLocking(tx, idempotencyKey);

        return booking;
    })
}