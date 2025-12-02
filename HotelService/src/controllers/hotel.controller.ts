import { NextFunction, Request, Response } from "express";
import { createHotelService, deleteHotelService, getAllHotelsService, getHotelByIdService } from "../services/hotel.service";

export async function createHotelHandler(req: Request, res:Response, next: NextFunction) {
    //1. Call the service layer

    const hotelResponse = await createHotelService(req.body);

    //2. Send the response
    res.status(201).json({
        message: 'Hotel created successfully',
        data: hotelResponse,
        success: true,
    });
}

export async function getHotelByIdHandler(req: Request, res:Response, next: NextFunction) {
    //1. Call the service layer

    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    //2. Send the response
    res.status(200).json({
        message: 'Hotel found successfully',
        data: hotelResponse,
        success: true,
    });
}

export async function getAllHotelsHandler(req: Request, res:Response, next: NextFunction) {
    //1. Call the service layer

    const { orderBy, orderDirection, pageSize, pageNumber } = req.query;

    const hotelResponse = await getAllHotelsService(
        orderBy as string | undefined,
        orderDirection as 'ASC' | 'DESC' | undefined,
        pageSize ? Number(pageSize) : undefined,
        pageNumber ? Number(pageNumber) : undefined
    );

    //2. Send the response
    res.status(200).json({
        message: 'Hotels fetched successfully',
        data: hotelResponse,
        success: true,
    });
}

export async function deleteHotelHandler(req:Request, res:Response, next: NextFunction){
    const hotelResponse = await deleteHotelService(Number(req.params.id));

    res.status(200).json({
        message: 'Hotel deleted successfully',
        data: hotelResponse,
        success: true,
    });
}