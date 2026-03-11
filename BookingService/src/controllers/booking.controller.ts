import { Request, Response } from 'express';
import { confirmBookingService, confirmBookingServiceWithLocking, createBookingService, createBookingServiceWithRedlock } from '../services/booking.service';
import { StatusCodes } from 'http-status-codes';

export const createBookingHandler = async(req:Request, res: Response) => {
    
    const booking = await createBookingService(
        req.body
    )

    res.status(StatusCodes.CREATED).json({
        bookingId: booking.bookingId,
        idempotencyKey: booking.idempotencyKey
    })
}

export const createBookingHandlerWithRedlock = async(req:Request, res: Response) => {
    
    const booking = await createBookingServiceWithRedlock(
        req.body
    )

    res.status(StatusCodes.CREATED).json({
        bookingId: booking.bookingId,
        idempotencyKey: booking.idempotencyKey
    })
}

export const confirmBookingHandler = async(req:Request, res:Response) => {

    const booking = await confirmBookingService(String(req.params.idempotencyKey));

    res.status(StatusCodes.ACCEPTED).json({
        bookingId: booking?.id,
        status: booking?.status
    })
}

export const confirmBookingWithLockingHandler = async(req:Request, res: Response,) => {
    const booking = await confirmBookingServiceWithLocking(String(req.params.idempotencyKey));

    res.status(StatusCodes.ACCEPTED).json({
        bookingId: booking?.id,
        status: booking?.status
    })
}